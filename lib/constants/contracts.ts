import type { Address } from 'viem'

/**
 * Known contract addresses by chain ID
 */
export const CONTRACT_ADDRESSES = {
  // Ethereum Mainnet
  1: {
    USDC: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48' as Address,
    USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7' as Address,
    DAI: '0x6B175474E89094C44Da98b954EedeAC495271d0F' as Address,
    WETH: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2' as Address
  },
  // Sepolia Testnet
  11155111: {
    USDC: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238' as Address,
    USDT: '0x7169D38820dfd117C3FA1f22a697dBA58d90BA06' as Address,
    DAI: '0x3e622317f8C93f7328350cF0B56d9eD4C620C5d6' as Address,
    WETH: '0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9' as Address
  },
  // Polygon
  137: {
    USDC: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174' as Address,
    USDT: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F' as Address,
    DAI: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063' as Address,
    WMATIC: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270' as Address
  }
} as const

/**
 * Get contract address by name and chain ID
 */
export function getContractAddress(
  chainId: number,
  contractName: 'USDC' | 'USDT' | 'DAI' | 'WETH' | 'WMATIC'
): Address | undefined {
  const chainContracts = CONTRACT_ADDRESSES[chainId as keyof typeof CONTRACT_ADDRESSES]
  if (!chainContracts) return undefined
  return (chainContracts as any)[contractName] as Address | undefined
}

/**
 * Contract deployment blocks for event filtering optimization
 */
export const CONTRACT_DEPLOYMENT_BLOCKS = {
  1: {
    USDC: 6082465,
    USDT: 4634748,
    DAI: 8928158,
    WETH: 4719568
  }
} as const