import type { Address, Hash, TransactionReceipt, Log } from "viem";
import type { Ref, ComputedRef, UnwrapRef } from "vue";

/**
 * Wallet connection state
 */
export interface WalletState {
  address: Address | null;
  chainId: number | null;
  isConnected: boolean;
  isConnecting: boolean;
  connector: string | null;
  ensureConnected: any | null;
}

/**
 * Transaction status
 */
export type TransactionStatus = "pending" | "confirmed" | "failed" | "replaced";

/**
 * Transaction metadata
 */
export interface Transaction {
  hash: Hash;
  from: Address;
  to: Address | null;
  value: bigint;
  data: string;
  chainId: number;
  status: TransactionStatus;
  blockNumber?: bigint;
  timestamp?: number;
  receipt?: TransactionReceipt;
  confirmations?: number;
}

/**
 * Token balance
 */
export interface TokenBalance {
  address: Address;
  symbol: string;
  name: string;
  decimals: number;
  balance: bigint;
  formatted: string;
  logo?: string;
}

/**
 * NFT metadata (ERC-721/ERC-1155)
 */
export interface NFTMetadata {
  tokenId: bigint;
  contractAddress: Address;
  name: string;
  description?: string;
  image?: string;
  attributes?: Array<{
    trait_type: string;
    value: string | number;
  }>;
  tokenUri?: string;
  owner: Address;
  standard: "ERC721" | "ERC1155";
  balance?: bigint; // For ERC-1155
}

/**
 * Gas estimation result
 */
export interface GasEstimation {
  gasLimit: bigint;
  maxFeePerGas: bigint;
  maxPriorityFeePerGas: bigint;
  totalCost: bigint;
  totalCostFormatted: string;
}

/**
 * Event listener configuration
 */
export interface EventListenerConfig {
  contractAddress: Address;
  eventName: string;
  fromBlock?: bigint;
  toBlock?: bigint;
  onLogs: (logs: Log[]) => void;
  onError?: (error: Error) => void;
}

/**
 * Contract call result
 */
export interface ContractCallResult<T = unknown> {
  data: Ref<T | null>;
  error: Ref<Error | null>;
  isLoading: Ref<boolean>;
  refetch: () => Promise<void>;
}

/**
 * Contract write result
 */
export interface ContractWriteResult {
  hash: Ref<Hash | null>;
  error: Ref<Error | null>;
  isLoading: Ref<boolean>;
  isSuccess: Ref<boolean>;
  write: (params?: {
    args?: unknown[];
    value?: bigint;
  }) => Promise<Hash | undefined>;
  waitForConfirmation: () => Promise<TransactionReceipt | undefined>;
}

/**
 * Multicall request
 */
export interface MulticallRequest {
  address: Address;
  abi: any[];
  functionName: string;
  args?: unknown[];
}

/**
 * Network switch request
 */
export interface NetworkSwitchRequest {
  chainId: number;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

/**
 * Error types
 */
export enum ErrorType {
  WALLET_NOT_CONNECTED = "WALLET_NOT_CONNECTED",
  UNSUPPORTED_CHAIN = "UNSUPPORTED_CHAIN",
  USER_REJECTED = "USER_REJECTED",
  INSUFFICIENT_FUNDS = "INSUFFICIENT_FUNDS",
  CONTRACT_ERROR = "CONTRACT_ERROR",
  NETWORK_ERROR = "NETWORK_ERROR",
  INVALID_ADDRESS = "INVALID_ADDRESS",
  TRANSACTION_FAILED = "TRANSACTION_FAILED",
  UNKNOWN = "UNKNOWN",
}

/**
 * Typed error with context
 */
export interface DAppError extends Error {
  type: ErrorType;
  code?: string | number;
  data?: unknown;
}

/**
 * Typed error with context
 */
// export interface DefineStoreOptions {
//   type: ErrorType;
//   code?: string | number;
//   data?: unknown;
// }
