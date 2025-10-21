import { ref, computed, watch } from 'vue'
import { formatGwei } from 'viem'
import { useWalletStore } from '~/store/wallet'
import { getPublicClient } from '~/lib/web3/client'
import { getChainById } from '~/lib/constants/chains'
import { parseWeb3Error } from '~/lib/utils/errors'

/**
 * Composable for fetching current gas price
 * 
 * @example
 * ```vue
 * <script setup lang="ts">
 * const { gasPrice, formatted, isLoading, refetch } = useGasPrice()
 * </script>
 * 
 * <template>
 *   <div v-if="isLoading">Loading...</div>
 *   <div v-else>Gas Price: {{ formatted }} Gwei</div>
 * </template>
 * ```
 */
export function useGasPrice() {
  const walletStore = useWalletStore()
  
  const gasPrice = ref<bigint | null>(null)
  const isLoading = ref(false)
  const error = ref<Error | null>(null)

  // Formatted gas price in Gwei
  const formatted = computed(() => {
    if (!gasPrice.value) return '0'
    return Number(formatGwei(gasPrice.value)).toFixed(2)
  })

  /**
   * Fetch current gas price
   */
  async function fetchGasPrice(): Promise<void> {
    if (!walletStore.chainId) {
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
      const price = await client.getGasPrice()

      gasPrice.value = price
    } catch (err) {
      const parsedError = parseWeb3Error(err)
      error.value = parsedError
      console.error('Failed to fetch gas price:', parsedError)
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Refetch gas price
   */
  async function refetch(): Promise<void> {
    await fetchGasPrice()
  }

  /**
   * Watch for chain changes and refetch
   */
  if (process.client) {
    watch(
      () => walletStore.chainId,
      () => {
        if (walletStore.chainId) {
          fetchGasPrice()
        }
      },
      { immediate: true }
    )
  }

  return {
    gasPrice: computed(() => gasPrice.value),
    formatted,
    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value),
    refetch
  }
}
