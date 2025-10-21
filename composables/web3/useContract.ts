import { ref, watch, onUnmounted, computed, type Ref, type ComputedRef } from 'vue'
import type { Address, Hash, Abi } from 'viem'
import { useWalletStore } from '~/store/wallet'
import { useUIStore } from '~/store/ui'
import { getPublicClient, createWalletClientForChain } from '~/lib/web3/client'
import { safeReadContract } from '~/lib/web3/viemBoundary'
import { getChainById } from '~/lib/constants/chains'
import { parseWeb3Error, getUserFriendlyErrorMessage } from '~/lib/utils/errors'
import type { ContractCallResult, ContractWriteResult } from '~/types'
import { sepolia } from 'viem/chains'

/**
 * Composable for reading from smart contracts
 * 
 * @example
 * ```vue
 * <script setup lang="ts">
 * import MyContractABI from '~/contracts/abis/MyContract.json'
 * 
 * const { data, isLoading, error, refetch } = useContractRead({
 *   address: '0x...',
 *   abi: MyContractABI,
 *   functionName: 'balanceOf',
 *   args: ['0x...'],
 *   chainId: 11155111 // Optional: defaults to wallet chain or Sepolia
 * })
 * </script>
 * ```
 */
export function useContractRead<T = unknown>(config: {
  address: Address
  abi: Abi
  functionName: string
  args?: unknown[]
  watch?: boolean
  watchInterval?: number
  chainId?: number // Optional: specify which chain to read from
}): ContractCallResult<T> {
  const walletStore = useWalletStore()
  
  const data = ref<T | null>(null)
  const isLoading = ref(false)
  const error = ref<Error | null>(null)

  let intervalId: NodeJS.Timeout | null = null

  /**
   * Get the chain to use for reading
   */
  function getReadChain() {
    // 1. Use explicitly provided chainId
    if (config.chainId) {
      return getChainById(config.chainId)
    }
    // 2. Use wallet's current chain
    if (walletStore.chainId) {
      return getChainById(walletStore.chainId)
    }
    // 3. Default to Sepolia for public reads
    return sepolia
  }

  /**
   * Fetch contract data
   */
  async function fetchData(): Promise<void> {
    isLoading.value = true
    error.value = null

    try {
      const chain = getReadChain()
      if (!chain) {
        throw new Error('Unable to determine chain for reading')
      }

      const publicClient = getPublicClient(chain)

      const result = await safeReadContract<T>(publicClient, {
        address: config.address,
        abi: config.abi,
        functionName: config.functionName,
        args: config.args
      })

      data.value = result as T
    } catch (err) {
      const parsedError = parseWeb3Error(err)
      error.value = parsedError
      console.error('Contract read failed:', parsedError)
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Refetch data
   */
  async function refetch(): Promise<void> {
    await fetchData()
  }

  /**
   * Setup polling if watch is enabled (client-side only)
   */
  function setupPolling(): void {
    if (process.client && config.watch && config.watchInterval) {
      intervalId = setInterval(() => {
        fetchData()
      }, config.watchInterval)
    }
  }

  /**
   * Cleanup polling
   */
  function cleanup(): void {
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
  }

  // Auto-fetch on mount and when dependencies change
  if (process.client) {
    watch(
      () => [walletStore.chainId, config.address, config.functionName, config.chainId, ...(config.args || [])],
      () => {
        fetchData()
        cleanup()
        setupPolling()
      },
      { immediate: true }
    )

    // Cleanup on unmount
    onUnmounted(() => {
      cleanup()
    })
  }

  return {
    data: data as Ref<T | null>,
    error: error as Ref<Error | null>,
    isLoading: isLoading as Ref<boolean>,
    refetch
  }
}

/**
 * Composable for writing to smart contracts
 * 
 * @example
 * ```vue
 * <script setup lang="ts">
 * import MyContractABI from '~/contracts/abis/MyContract.json'
 * 
 * const { write, isLoading, isSuccess, hash } = useContractWrite({
 *   address: '0x...',
 *   abi: MyContractABI,
 *   functionName: 'mint'
 * })
 * 
 * async function handleMint() {
 *   await write({ args: [account, 1] })
 * }
 * </script>
 * ```
 */
export function useContractWrite(config: {
  address: Address
  abi: Abi
  functionName: string
}): ContractWriteResult {
  const walletStore = useWalletStore()
  const uiStore = useUIStore()
  
  const hash = ref<Hash | null>(null)
  const isLoading = ref(false)
  const isSuccess = ref(false)
  const error = ref<Error | null>(null)

  /**
   * Execute contract write
   */
  async function write(params?: {
    args?: unknown[]
    value?: bigint
  }): Promise<Hash | undefined> {
    walletStore.ensureConnected()

    isLoading.value = true
    isSuccess.value = false
    error.value = null
    hash.value = null

    try {
      const chain = getChainById(walletStore.chainId!)
      if (!chain) {
        throw new Error('Unsupported chain')
      }

      const walletClient = createWalletClientForChain(chain)

      const txHash = await walletClient.writeContract({
        account: walletStore.address!,
        address: config.address,
        abi: config.abi,
        functionName: config.functionName,
        args: params?.args,
        value: params?.value,
        chain
      })

      hash.value = txHash
      isSuccess.value = true
      uiStore.showSuccess('Transaction sent', `Hash: ${txHash.slice(0, 10)}...`)

      return txHash
    } catch (err) {
      const parsedError = parseWeb3Error(err)
      error.value = parsedError
      uiStore.showError('Transaction failed', getUserFriendlyErrorMessage(parsedError))
      throw parsedError
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Wait for transaction confirmation
   */
  async function waitForConfirmation() {
    if (!hash.value || !walletStore.chainId) {
      throw new Error('No transaction hash to wait for')
    }

    const chain = getChainById(walletStore.chainId)
    if (!chain) {
      throw new Error('Unsupported chain')
    }

    const publicClient = getPublicClient(chain)
    
    try {
      const receipt = await publicClient.waitForTransactionReceipt({
        hash: hash.value
      })

      if (receipt.status === 'success') {
        uiStore.showSuccess('Transaction confirmed')
        return receipt
      } else {
        throw new Error('Transaction failed')
      }
    } catch (err) {
      const parsedError = parseWeb3Error(err)
      error.value = parsedError
      uiStore.showError('Transaction failed', getUserFriendlyErrorMessage(parsedError))
      throw parsedError
    }
  }

  return {
    write,
    waitForConfirmation,
    hash,
    isLoading,
    isSuccess,
    error
  }
}