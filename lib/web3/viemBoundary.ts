/**
 * Viem Boundary Helper
 * 
 * Wraps viem operations to prevent TypeScript generic explosion
 * and type instantiation depth issues with multicall.
 */

import type { Abi, PublicClient, MulticallParameters, MulticallReturnType } from 'viem'

/**
 * Safe multicall wrapper that prevents TS generic expansion issues
 * 
 * @param client - Viem public client
 * @param contracts - Array of contract call configurations
 * @returns Multicall results
 */
export async function safeMulticall<T = any>(
  client: PublicClient,
  contracts: any[]
): Promise<MulticallReturnType> {
  // Normalize ABIs to prevent type explosion
  const normalizedContracts = contracts.map(c => ({
    ...c,
    abi: c.abi as Abi
  }))

  // @ts-ignore - viem v2 type compatibility
  return client.multicall({
    contracts: normalizedContracts
  })
}

/**
 * Safe read contract wrapper with proper typing
 */
export async function safeReadContract<T = any>(
  client: PublicClient,
  config: {
    address: `0x${string}`
    abi: any
    functionName: string
    args?: readonly unknown[]
  }
): Promise<T> {
  // @ts-ignore - viem v2 type compatibility
  return client.readContract({
    ...config,
    abi: config.abi as Abi
  }) as Promise<T>
}

/**
 * Safe batch contract reads with proper error handling
 */
export async function safeBatchRead(
  client: PublicClient,
  calls: Array<{
    address: `0x${string}`
    abi: any
    functionName: string
    args?: readonly unknown[]
  }>
): Promise<any[]> {
  const contracts = calls.map(call => ({
    address: call.address,
    abi: call.abi as Abi,
    functionName: call.functionName,
    args: call.args
  }))

  // @ts-ignore - viem v2 type compatibility
  const results = await client.multicall({
    contracts: contracts as any
  })

  return results.map((result: any) => {
    if (result.status === 'success') {
      return result.result
    }
    return undefined
  })
}