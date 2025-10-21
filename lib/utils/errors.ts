import type { DAppError } from '~/types'
import { ErrorType } from '~/types'

/**
 * Create a typed DApp error
 */
export function createDAppError(
  message: string,
  type: ErrorType = ErrorType.UNKNOWN,
  data?: unknown
): DAppError {
  const error = new Error(message) as DAppError
  error.type = type
  error.data = data
  return error
}

/**
 * Parse and categorize errors from Web3 operations
 */
export function parseWeb3Error(error: unknown): DAppError {
  if (isDAppError(error)) {
    return error
  }

  const errorMessage = error instanceof Error ? error.message : String(error)
  const errorCode = (error as any)?.code

  // User rejected transaction
  if (
    errorMessage.includes('User rejected') ||
    errorMessage.includes('User denied') ||
    errorCode === 4001 ||
    errorCode === 'ACTION_REJECTED'
  ) {
    return createDAppError('Transaction was rejected by user', ErrorType.USER_REJECTED, error)
  }

  // Insufficient funds
  if (
    errorMessage.includes('insufficient funds') ||
    errorMessage.includes('insufficient balance')
  ) {
    return createDAppError('Insufficient funds for transaction', ErrorType.INSUFFICIENT_FUNDS, error)
  }

  // Unsupported chain
  if (
    errorMessage.includes('Unsupported chain') ||
    errorMessage.includes('Chain not configured')
  ) {
    return createDAppError('Unsupported blockchain network', ErrorType.UNSUPPORTED_CHAIN, error)
  }

  // Contract execution error
  if (
    errorMessage.includes('execution reverted') ||
    errorMessage.includes('contract error')
  ) {
    return createDAppError('Contract execution failed', ErrorType.CONTRACT_ERROR, error)
  }

  // Network error
  if (
    errorMessage.includes('network') ||
    errorMessage.includes('fetch failed') ||
    errorMessage.includes('timeout')
  ) {
    return createDAppError('Network request failed', ErrorType.NETWORK_ERROR, error)
  }

  // Invalid address
  if (errorMessage.includes('invalid address')) {
    return createDAppError('Invalid Ethereum address', ErrorType.INVALID_ADDRESS, error)
  }

  // Default unknown error
  return createDAppError(errorMessage, ErrorType.UNKNOWN, error)
}

/**
 * Type guard for DAppError
 */
export function isDAppError(error: unknown): error is DAppError {
  return error instanceof Error && 'type' in error
}

/**
 * Get user-friendly error message
 */
export function getUserFriendlyErrorMessage(error: DAppError | Error): string {
  if (isDAppError(error)) {
    switch (error.type) {
      case ErrorType.WALLET_NOT_CONNECTED:
        return 'Please connect your wallet to continue'
      case ErrorType.USER_REJECTED:
        return 'Transaction was cancelled'
      case ErrorType.INSUFFICIENT_FUNDS:
        return 'You don\'t have enough funds for this transaction'
      case ErrorType.UNSUPPORTED_CHAIN:
        return 'This network is not supported. Please switch to a supported network'
      case ErrorType.CONTRACT_ERROR:
        return 'Smart contract execution failed. Please try again'
      case ErrorType.NETWORK_ERROR:
        return 'Network connection error. Please check your connection'
      case ErrorType.INVALID_ADDRESS:
        return 'Invalid wallet address provided'
      case ErrorType.TRANSACTION_FAILED:
        return 'Transaction failed. Please try again'
      default:
        return error.message
    }
  }
  return error.message
}

/**
 * Log error with context
 */
export function logError(error: unknown, context?: string): void {
  const dappError = isDAppError(error) ? error : parseWeb3Error(error)
  console.error(`[${context || 'DApp'}] ${dappError.type}:`, dappError.message, dappError.data)
}
