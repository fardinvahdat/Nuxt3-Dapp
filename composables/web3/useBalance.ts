import { ref, computed, watch } from 'vue'
import type { Address } from 'viem'
import { formatEther } from 'viem'
import { useWalletStore } from '~/store/wallet'
import { getPublicClient } from '~/lib/web3/client'
import { getChainById } from '~/lib/constants/chains'
import { parseWeb3Error } from '~/lib/utils/errors'
import { formatWeiToEther } from '~/lib/utils/format'

/**
 * Composable for fetching native token balance
 * 
 * @example
 * ```vue
 * <script setup lang="ts">
 * const { balance, formatted, isLoading, refetch } = useBalance()
 * </script>
 * 
 * <template>
 *   <div v-if="isLoading">Loading...</div>
 *   <div v-else>Balance: {{ formatted }} ETH</div>
 * </template>
 * ```
 */
export function useBalance(targetAddress?: Address) {
  const walletStore = useWalletStore()
  
  const balance = ref<bigint | null>(null)
  const isLoading = ref(false)
  const error = ref<Error | null>(null)

  // Use target address or connected wallet address
  const addressToQuery = computed(() => targetAddress || walletStore.address)

  // Formatted balance
  const formatted = computed(() => {
    if (!balance.value) return '0.0000'
    return formatWeiToEther(balance.value, 4)
  })

  // Formatted in Ether (raw)
  const inEther = computed(() => {
    if (!balance.value) return '0'
    return formatEther(balance.value)
  })

  /**
   * Fetch balance for the current or specified address
   */
  async function fetchBalance(): Promise<void> {
    if (!addressToQuery.value || !walletStore.chainId) {
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
      const result = await client.getBalance({ 
        address: addressToQuery.value 
      })

      balance.value = result
    } catch (err) {
      const parsedError = parseWeb3Error(err)
      error.value = parsedError
      console.error('Failed to fetch balance:', parsedError)
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Refetch balance
   */
  async function refetch(): Promise<void> {
    await fetchBalance()
  }

  /**
   * Watch for address or chain changes and refetch
   */
  watch(
    () => [addressToQuery.value, walletStore.chainId],
    () => {
      if (addressToQuery.value && walletStore.chainId) {
        fetchBalance()
      }
    },
    { immediate: true }
  )

  return {
    balance: computed(() => balance.value),
    formatted,
    inEther,
    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value),
    refetch
  }
}

/**
 * Composable for fetching multiple balances at once
 */
export function useBatchBalances(addresses: Address[]) {
  const walletStore = useWalletStore()
  
  const balances = ref<Map<Address, bigint>>(new Map())
  const isLoading = ref(false)
  const error = ref<Error | null>(null)

  /**
   * Fetch all balances
   */
  async function fetchBalances(): Promise<void> {
    if (!walletStore.chainId || addresses.length === 0) {
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
      
      // Fetch all balances in parallel
      const results = await Promise.all(
        addresses.map(address => 
          client.getBalance({ address })
        )
      )

      // Update balances map
      const newBalances = new Map<Address, bigint>()
      addresses.forEach((address, index) => {
        const balance = results[index]
        if (balance !== undefined) {
          newBalances.set(address, balance)
        }
      })
      balances.value = newBalances
    } catch (err) {
      const parsedError = parseWeb3Error(err)
      error.value = parsedError
      console.error('Failed to fetch balances:', parsedError)
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Get balance for specific address
   */
  function getBalance(address: Address): bigint | undefined {
    return balances.value.get(address)
  }

  /**
   * Get formatted balance for specific address
   */
  function getFormatted(address: Address): string {
    const balance = balances.value.get(address)
    if (!balance) return '0.0000'
    return formatWeiToEther(balance, 4)
  }

  // Auto-fetch on mount
  if (process.client) {
    watch(
      () => walletStore,
      () => {
        if (walletStore) {
          fetchBalances()
        }
      },
      { immediate: true }
    )
  }

  return {
    balances: computed(() => balances.value),
    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value),
    getBalance,
    getFormatted,
    refetch: fetchBalances
  }
}