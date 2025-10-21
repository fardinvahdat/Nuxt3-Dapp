import type { Address } from 'viem'
import { formatEther, formatUnits, parseEther, parseUnits } from 'viem'

/**
 * Format Wei to Ether with optional decimal places
 */
export function formatWeiToEther(wei: bigint, decimals: number = 4): string {
  const ether = formatEther(wei)
  return parseFloat(ether).toFixed(decimals)
}

/**
 * Format token amount with proper decimals
 */
export function formatTokenAmount(amount: bigint, decimals: number, displayDecimals: number = 4): string {
  const formatted = formatUnits(amount, decimals)
  return parseFloat(formatted).toFixed(displayDecimals)
}

/**
 * Parse Ether string to Wei
 */
export function parseEtherToWei(ether: string): bigint {
  return parseEther(ether)
}

/**
 * Parse token amount string to raw amount
 */
export function parseTokenAmount(amount: string, decimals: number): bigint {
  return parseUnits(amount, decimals)
}

/**
 * Shorten Ethereum address for display
 * @example 0x1234...5678
 */
export function shortenAddress(address: Address, chars: number = 4): string {
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`
}

/**
 * Format transaction hash for display
 */
export function shortenHash(hash: string, chars: number = 6): string {
  return `${hash.slice(0, chars + 2)}...${hash.slice(-chars)}`
}

/**
 * Format large numbers with K, M, B suffixes
 */
export function formatCompactNumber(num: number): string {
  if (num < 1000) return num.toFixed(2)
  if (num < 1_000_000) return `${(num / 1000).toFixed(2)}K`
  if (num < 1_000_000_000) return `${(num / 1_000_000).toFixed(2)}M`
  return `${(num / 1_000_000_000).toFixed(2)}B`
}

/**
 * Format USD amount
 */
export function formatUSD(amount: number, decimals: number = 2): string {
  return `$${amount.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}`
}

/**
 * Format timestamp to readable date
 */
export function formatTimestamp(timestamp: number, includeTime: boolean = true): string {
  const date = new Date(timestamp * 1000)
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...(includeTime && { hour: '2-digit', minute: '2-digit' })
  }
  return date.toLocaleDateString('en-US', options)
}

/**
 * Format gas price in Gwei
 */
export function formatGwei(wei: bigint): string {
  return formatUnits(wei, 9)
}

/**
 * Check if string is valid Ethereum address
 */
export function isValidAddress(address: string): address is Address {
  return /^0x[a-fA-F0-9]{40}$/.test(address)
}

/**
 * Normalize address to checksum format
 */
export function normalizeAddress(address: string): Address {
  return address.toLowerCase() as Address
}
