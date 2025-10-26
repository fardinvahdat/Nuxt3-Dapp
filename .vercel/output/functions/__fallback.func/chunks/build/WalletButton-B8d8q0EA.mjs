import { defineComponent, mergeProps, ref, computed, unref, watch, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrIncludeBooleanAttr, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderTeleport, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import { e as defineStore } from './server.mjs';
import { formatEther, formatUnits, createPublicClient, http, parseUnits } from 'viem';
import { mainnet, sepolia, goerli, polygon, polygonMumbai, arbitrum, optimism, base } from 'viem/chains';

const _sfc_main$2 = {
  __name: "Icon",
  __ssrInlineRender: true,
  props: {
    name: {
      default: ""
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.name == "logo") {
        _push(`<svg${ssrRenderAttrs(mergeProps({
          width: "32",
          height: "32",
          viewBox: "0 0 32 32",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg"
        }, _attrs))}><rect width="32" height="32" rx="8" fill="url(#gradient)"></rect><path d="M16 8L8 16L16 24L24 16L16 8Z" fill="white" fill-opacity="0.9"></path><defs><linearGradient id="gradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse"><stop stop-color="#8B5CF6"></stop><stop offset="1" stop-color="#7C3AED"></stop></linearGradient></defs></svg>`);
      } else if (__props.name == "home") {
        _push(`<svg${ssrRenderAttrs(mergeProps({
          width: "20",
          height: "20",
          viewBox: "0 0 20 20",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg"
        }, _attrs))}><path d="M7.5 14.1667H12.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M10.0001 2.29175L3.39175 7.40841C2.86675 7.81675 2.45008 8.75841 2.55841 9.40841L3.55008 16.0001C3.70008 17.0167 4.66675 17.8501 5.70008 17.8501H14.3001C15.3251 17.8501 16.3001 17.0084 16.4501 15.9917L17.4417 9.40008C17.5417 8.75841 17.1251 7.81675 16.6084 7.40008L10.0001 2.29175Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`);
      } else if (__props.name == "transfer") {
        _push(`<svg${ssrRenderAttrs(mergeProps({
          width: "20",
          height: "20",
          viewBox: "0 0 20 20",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg"
        }, _attrs))}><path d="M7.5 11.6667L12.5 6.66675" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M10.3417 11.6667H7.5V8.82508" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7.5 18.3333H12.5C16.6667 18.3333 18.3333 16.6667 18.3333 12.5V7.5C18.3333 3.33333 16.6667 1.66667 12.5 1.66667H7.5C3.33333 1.66667 1.66667 3.33333 1.66667 7.5V12.5C1.66667 16.6667 3.33333 18.3333 7.5 18.3333Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`);
      } else if (__props.name == "contract") {
        _push(`<svg${ssrRenderAttrs(mergeProps({
          width: "20",
          height: "20",
          viewBox: "0 0 20 20",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg"
        }, _attrs))}><path d="M10 18.3333C14.6024 18.3333 18.3333 14.6024 18.3333 10C18.3333 5.39763 14.6024 1.66667 10 1.66667C5.39763 1.66667 1.66667 5.39763 1.66667 10C1.66667 14.6024 5.39763 18.3333 10 18.3333Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M10 6.66667V10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M10 13.3333H10.0083" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>`);
      } else if (__props.name == "menu-open") {
        _push(`<svg${ssrRenderAttrs(mergeProps({
          width: "24",
          height: "24",
          viewBox: "0 0 24 24",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg"
        }, _attrs))}><path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>`);
      } else if (__props.name == "menu-close") {
        _push(`<svg${ssrRenderAttrs(mergeProps({
          width: "24",
          height: "24",
          viewBox: "0 0 24 24",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg"
        }, _attrs))}><path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>`);
      } else if (__props.name == "wallet") {
        _push(`<svg${ssrRenderAttrs(mergeProps({
          width: "20",
          height: "20",
          viewBox: "0 0 20 20",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg"
        }, _attrs))}><path d="M17.5 7.5H15.8333C14.9167 7.5 14.1667 6.75 14.1667 5.83333V4.16667C14.1667 3.25 14.9167 2.5 15.8333 2.5H17.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M17.5 12.5H15.8333C14.9167 12.5 14.1667 11.75 14.1667 10.8333V9.16667C14.1667 8.25 14.9167 7.5 15.8333 7.5H17.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M2.5 7.5V5.83333C2.5 4.45833 3.625 3.33333 5 3.33333H8.33333" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M2.5 12.5V14.1667C2.5 15.5417 3.625 16.6667 5 16.6667H15C16.375 16.6667 17.5 15.5417 17.5 14.1667V12.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`);
      } else if (__props.name == "avatar") {
        _push(`<svg${ssrRenderAttrs(mergeProps({
          width: "12",
          height: "12",
          viewBox: "0 0 16 16",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg"
        }, _attrs))}><path d="M8 8C10.21 8 12 6.21 12 4C12 1.79 10.21 0 8 0C5.79 0 4 1.79 4 4C4 6.21 5.79 8 8 8ZM8 10C5.33 10 0 11.34 0 14V16H16V14C16 11.34 10.67 10 8 10Z" fill="currentColor"></path></svg>`);
      } else if (__props.name == "copy") {
        _push(`<svg${ssrRenderAttrs(mergeProps({
          width: "20",
          height: "20",
          viewBox: "0 0 20 20",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg"
        }, _attrs))}><path d="M13.3333 10.7501V14.2501C13.3333 16.9168 12.25 18.0001 9.58333 18.0001H5.75C3.08333 18.0001 2 16.9168 2 14.2501V10.4168C2 7.75011 3.08333 6.66678 5.75 6.66678H9.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M13.3333 10.7501H10.8333C9.58333 10.7501 9.25 10.4168 9.25 9.16678V6.66678L13.3333 10.7501Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M10.4167 2H12.9167" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M6.66675 4.33333C6.66675 3.04167 7.70841 2 9.00008 2H11.0834" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M18 6.66667V11.525C18 12.7333 17.0167 13.7167 15.8083 13.7167" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M18 6.66667H15.5C14.2583 6.66667 14 6.39167 14 5.16667V2.66667L18 6.66667Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`);
      } else if (__props.name == "explore") {
        _push(`<svg${ssrRenderAttrs(mergeProps({
          width: "20",
          height: "20",
          viewBox: "0 0 20 20",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg"
        }, _attrs))}><path d="M11.2583 8.74167L17.425 2.575" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M18.3333 5.66667V1.66667H14.3333" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M9.16667 1.66667H7.5C3.33333 1.66667 1.66667 3.33333 1.66667 7.5V12.5C1.66667 16.6667 3.33333 18.3333 7.5 18.3333H12.5C16.6667 18.3333 18.3333 16.6667 18.3333 12.5V10.8333" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`);
      } else if (__props.name == "log-out") {
        _push(`<svg${ssrRenderAttrs(mergeProps({
          width: "20",
          height: "20",
          viewBox: "0 0 20 20",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg"
        }, _attrs))}><path d="M7.41675 6.29995C7.67508 3.29995 9.21675 2.07495 12.5917 2.07495H12.7001C16.4251 2.07495 17.9167 3.56662 17.9167 7.29162V12.725C17.9167 16.45 16.4251 17.9416 12.7001 17.9416H12.5917C9.24175 17.9416 7.70008 16.7333 7.42508 13.7833" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12.5 10H3.01667" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.87508 7.20825L2.08341 9.99992L4.87508 12.7916" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`);
      } else if (__props.name == "close") {
        _push(`<svg${ssrRenderAttrs(mergeProps({
          width: "24",
          height: "24",
          viewBox: "0 0 24 24",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg"
        }, _attrs))}><path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>`);
      } else if (__props.name == "plus") {
        _push(`<svg${ssrRenderAttrs(mergeProps({
          width: "24",
          height: "24",
          viewBox: "0 0 24 24",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg"
        }, _attrs))}><path d="M12 6V18M6 12H18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>`);
      } else if (__props.name == "minus") {
        _push(`<svg${ssrRenderAttrs(mergeProps({
          width: "24",
          height: "24",
          viewBox: "0 0 24 24",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg"
        }, _attrs))}><path d="M6 12H18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>`);
      } else if (__props.name == "info") {
        _push(`<svg${ssrRenderAttrs(mergeProps({
          width: "24",
          height: "24",
          viewBox: "0 0 24 24",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg"
        }, _attrs))}><path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>`);
      } else if (__props.name == "clock") {
        _push(`<svg${ssrRenderAttrs(mergeProps({
          width: "64",
          height: "64",
          viewBox: "0 0 64 64",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg"
        }, _attrs))}><circle cx="32" cy="32" r="32" fill="var(--color-bg-secondary)"></circle><path d="M32 20V32L38.6667 38.6667" stroke="var(--color-text-tertiary)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path></svg>`);
      } else if (__props.name == "increase") {
        _push(`<svg${ssrRenderAttrs(mergeProps({
          width: "20",
          height: "20",
          viewBox: "0 0 20 20",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg"
        }, _attrs))}><path d="M5 10L10 5L15 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M10 15V5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>`);
      } else if (__props.name == "decrease") {
        _push(`<svg${ssrRenderAttrs(mergeProps({
          width: "20",
          height: "20",
          viewBox: "0 0 20 20",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg"
        }, _attrs))}><path d="M15 10L10 15L5 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M10 5V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>`);
      } else if (__props.name == "check") {
        _push(`<svg${ssrRenderAttrs(mergeProps({
          width: "20",
          height: "20",
          viewBox: "0 0 20 20",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg"
        }, _attrs))}><path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>`);
      } else if (__props.name == "price") {
        _push(`<svg${ssrRenderAttrs(mergeProps({
          width: "32",
          height: "32",
          viewBox: "0 0 32 32",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg"
        }, _attrs))}><path d="M24 14.6667V21.3333C24 26.6667 22 28.6667 16.6667 28.6667H10.6667C5.33333 28.6667 3.33333 26.6667 3.33333 21.3333V14.6667C3.33333 9.33333 5.33333 7.33333 10.6667 7.33333H16.6667C22 7.33333 24 9.33333 24 14.6667Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M28.6667 10.6667V17.3333C28.6667 20.6667 27.3333 22 24 22V14.6667C24 9.33333 22 7.33333 16.6667 7.33333H8.66667V5.33333C8.66667 2 10 0.666667 13.3333 0.666667H24C27.3333 0.666667 28.6667 2 28.6667 5.33333" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M9.33203 19.3333H14.6654" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M9.33203 24H17.332" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>`);
      } else if (__props.name == "time") {
        _push(`<svg${ssrRenderAttrs(mergeProps({
          width: "24",
          height: "24",
          viewBox: "0 0 24 24",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg"
        }, _attrs))}><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 6V12L16 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>`);
      } else if (__props.name == "cost") {
        _push(`<svg${ssrRenderAttrs(mergeProps({
          width: "24",
          height: "24",
          viewBox: "0 0 24 24",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg"
        }, _attrs))}><path d="M9 11L12 14L22 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>`);
      } else if (__props.name == "shield") {
        _push(`<svg${ssrRenderAttrs(mergeProps({
          width: "24",
          height: "24",
          viewBox: "0 0 24 24",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg"
        }, _attrs))}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Icon.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var ErrorType = /* @__PURE__ */ ((ErrorType2) => {
  ErrorType2["WALLET_NOT_CONNECTED"] = "WALLET_NOT_CONNECTED";
  ErrorType2["UNSUPPORTED_CHAIN"] = "UNSUPPORTED_CHAIN";
  ErrorType2["USER_REJECTED"] = "USER_REJECTED";
  ErrorType2["INSUFFICIENT_FUNDS"] = "INSUFFICIENT_FUNDS";
  ErrorType2["CONTRACT_ERROR"] = "CONTRACT_ERROR";
  ErrorType2["NETWORK_ERROR"] = "NETWORK_ERROR";
  ErrorType2["INVALID_ADDRESS"] = "INVALID_ADDRESS";
  ErrorType2["TRANSACTION_FAILED"] = "TRANSACTION_FAILED";
  ErrorType2["UNKNOWN"] = "UNKNOWN";
  return ErrorType2;
})(ErrorType || {});
function createDAppError(message, type = ErrorType.UNKNOWN, data) {
  const error = new Error(message);
  error.type = type;
  error.data = data;
  return error;
}
function parseWeb3Error(error) {
  if (isDAppError(error)) {
    return error;
  }
  const errorMessage = error instanceof Error ? error.message : String(error);
  const errorCode = error == null ? void 0 : error.code;
  if (errorMessage.includes("User rejected") || errorMessage.includes("User denied") || errorCode === 4001 || errorCode === "ACTION_REJECTED") {
    return createDAppError("Transaction was rejected by user", ErrorType.USER_REJECTED, error);
  }
  if (errorMessage.includes("insufficient funds") || errorMessage.includes("insufficient balance")) {
    return createDAppError("Insufficient funds for transaction", ErrorType.INSUFFICIENT_FUNDS, error);
  }
  if (errorMessage.includes("Unsupported chain") || errorMessage.includes("Chain not configured")) {
    return createDAppError("Unsupported blockchain network", ErrorType.UNSUPPORTED_CHAIN, error);
  }
  if (errorMessage.includes("execution reverted") || errorMessage.includes("contract error")) {
    return createDAppError("Contract execution failed", ErrorType.CONTRACT_ERROR, error);
  }
  if (errorMessage.includes("network") || errorMessage.includes("fetch failed") || errorMessage.includes("timeout")) {
    return createDAppError("Network request failed", ErrorType.NETWORK_ERROR, error);
  }
  if (errorMessage.includes("invalid address")) {
    return createDAppError("Invalid Ethereum address", ErrorType.INVALID_ADDRESS, error);
  }
  return createDAppError(errorMessage, ErrorType.UNKNOWN, error);
}
function isDAppError(error) {
  return error instanceof Error && "type" in error;
}
function getUserFriendlyErrorMessage(error) {
  if (isDAppError(error)) {
    switch (error.type) {
      case ErrorType.WALLET_NOT_CONNECTED:
        return "Please connect your wallet to continue";
      case ErrorType.USER_REJECTED:
        return "Transaction was cancelled";
      case ErrorType.INSUFFICIENT_FUNDS:
        return "You don't have enough funds for this transaction";
      case ErrorType.UNSUPPORTED_CHAIN:
        return "This network is not supported. Please switch to a supported network";
      case ErrorType.CONTRACT_ERROR:
        return "Smart contract execution failed. Please try again";
      case ErrorType.NETWORK_ERROR:
        return "Network connection error. Please check your connection";
      case ErrorType.INVALID_ADDRESS:
        return "Invalid wallet address provided";
      case ErrorType.TRANSACTION_FAILED:
        return "Transaction failed. Please try again";
      default:
        return error.message;
    }
  }
  return error.message;
}
const useWalletStore = defineStore(
  "wallet",
  {
    state: () => ({
      address: null,
      chainId: null,
      isConnected: false,
      isConnecting: false,
      connector: null,
      ensureConnected: null
    }),
    getters: {
      /**
       * Get shortened address for display
       */
      shortAddress() {
        if (!this.address) return null;
        return `${this.address.slice(0, 6)}...${this.address.slice(-4)}`;
      },
      /**
       * Check if wallet is connected to a specific chain
       */
      isOnChain: (state) => (chainId) => {
        return state.chainId === chainId;
      }
    },
    actions: {
      /**
       * Set wallet connection state
       */
      setConnected(address, chainId, connector = "") {
        debugger;
        this.address = address;
        this.chainId = chainId;
        this.isConnected = true;
        this.connector = connector;
        this.isConnecting = false;
      },
      /**
       * Set connecting state
       */
      setConnecting(isConnecting) {
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
      setChainId(chainId) {
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
      ensureChain(chainId) {
        this.ensureConnected();
        if (this.chainId !== chainId) {
          throw createDAppError(
            `Please switch to chain ${chainId}`,
            ErrorType.UNSUPPORTED_CHAIN
          );
        }
      }
    }
  }
  // { persist: true as any }
);
const useUIStore = defineStore("ui", {
  state: () => ({
    toasts: [],
    isWalletModalOpen: false,
    isNetworkModalOpen: false,
    isSidebarOpen: false,
    theme: "system"
  }),
  actions: {
    /**
     * Add a toast notification
     */
    addToast(toast) {
      const id = `toast-${Date.now()}-${Math.random()}`;
      const newToast = {
        id,
        duration: 5e3,
        ...toast
      };
      this.toasts.push(newToast);
      if (newToast.duration) {
        setTimeout(() => {
          this.removeToast(id);
        }, newToast.duration);
      }
    },
    /**
     * Remove a toast by ID
     */
    removeToast(id) {
      this.toasts = this.toasts.filter((t) => t.id !== id);
    },
    /**
     * Clear all toasts
     */
    clearToasts() {
      this.toasts = [];
    },
    /**
     * Show success toast
     */
    showSuccess(message, description) {
      this.addToast({ type: "success", message, description });
    },
    /**
     * Show error toast
     */
    showError(message, description) {
      this.addToast({ type: "error", message, description });
    },
    /**
     * Show warning toast
     */
    showWarning(message, description) {
      this.addToast({ type: "warning", message, description });
    },
    /**
     * Show info toast
     */
    showInfo(message, description) {
      this.addToast({ type: "info", message, description });
    },
    /**
     * Toggle wallet modal
     */
    toggleWalletModal(open) {
      this.isWalletModalOpen = open != null ? open : !this.isWalletModalOpen;
    },
    /**
     * Toggle network modal
     */
    toggleNetworkModal(open) {
      this.isNetworkModalOpen = open != null ? open : !this.isNetworkModalOpen;
    },
    /**
     * Toggle sidebar
     */
    toggleSidebar(open) {
      this.isSidebarOpen = open != null ? open : !this.isSidebarOpen;
    },
    /**
     * Set theme
     */
    setTheme(theme) {
      this.theme = theme;
      this.applyTheme();
    },
    /**
     * Apply theme to document
     */
    applyTheme() {
    }
  }
});
let eventListenersInitialized = false;
function useWallet() {
  const walletStore = useWalletStore();
  const uiStore = useUIStore();
  const isConnecting = ref(false);
  const error = ref(null);
  const address = computed(() => walletStore.address);
  const chainId = computed(() => walletStore.chainId);
  const isConnected = computed(() => walletStore.isConnected);
  const connector = computed(() => walletStore.connector);
  const shortAddress = computed(() => walletStore.shortAddress);
  async function connect(connectorName = "metamask") {
    isConnecting.value = true;
    error.value = null;
    walletStore.setConnecting(true);
    try {
      if (true) {
        throw new Error("No Ethereum provider found. Please install MetaMask.");
      }
      const accounts = await (void 0).ethereum.request({
        method: "eth_requestAccounts"
      });
      if (!accounts || accounts.length === 0) {
        throw new Error("No accounts found");
      }
      const chainIdHex = await (void 0).ethereum.request({
        method: "eth_chainId"
      });
      const currentChainId = parseInt(chainIdHex, 16);
      walletStore.setConnected(
        accounts[0],
        currentChainId,
        connectorName
      );
      uiStore.showSuccess("Wallet connected successfully");
      setupEventListeners();
    } catch (err) {
      const parsedError = parseWeb3Error(err);
      error.value = parsedError;
      uiStore.showError("Failed to connect wallet", getUserFriendlyErrorMessage(parsedError));
      throw parsedError;
    } finally {
      isConnecting.value = false;
      walletStore.setConnecting(false);
    }
  }
  async function disconnect() {
    var _a;
    try {
      cleanupEventListeners();
      walletStore.disconnect();
      if (false) ;
      if ((_a = (void 0).ethereum) == null ? void 0 : _a.request) {
        try {
          await (void 0).ethereum.request({
            method: "wallet_revokePermissions",
            params: [{ eth_accounts: {} }]
          });
        } catch (err) {
          console.warn("Wallet revoke permissions not supported:", err);
        }
      }
      uiStore.showSuccess("Wallet disconnected successfully");
    } catch (err) {
      console.error("Error during disconnect:", err);
      uiStore.showSuccess("Wallet disconnected successfully");
    }
  }
  async function switchChain(targetChainId) {
    if (!(void 0).ethereum) {
      throw new Error("No Ethereum provider found");
    }
    try {
      const chainIdHex = `0x${targetChainId.toString(16)}`;
      await (void 0).ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: chainIdHex }]
      });
      walletStore.setChainId(targetChainId);
      uiStore.showSuccess("Network switched successfully");
    } catch (err) {
      if (err.code === 4902) {
        uiStore.showError("Network not found", "Please add this network to your wallet manually");
      } else {
        const parsedError = parseWeb3Error(err);
        uiStore.showError("Failed to switch network", getUserFriendlyErrorMessage(parsedError));
        throw parsedError;
      }
    }
  }
  function setupEventListeners() {
    if (!(void 0).ethereum || eventListenersInitialized) return;
    (void 0).ethereum.on("accountsChanged", handleAccountsChanged);
    (void 0).ethereum.on("chainChanged", handleChainChanged);
    (void 0).ethereum.on("disconnect", handleDisconnect);
    eventListenersInitialized = true;
  }
  function cleanupEventListeners() {
    if (!(void 0).ethereum) return;
    (void 0).ethereum.removeListener("accountsChanged", handleAccountsChanged);
    (void 0).ethereum.removeListener("chainChanged", handleChainChanged);
    (void 0).ethereum.removeListener("disconnect", handleDisconnect);
    eventListenersInitialized = false;
  }
  function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
      disconnect();
    } else if (accounts[0] !== walletStore.address) {
      walletStore.setConnected(
        accounts[0],
        walletStore.chainId,
        walletStore.connector
      );
      uiStore.showInfo("Account changed");
    }
  }
  function handleChainChanged(chainIdHex) {
    const newChainId = parseInt(chainIdHex, 16);
    walletStore.setChainId(newChainId);
    uiStore.showInfo("Network changed");
  }
  function handleDisconnect() {
    disconnect();
  }
  async function autoConnect() {
    debugger;
    if (walletStore.connector && walletStore.address) {
      try {
        if ((void 0).ethereum) {
          const accounts = await (void 0).ethereum.request({
            method: "eth_accounts"
          });
          if (accounts && accounts.length > 0 && accounts[0] === walletStore.address) {
            const chainIdHex = await (void 0).ethereum.request({
              method: "eth_chainId"
            });
            const currentChainId = parseInt(chainIdHex, 16);
            walletStore.setConnected(
              accounts[0],
              currentChainId,
              walletStore.connector
            );
            setupEventListeners();
          } else {
            walletStore.disconnect();
          }
        }
      } catch (err) {
        console.warn("Auto-connect failed:", err);
        walletStore.disconnect();
      }
    }
  }
  return {
    // State
    address,
    chainId,
    isConnected,
    isConnecting: computed(() => isConnecting.value || walletStore.isConnecting),
    connector,
    shortAddress,
    error: computed(() => error.value),
    // Methods
    connect,
    disconnect,
    switchChain,
    autoConnect
  };
}
function createPublicClientForChain(chain = mainnet) {
  const client = createPublicClient({
    chain,
    transport: http()
  });
  return client;
}
function createWalletClientForChain(chain = mainnet) {
  {
    throw new Error("No Ethereum provider found");
  }
}
const publicClientCache = /* @__PURE__ */ new Map();
function getPublicClient(chain) {
  const cached = publicClientCache.get(chain.id);
  if (cached) return cached;
  const client = createPublicClientForChain(chain);
  publicClientCache.set(chain.id, client);
  return client;
}
const SUPPORTED_CHAINS = [
  mainnet,
  sepolia,
  goerli,
  polygon,
  polygonMumbai,
  arbitrum,
  optimism,
  base
];
const CHAIN_MAP = SUPPORTED_CHAINS.reduce((acc, chain) => {
  acc[chain.id] = chain;
  return acc;
}, {});
({
  [mainnet.id]: {
    nativeCurrency: mainnet.nativeCurrency
  },
  [sepolia.id]: {
    nativeCurrency: sepolia.nativeCurrency
  },
  [polygon.id]: {
    nativeCurrency: polygon.nativeCurrency
  }
});
function getChainById(chainId) {
  return CHAIN_MAP[chainId];
}
function formatWeiToEther(wei, decimals = 4) {
  const ether = formatEther(wei);
  return parseFloat(ether).toFixed(decimals);
}
function formatTokenAmount(amount, decimals, displayDecimals = 4) {
  const formatted = formatUnits(amount, decimals);
  return parseFloat(formatted).toFixed(displayDecimals);
}
function parseTokenAmount(amount, decimals) {
  return parseUnits(amount, decimals);
}
function formatGwei(wei) {
  return formatUnits(wei, 9);
}
function isValidAddress(address) {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}
function normalizeAddress(address) {
  return address.toLowerCase();
}
function useBalance(targetAddress) {
  const walletStore = useWalletStore();
  const balance = ref(null);
  const isLoading = ref(false);
  const error = ref(null);
  const addressToQuery = computed(() => walletStore.address);
  const formatted = computed(() => {
    if (!balance.value) return "0.0000";
    return formatWeiToEther(balance.value, 4);
  });
  const inEther = computed(() => {
    if (!balance.value) return "0";
    return formatEther(balance.value);
  });
  async function fetchBalance() {
    if (!addressToQuery.value || !walletStore.chainId) {
      return;
    }
    isLoading.value = true;
    error.value = null;
    try {
      const chain = getChainById(walletStore.chainId);
      if (!chain) {
        throw new Error("Unsupported chain");
      }
      const client = getPublicClient(chain);
      const result = await client.getBalance({
        address: addressToQuery.value
      });
      balance.value = result;
    } catch (err) {
      const parsedError = parseWeb3Error(err);
      error.value = parsedError;
      console.error("Failed to fetch balance:", parsedError);
    } finally {
      isLoading.value = false;
    }
  }
  async function refetch() {
    await fetchBalance();
  }
  watch(
    () => [addressToQuery.value, walletStore.chainId],
    () => {
      if (addressToQuery.value && walletStore.chainId) {
        fetchBalance();
      }
    },
    { immediate: true }
  );
  return {
    balance: computed(() => balance.value),
    formatted,
    inEther,
    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value),
    refetch
  };
}
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "WalletConnectModal",
  __ssrInlineRender: true,
  props: {
    isOpen: { type: Boolean }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const { isConnecting } = useWallet();
    useUIStore();
    const selectedWallet = ref(null);
    const isMetaMaskAvailable = computed(() => {
      return false;
    });
    const isCoinbaseAvailable = computed(() => {
      return false;
    });
    const isBraveAvailable = computed(() => {
      return false;
    });
    const wallets = computed(() => [
      {
        id: "metamask",
        name: "MetaMask",
        description: "Connect using browser wallet",
        icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEyIiBoZWlnaHQ9IjE4OSIgdmlld0JveD0iMCAwIDIxMiAxODkiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xOTkuNjYgMEw5Ni4xNiA3Ny41Mkw5Ni43NyA5My4zTDE5OS42NiAwWiIgZmlsbD0iI0UxNzczQSIvPgo8cGF0aCBkPSJNMTkuNjYgMEwxMjMuMTYgNzcuNTJMMTIzLjc3IDkzLjNMMTkuNjYgMFoiIGZpbGw9IiNFMTc3M0EiLz4KPC9zdmc+Cg==",
        available: isMetaMaskAvailable.value,
        popular: true,
        installUrl: "https://metamask.io/download/"
      },
      {
        id: "coinbase",
        name: "Coinbase Wallet",
        description: "Connect using Coinbase",
        icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAyNCIgaGVpZ2h0PSIxMDI0IiB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8Y2lyY2xlIGN4PSI1MTIiIGN5PSI1MTIiIHI9IjUxMiIgZmlsbD0iIzAwNTJGRiIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTE1MiA1MTJDMTUyIDcxMC44MjMgMzEzLjE3NyA4NzIgNTEyIDg3MkM3MTAuODIzIDg3MiA4NzIgNzEwLjgyMyA4NzIgNTEyQzg3MiAzMTMuMTc3IDcxMC44MjMgMTUyIDUxMiAxNTJDMzEzLjE3NyAxNTIgMTUyIDMxMy4xNzcgMTUyIDUxMlpNNDIwIDQyMEg2MDRWNjA0SDQyMFY0MjBaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K",
        available: isCoinbaseAvailable.value,
        installUrl: "https://www.coinbase.com/wallet"
      },
      {
        id: "walletconnect",
        name: "WalletConnect",
        description: "Scan with mobile wallet",
        icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE4NSIgdmlld0JveD0iMCAwIDMwMCAxODUiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik02MS40Mzc1IDM2Ljg5MjVDMTAxLjQ1IC0zLjEyMDgzIDE2Ny41NSAtMy4xMjA4MyAyMDcuNTYyIDM2Ljg5MjVMMjEyLjQzNyA0MS43NjY3QzIxNC40MzggNDMuNzY2NyAyMTQuNDM4IDQ3LjAzMzMgMjEyLjQzNyA0OS4wMzMzTDE5My44NjIgNjcuNjA4M0MxOTIuODYyIDY4LjYwODMgMTkxLjEzNyA2OC42MDgzIDE5MC4xMzcgNjcuNjA4M0wxODIuNjM3IDYwLjEwODNDMTU3LjEzNyAzNC42MDgzIDExNi44NjIgMzQuNjA4MyA5MS4zNjI1IDYwLjEwODNMODMuMzYyNSA2OC4xMDgzQzgyLjM2MjUgNjkuMTA4MyA4MC42Mzc1IDY5LjEwODMgNzkuNjM3NSA2OC4xMDgzTDYxLjA2MjUgNDkuNTMzM0M1OS4wNjI1IDQ3LjUzMzMgNTkuMDYyNSA0NC4yNjY3IDYxLjA2MjUgNDIuMjY2N0w2MS40Mzc1IDM2Ljg5MjVaIiBmaWxsPSIjM0I5OUZDIi8+Cjwvc3ZnPgo=",
        available: true,
        // WalletConnect is always available
        installUrl: "https://walletconnect.com/"
      },
      {
        id: "brave",
        name: "Brave Wallet",
        description: "Connect using Brave browser",
        icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjI1NiIgY3k9IjI1NiIgcj0iMjU2IiBmaWxsPSIjRkI1NDJCIi8+Cjwvc3ZnPgo=",
        available: isBraveAvailable.value,
        installUrl: "https://brave.com/wallet/"
      }
    ]);
    watch(
      () => isConnecting.value,
      (connecting, wasConnecting) => {
        if (wasConnecting && !connecting && selectedWallet.value) {
          selectedWallet.value = null;
        }
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = _sfc_main$2;
      ssrRenderTeleport(_push, (_push2) => {
        if (__props.isOpen) {
          _push2(`<div class="modal-overlay"><div class="modal-container"><div class="modal-header"><h2>Connect Wallet</h2><button class="close-button" aria-label="Close">`);
          _push2(ssrRenderComponent(_component_Icon, { name: "close" }, null, _parent));
          _push2(`</button></div><div class="modal-content"><p class="modal-description"> Choose your preferred wallet to connect to this dApp </p><div class="wallets-grid"><!--[-->`);
          ssrRenderList(wallets.value, (wallet) => {
            _push2(`<button${ssrIncludeBooleanAttr(unref(isConnecting) || !wallet.available) ? " disabled" : ""} class="${ssrRenderClass([{ "wallet-option--disabled": !wallet.available }, "wallet-option"])}"><div class="wallet-option__icon"><img${ssrRenderAttr("src", wallet.icon)}${ssrRenderAttr("alt", wallet.name)}></div><div class="wallet-option__info"><h3>${ssrInterpolate(wallet.name)}</h3>`);
            if (!wallet.available) {
              _push2(`<p class="wallet-option__status"> Not installed </p>`);
            } else if (unref(isConnecting) && selectedWallet.value === wallet.id) {
              _push2(`<p class="wallet-option__status wallet-option__status--connecting"> Connecting... </p>`);
            } else {
              _push2(`<p class="wallet-option__status">${ssrInterpolate(wallet.description)}</p>`);
            }
            _push2(`</div>`);
            if (wallet.popular) {
              _push2(`<div class="wallet-option__badge"> Popular </div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</button>`);
          });
          _push2(`<!--]--></div><div class="modal-footer"><p class="modal-footer__text"> New to Ethereum? <a href="https://ethereum.org/wallets" target="_blank" rel="noopener noreferrer"> Learn more about wallets </a></p></div></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/web3/WalletConnectModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "WalletButton",
  __ssrInlineRender: true,
  setup(__props) {
    const {
      isConnected,
      isConnecting,
      chainId,
      shortAddress
    } = useWallet();
    const balance = useBalance();
    useUIStore();
    const isDropdownOpen = ref(false);
    const isModalOpen = ref(false);
    const copied = ref(false);
    const chainName = computed(() => {
      if (!chainId.value) return "Unknown";
      const chain = getChainById(chainId.value);
      return (chain == null ? void 0 : chain.name) || "Unknown";
    });
    const nativeCurrency = computed(() => {
      if (!chainId.value) return "ETH";
      const chain = getChainById(chainId.value);
      return (chain == null ? void 0 : chain.nativeCurrency.symbol) || "ETH";
    });
    function closeModal() {
      isModalOpen.value = false;
    }
    function formatBalance(balance2) {
      const num = parseFloat(balance2);
      if (isNaN(num)) return "0.00";
      if (num === 0) return "0.00";
      if (num < 1e-4) return "< 0.0001";
      return num.toFixed(4);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "wallet-button-wrapper" }, _attrs))}>`);
      if (!unref(isConnected)) {
        _push(`<button${ssrIncludeBooleanAttr(unref(isConnecting)) ? " disabled" : ""} class="wallet-button wallet-button--connect">`);
        if (!unref(isConnecting)) {
          _push(ssrRenderComponent(_component_Icon, { name: "wallet" }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        if (unref(isConnecting)) {
          _push(`<span class="spinner"></span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<span>${ssrInterpolate(unref(isConnecting) ? "Connecting..." : "Connect Wallet")}</span></button>`);
      } else {
        _push(`<div class="wallet-connected"><button class="wallet-button wallet-button--connected"><div class="wallet-avatar">`);
        _push(ssrRenderComponent(_component_Icon, { name: "avatar" }, null, _parent));
        _push(`</div><div class="wallet-info"><span class="wallet-address">${ssrInterpolate(unref(shortAddress))}</span></div><svg class="${ssrRenderClass([{ "dropdown-icon--open": isDropdownOpen.value }, "dropdown-icon"])}" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>`);
        if (isDropdownOpen.value) {
          _push(`<div class="wallet-dropdown"><div class="dropdown-section"><div class="dropdown-item dropdown-item--header"><div class="account-info"><div class="account-avatar">`);
          _push(ssrRenderComponent(_component_Icon, { name: "avatar" }, null, _parent));
          _push(`</div><div><div class="account-label">Account</div><div class="account-address">${ssrInterpolate(unref(shortAddress))}</div></div></div></div><div class="dropdown-item dropdown-item--info"><div class="info-row"><span class="info-label">Balance</span>`);
          if (!unref(balance).isLoading.value) {
            _push(`<span class="info-value">${ssrInterpolate(formatBalance(unref(balance).formatted.value))} ${ssrInterpolate(nativeCurrency.value)}</span>`);
          } else {
            _push(`<span class="info-value"><span class="spinner spinner--small"></span></span>`);
          }
          _push(`</div></div><div class="dropdown-item dropdown-item--info"><div class="info-row"><span class="info-label">Network</span><span class="info-value"><span class="network-indicator"></span> ${ssrInterpolate(chainName.value)}</span></div></div></div><div class="dropdown-section"><button class="dropdown-item dropdown-item--action">`);
          _push(ssrRenderComponent(_component_Icon, { name: "copy" }, null, _parent));
          _push(`<span>${ssrInterpolate(copied.value ? "Copied!" : "Copy Address")}</span></button><button class="dropdown-item dropdown-item--action">`);
          _push(ssrRenderComponent(_component_Icon, { name: "explore" }, null, _parent));
          _push(`<span>View on Explorer</span></button></div><div class="dropdown-section"><button class="dropdown-item dropdown-item--action dropdown-item--danger">`);
          _push(ssrRenderComponent(_component_Icon, { name: "log-out" }, null, _parent));
          _push(`<span>Disconnect</span></button></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
      _push(ssrRenderComponent(_sfc_main$1, {
        "is-open": isModalOpen.value,
        onClose: closeModal
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/web3/WalletButton.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { SUPPORTED_CHAINS as S, _sfc_main$2 as _, useBalance as a, useUIStore as b, useWalletStore as c, getPublicClient as d, getUserFriendlyErrorMessage as e, createWalletClientForChain as f, getChainById as g, formatTokenAmount as h, isValidAddress as i, parseTokenAmount as j, formatGwei as k, formatWeiToEther as l, _sfc_main as m, normalizeAddress as n, parseWeb3Error as p, useWallet as u };
//# sourceMappingURL=WalletButton-B8d8q0EA.mjs.map
