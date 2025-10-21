import { ref, computed } from 'vue'
import type { Address } from 'viem'
import { useWalletStore } from '~/store/wallet'
import { getPublicClient } from '~/lib/web3/client'
import { getChainById } from '~/lib/constants/chains'
import { parseWeb3Error } from '~/lib/utils/errors'
import { formatWeiToEther, formatGwei } from '~/lib/utils/format'
import type { GasEstimation } from '~/types'

/**
 * Composable for estimating gas costs for transactions
 * 
 * @example
 * ```vue
 * <script setup lang="ts">
 * const { estimate, estimation, isLoading } = useGasEstimation()
 * 
 * async function estimateTransfer() {
 *   await estimate({
 *     to: '0x...',
 *     value: parseEther('0.1')
 *   })
 * }
 * </script>
 * ```
 */
export function useGasEstimation() {
  const walletStore = useWalletStore()
  
  const estimation = ref<GasEstimation | null>(null)
  const isLoading = ref(false)
  const error = ref<Error | null>(null)

  /**
   * Estimate gas for a transaction
   */
  async function estimate(params: {
    to: Address
    value?: bigint
    data?: `0x${string}`
  }): Promise<GasEstimation | undefined> {
    walletStore.ensureConnected()

    isLoading.value = true
    error.value = null

    try {
      const chain = getChainById(walletStore.chainId!)
      if (!chain) {
        throw new Error('Unsupported chain')
      }

      const publicClient = getPublicClient(chain)

      // Estimate gas limit
      const gasLimit = await publicClient.estimateGas({
        account: walletStore.address!,
        to: params.to,
        value: params.value,
        data: params.data
      })

      // Get current gas price (EIP-1559)
      const feeData = await publicClient.estimateFeesPerGas()

      const maxFeePerGas = feeData.maxFeePerGas || BigInt(0)
      const maxPriorityFeePerGas = feeData.maxPriorityFeePerGas || BigInt(0)

      // Calculate total cost
      const totalCost = gasLimit * maxFeePerGas

      const result: GasEstimation = {
        gasLimit,
        maxFeePerGas,
        maxPriorityFeePerGas,
        totalCost,
        totalCostFormatted: formatWeiToEther(totalCost, 6)
      }

      estimation.value = result
      return result
    } catch (err) {
      const parsedError = parseWeb3Error(err)
      error.value = parsedError
      console.error('Gas estimation failed:', parsedError)
      throw parsedError
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Get current gas price
   */
  async function getCurrentGasPrice() {
    if (!walletStore.chainId) {
      throw new Error('No chain connected')
    }

    try {
      const chain = getChainById(walletStore.chainId)
      if (!chain) {
        throw new Error('Unsupported chain')
      }

      const publicClient = getPublicClient(chain)
      const feeData = await publicClient.estimateFeesPerGas()

      return {
        maxFeePerGas: feeData.maxFeePerGas || BigInt(0),
        maxPriorityFeePerGas: feeData.maxPriorityFeePerGas || BigInt(0),
        formatted: {
          maxFee: formatGwei(feeData.maxFeePerGas || BigInt(0)),
          maxPriorityFee: formatGwei(feeData.maxPriorityFeePerGas || BigInt(0))
        }
      }
    } catch (err) {
      const parsedError = parseWeb3Error(err)
      error.value = parsedError
      throw parsedError
    }
  }

  return {
    estimate,
    getCurrentGasPrice,
    estimation: computed(() => estimation.value),
    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value)
  }
}
