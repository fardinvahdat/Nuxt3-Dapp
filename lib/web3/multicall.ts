import type { PublicClient, Address } from 'viem'
import type { MulticallRequest } from '~/types'

/**
 * Execute multiple contract calls in a single transaction
 */
export async function multicall<T = any>(
  client: PublicClient,
  calls: MulticallRequest[]
): Promise<T[]> {
  try {
    // @ts-ignore - viem v2 type compatibility
    const results = await client.multicall({
      contracts: calls.map(call => ({
        address: call.address,
        abi: call.abi,
        functionName: call.functionName,
        args: call.args
      }))
    })

    return results.map((result, index) => {
      if (result.status === 'failure') {
        console.warn(`Multicall ${index} failed:`, result.error)
        return null
      }
      return result.result
    }) as T[]
  } catch (error) {
    console.error('Multicall failed:', error)
    throw error
  }
}