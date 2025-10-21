import { ref, computed, watch, type Ref, type ComputedRef } from 'vue'
import type { Address, Abi } from 'viem'
import { useWalletStore } from '~/store/wallet'
import { getPublicClient } from '~/lib/web3/client'
import { safeMulticall } from '~/lib/web3/viemBoundary'
import { getChainById } from '~/lib/constants/chains'
import { parseWeb3Error } from '~/lib/utils/errors'
import { formatTokenAmount } from '~/lib/utils/format'
import type { TokenBalance } from '~/types'
import ERC20ABI from '~/contracts/abis/ERC20.json'

/**
 * Composable for fetching ERC-20 token balance and metadata
 * 
 * @example
 * ```vue
 * <script setup lang="ts">
 * const tokenAddress = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48' // USDC
 * const { balance, formatted, symbol, decimals, isLoading } = useTokenBalance(tokenAddress)
 * </script>
 * ```
 */
export function useTokenBalance(
  tokenAddress: Address,
  holderAddress?: Address
): {
  balance: ComputedRef<bigint | null>
  symbol: ComputedRef<string>
  name: ComputedRef<string>
  decimals: ComputedRef<number>
  formatted: ComputedRef<string>
  tokenData: ComputedRef<TokenBalance | null>
  isLoading: ComputedRef<boolean>
  error: ComputedRef<Error | null>
  refetch: () => Promise<void>
} {
  const walletStore = useWalletStore()
  
  const balance = ref<bigint | null>(null)
  const symbol = ref<string>('')
  const name = ref<string>('')
  const decimals = ref<number>(18)
  const isLoading = ref(false)
  const error = ref<Error | null>(null)

  const addressToQuery = computed(() => holderAddress || walletStore.address)

  const formatted = computed(() => {
    if (!balance.value) return '0.0000'
    return formatTokenAmount(balance.value, decimals.value, 4)
  })

  const tokenData = computed<TokenBalance | null>(() => {
    if (!addressToQuery.value || !balance.value) return null

    return {
      address: tokenAddress,
      symbol: symbol.value,
      name: name.value,
      decimals: decimals.value,
      balance: balance.value,
      formatted: formatted.value
    }
  })

  /**
   * Fetch token metadata and balance
   * Uses safeMulticall to prevent TypeScript generic explosion
   */
  async function fetchTokenData(): Promise<void> {
    // Unwrap computed ref to avoid type issues
    const queryAddress = addressToQuery.value
    
    if (!queryAddress || !walletStore.chainId) {
      return
    }

    isLoading.value = true
    error.value = null

    try {
      const chain = getChainById(walletStore.chainId)
      if (!chain) {
        throw new Error('Unsupported chain')
      }

      const client = getPublicClient(chain)

      // Use safeMulticall to avoid TS generic expansion
      const contracts = [
        {
          address: tokenAddress,
          abi: ERC20ABI as Abi,
          functionName: 'symbol'
        },
        {
          address: tokenAddress,
          abi: ERC20ABI as Abi,
          functionName: 'name'
        },
        {
          address: tokenAddress,
          abi: ERC20ABI as Abi,
          functionName: 'decimals'
        },
        {
          address: tokenAddress,
          abi: ERC20ABI as Abi,
          functionName: 'balanceOf',
          args: [queryAddress] // Pass unwrapped value
        }
      ]

      const results = await safeMulticall(client, contracts)

      // Update state with proper guards
      symbol.value = results[0]?.status === 'success' ? (results[0].result as string) : ''
      name.value = results[1]?.status === 'success' ? (results[1].result as string) : ''
      decimals.value = results[2]?.status === 'success' ? (results[2].result as number) : 18
      balance.value = results[3]?.status === 'success' ? (results[3].result as bigint) : BigInt(0)
    } catch (err) {
      const parsedError = parseWeb3Error(err)
      error.value = parsedError
      console.error('Failed to fetch token data:', parsedError)
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Refetch token data
   */
  async function refetch(): Promise<void> {
    await fetchTokenData()
  }

  // Watch for changes and refetch
  watch(
    () => [addressToQuery.value, walletStore.chainId],
    () => {
      if (addressToQuery.value && walletStore.chainId) {
        fetchTokenData()
      }
    },
    { immediate: true }
  )

  return {
    balance: computed(() => balance.value),
    symbol: computed(() => symbol.value),
    name: computed(() => name.value),
    decimals: computed(() => decimals.value),
    formatted,
    tokenData,
    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value),
    refetch
  }
}

/**
 * Composable for fetching multiple token balances
 */
export function useTokenBalances(
  tokenAddresses: Address[],
  holderAddress?: Address
): {
  balances: ComputedRef<Map<Address, TokenBalance>>
  isLoading: ComputedRef<boolean>
  error: ComputedRef<Error | null>
  getBalance: (tokenAddress: Address) => TokenBalance | undefined
  refetch: () => Promise<void>
} {
  const walletStore = useWalletStore()
  
  const balances = ref<Map<Address, TokenBalance>>(new Map())
  const isLoading = ref(false)
  const error = ref<Error | null>(null)

  const addressToQuery = computed(() => holderAddress || walletStore.address)

  /**
   * Fetch all token balances using safeMulticall
   */
  async function fetchBalances(): Promise<void> {
    // Unwrap computed ref
    const queryAddress = addressToQuery.value
    
    if (!queryAddress || !walletStore.chainId || tokenAddresses.length === 0) {
      return
    }

    isLoading.value = true
    error.value = null

    try {
      const chain = getChainById(walletStore.chainId)
      if (!chain) {
        throw new Error('Unsupported chain')
      }

      const client = getPublicClient(chain)

      // Build multicall requests for all tokens
      const contracts = tokenAddresses.flatMap(tokenAddress => [
        {
          address: tokenAddress,
          abi: ERC20ABI as Abi,
          functionName: 'symbol'
        },
        {
          address: tokenAddress,
          abi: ERC20ABI as Abi,
          functionName: 'name'
        },
        {
          address: tokenAddress,
          abi: ERC20ABI as Abi,
          functionName: 'decimals'
        },
        {
          address: tokenAddress,
          abi: ERC20ABI as Abi,
          functionName: 'balanceOf',
          args: [queryAddress] // Pass unwrapped value
        }
      ])

      const results = await safeMulticall(client, contracts)

      // Parse results with proper guards
      const newBalances = new Map<Address, TokenBalance>()
      tokenAddresses.forEach((tokenAddress, index) => {
        const baseIndex = index * 4
        const symbolResult = results[baseIndex]
        const nameResult = results[baseIndex + 1]
        const decimalsResult = results[baseIndex + 2]
        const balanceResult = results[baseIndex + 3]

        // Guard against undefined results
        if (
          symbolResult?.status === 'success' &&
          nameResult?.status === 'success' &&
          decimalsResult?.status === 'success' &&
          balanceResult?.status === 'success'
        ) {
          const tokenDecimals = decimalsResult.result as number
          const tokenBalance = balanceResult.result as bigint

          newBalances.set(tokenAddress, {
            address: tokenAddress,
            symbol: symbolResult.result as string,
            name: nameResult.result as string,
            decimals: tokenDecimals,
            balance: tokenBalance,
            formatted: formatTokenAmount(tokenBalance, tokenDecimals, 4)
          })
        }
      })

      balances.value = newBalances
    } catch (err) {
      const parsedError = parseWeb3Error(err)
      error.value = parsedError
      console.error('Failed to fetch token balances:', parsedError)
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Get balance for specific token
   */
  function getBalance(tokenAddress: Address): TokenBalance | undefined {
    return balances.value.get(tokenAddress)
  }

  // Auto-fetch on mount
  watch(
    () => [addressToQuery.value, walletStore.chainId],
    () => {
      if (addressToQuery.value && walletStore.chainId) {
        fetchBalances()
      }
    },
    { immediate: true }
  )

  return {
    balances: computed(() => balances.value),
    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value),
    getBalance,
    refetch: fetchBalances
  }
}
