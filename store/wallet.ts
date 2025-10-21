import { defineStore } from "pinia";
import type { Address } from "viem";
import type { WalletState } from "~/types";
import { ErrorType } from "~/types";
import { createDAppError } from "~/lib/utils/errors";

export const useWalletStore = defineStore(
  "wallet",
  {
    state: (): WalletState => ({
      address: null,
      chainId: null,
      isConnected: false,
      isConnecting: false,
      connector: null,
      ensureConnected: null,
    }),

    getters: {
      /**
       * Get shortened address for display
       */
      shortAddress(): string | null {
        if (!this.address) return null;
        return `${this.address.slice(0, 6)}...${this.address.slice(-4)}`;
      },

      /**
       * Check if wallet is connected to a specific chain
       */
      isOnChain:
        (state) =>
        (chainId: number): boolean => {
          return state.chainId === chainId;
        },
    },

    actions: {
      /**
       * Set wallet connection state
       */
      setConnected(address: Address, chainId: number, connector: string = "") {
        debugger
        this.address = address;
        this.chainId = chainId;
        this.isConnected = true;
        this.connector = connector;
        this.isConnecting = false;
      },

      /**
       * Set connecting state
       */
      setConnecting(isConnecting: boolean) {
        this.isConnecting = isConnecting;
      },

      /**
       * Disconnect wallet
       */
      disconnect() {
        this.address = null;
        this.chainId = null;
        this.isConnected = false;
        this.connector = null;
        this.isConnecting = false;
      },

      /**
       * Update chain ID
       */
      setChainId(chainId: number) {
        this.chainId = chainId;
      },

      /**
       * Ensure wallet is connected (throws if not)
       */
      ensureConnected() {
        if (!this.isConnected || !this.address) {
          throw createDAppError(
            "Wallet is not connected",
            ErrorType.WALLET_NOT_CONNECTED
          );
        }
      },

      /**
       * Ensure wallet is on specific chain (throws if not)
       */
      ensureChain(chainId: number) {
        this.ensureConnected();
        if (this.chainId !== chainId) {
          throw createDAppError(
            `Please switch to chain ${chainId}`,
            ErrorType.UNSUPPORTED_CHAIN
          );
        }
      },
    },
  }
  // { persist: true as any }
);
