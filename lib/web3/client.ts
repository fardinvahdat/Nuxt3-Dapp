import { createPublicClient, createWalletClient, http, custom, type PublicClient, type WalletClient, type Chain, type Transport } from 'viem'
import { mainnet } from 'viem/chains'

/**
 * Create a public client for reading blockchain data
 * Wrapped to prevent TypeScript generic explosion
 */
export function createPublicClientForChain(chain: Chain = mainnet): PublicClient {
  // @ts-ignore - Prevent type instantiation depth error
  const client = createPublicClient({
    chain,
    transport: http()
  })
  
  return client as PublicClient
}

/**
 * Create a wallet client for signing transactions
 */
export function createWalletClientForChain(chain: Chain = mainnet): WalletClient {
  if (!process.client || !window.ethereum) {
    throw new Error('No Ethereum provider found')
  }

  // @ts-ignore - Prevent type instantiation depth error with viem v2
  return createWalletClient({
    chain,
    transport: custom(window.ethereum)
  })
}

/**
 * Public client cache to avoid recreating clients
 */
const publicClientCache = new Map<number, PublicClient>()

/**
 * Get or create a cached public client
 */
export function getPublicClient(chain: Chain): PublicClient {
  const cached = publicClientCache.get(chain.id)
  if (cached) return cached

  const client = createPublicClientForChain(chain)
  publicClientCache.set(chain.id, client)
  return client
}

/**
 * Clear public client cache
 */
export function clearPublicClientCache(): void {
  publicClientCache.clear()
}