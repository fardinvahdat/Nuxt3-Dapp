import { ref, computed } from 'vue'
import type { Address, Hash } from 'viem'
import { parseEther } from 'viem'
import { useWalletStore } from '~/store/wallet'
import { useUIStore } from '~/store/ui'
import { createWalletClientForChain, getPublicClient } from '~/lib/web3/client'
import { getChainById } from '~/lib/constants/chains'
import { parseWeb3Error, getUserFriendlyErrorMessage } from '~/lib/utils/errors'
import { parseTokenAmount } from '~/lib/utils/format'
import ERC20ABI from '~/contracts/abis/ERC20.json'

/**
 * Composable for transferring native tokens (ETH, MATIC, etc.)
 * 
 * @example
 * ```vue
 * <script setup lang="ts">
 * const { transfer, isLoading, hash, error } = useTransfer()
 * 
 * async function sendEth() {
 *   const txHash = await transfer({
 *     to: '0x...',
 *     amount: '0.1'
 *   })
 *   console.log('Transaction hash:', txHash)
 * }
 * </script>
 * ```
 */
export function useTransfer() {
  const walletStore = useWalletStore()
  const uiStore = useUIStore()
  
  const hash = ref<Hash | null>(null)
  const isLoading = ref(false)
  const isSuccess = ref(false)
  const error = ref<Error | null>(null)

  /**
   * Transfer native tokens
   */
  async function transfer(params: {
    to: Address
    amount: string // In Ether (e.g., "0.1")
    data?: string
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
      
      // Parse amount to Wei
      const value = parseEther(params.amount)

      // Send transaction
      // @ts-ignore - viem v2 type compatibility
      const txHash = await walletClient.sendTransaction({
        account: walletStore.address!,
        to: params.to,
        value,
        data: params.data as `0x${string}` | undefined,
        chain
      })

      hash.value = txHash
      isSuccess.value = true
      uiStore.showSuccess('Transaction sent', `Hash: ${txHash.slice(0, 10)}...`)

      return txHash
    } catch (err) {
      const parsedError = parseWeb3Error(err)
      error.value = parsedError
      uiStore.showError('Transfer failed', getUserFriendlyErrorMessage(parsedError))
      throw parsedError
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Wait for transaction confirmation
   */
  async function waitForConfirmation(): Promise<void> {
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
    transfer,
    waitForConfirmation,
    hash: computed(() => hash.value),
    isLoading: computed(() => isLoading.value),
    isSuccess: computed(() => isSuccess.value),
    error: computed(() => error.value)
  }
}

/**
 * Composable for transferring ERC-20 tokens
 */
export function useTokenTransfer(tokenAddress: Address) {
  const walletStore = useWalletStore()
  const uiStore = useUIStore()
  
  const hash = ref<Hash | null>(null)
  const isLoading = ref(false)
  const isSuccess = ref(false)
  const error = ref<Error | null>(null)

  /**
   * Transfer ERC-20 tokens
   */
  async function transfer(params: {
    to: Address
    amount: string
    decimals: number
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
      
      // Parse amount with token decimals
      const value = parseTokenAmount(params.amount, params.decimals)

      // Call transfer function
      const txHash = await walletClient.writeContract({
        account: walletStore.address!,
        address: tokenAddress,
        abi: ERC20ABI,
        functionName: 'transfer',
        args: [params.to, value],
        chain
      })

      hash.value = txHash
      isSuccess.value = true
      uiStore.showSuccess('Token transfer sent', `Hash: ${txHash.slice(0, 10)}...`)

      return txHash
    } catch (err) {
      const parsedError = parseWeb3Error(err)
      error.value = parsedError
      uiStore.showError('Token transfer failed', getUserFriendlyErrorMessage(parsedError))
      throw parsedError
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Approve token spending
   */
  async function approve(params: {
    spender: Address
    amount: string
    decimals: number
  }): Promise<Hash | undefined> {
    walletStore.ensureConnected()

    isLoading.value = true
    error.value = null

    try {
      const chain = getChainById(walletStore.chainId!)
      if (!chain) {
        throw new Error('Unsupported chain')
      }

      const walletClient = createWalletClientForChain(chain)
      
      // Parse amount with token decimals
      const value = parseTokenAmount(params.amount, params.decimals)

      // Call approve function
      const txHash = await walletClient.writeContract({
        account: walletStore.address!,
        address: tokenAddress,
        abi: ERC20ABI,
        functionName: 'approve',
        args: [params.spender, value],
        chain
      })

      hash.value = txHash
      uiStore.showSuccess('Approval sent', `Hash: ${txHash.slice(0, 10)}...`)

      return txHash
    } catch (err) {
      const parsedError = parseWeb3Error(err)
      error.value = parsedError
      uiStore.showError('Approval failed', getUserFriendlyErrorMessage(parsedError))
      throw parsedError
    } finally {
      isLoading.value = false
    }
  }

  return {
    transfer,
    approve,
    hash: computed(() => hash.value),
    isLoading: computed(() => isLoading.value),
    isSuccess: computed(() => isSuccess.value),
    error: computed(() => error.value)
  }
}