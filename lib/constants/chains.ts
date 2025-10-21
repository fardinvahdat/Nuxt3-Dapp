import { type Chain } from 'viem'
import { mainnet, sepolia, goerli, polygon, polygonMumbai, arbitrum, optimism, base } from 'viem/chains'

/**
 * Supported blockchain networks
 */
export const SUPPORTED_CHAINS: readonly Chain[] = [
  mainnet,
  sepolia,
  goerli,
  polygon,
  polygonMumbai,
  arbitrum,
  optimism,
  base
] as const

/**
 * Chain ID to Chain mapping
 */
export const CHAIN_MAP = SUPPORTED_CHAINS.reduce((acc, chain) => {
  acc[chain.id] = chain
  return acc
}, {} as Record<number, Chain>)

/**
 * Chain configuration with RPC URLs and metadata
 */
export const CHAIN_CONFIG = {
  [mainnet.id]: {
    name: 'Ethereum Mainnet',
    nativeCurrency: mainnet.nativeCurrency,
    blockExplorer: 'https://etherscan.io',
    testnet: false,
    rpcUrls: {
      public: 'https://eth.llamarpc.com',
      alchemy: 'https://eth-mainnet.g.alchemy.com/v2/',
      infura: 'https://mainnet.infura.io/v3/'
    }
  },
  [sepolia.id]: {
    name: 'Sepolia Testnet',
    nativeCurrency: sepolia.nativeCurrency,
    blockExplorer: 'https://sepolia.etherscan.io',
    testnet: true,
    rpcUrls: {
      public: 'https://rpc.sepolia.org',
      alchemy: 'https://eth-sepolia.g.alchemy.com/v2/',
      infura: 'https://sepolia.infura.io/v3/'
    }
  },
  [polygon.id]: {
    name: 'Polygon',
    nativeCurrency: polygon.nativeCurrency,
    blockExplorer: 'https://polygonscan.com',
    testnet: false,
    rpcUrls: {
      public: 'https://polygon-rpc.com',
      alchemy: 'https://polygon-mainnet.g.alchemy.com/v2/',
      infura: 'https://polygon-mainnet.infura.io/v3/'
    }
  }
} as const

/**
 * Default chain for the application
 */
export const DEFAULT_CHAIN = mainnet

/**
 * Check if a chain ID is supported
 */
export function isSupportedChain(chainId: number): boolean {
  return chainId in CHAIN_MAP
}

/**
 * Get chain by ID
 */
export function getChainById(chainId: number): Chain | undefined {
  return CHAIN_MAP[chainId]
}
