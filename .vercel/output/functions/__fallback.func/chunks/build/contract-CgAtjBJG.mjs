import { _ as _sfc_main$1 } from './WalletNotConnected-BkWT2AOS.mjs';
import { u as useWallet, b as useUIStore, g as getChainById, _ as _sfc_main$2, c as useWalletStore, d as getPublicClient, p as parseWeb3Error, e as getUserFriendlyErrorMessage, f as createWalletClientForChain } from './WalletButton-B8d8q0EA.mjs';
import { defineComponent, ref, computed, mergeProps, unref, watch, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderAttr, ssrRenderList } from 'vue/server-renderer';
import { u as useRuntimeConfig } from './server.mjs';
import { u as useHead } from './v3-Dx88fRy8.mjs';
import 'viem';
import 'viem/chains';
import 'node:http';
import 'node:https';
import 'node:zlib';
import 'node:stream';
import 'node:buffer';
import 'node:util';
import 'node:url';
import 'node:net';
import 'node:fs';
import 'node:path';
import '../nitro/nitro.mjs';
import 'node:events';
import 'node:crypto';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';

function useContractWrite(config) {
  const walletStore = useWalletStore();
  const uiStore = useUIStore();
  const hash = ref(null);
  const isLoading = ref(false);
  const isSuccess = ref(false);
  const error = ref(null);
  async function write(params) {
    walletStore.ensureConnected();
    isLoading.value = true;
    isSuccess.value = false;
    error.value = null;
    hash.value = null;
    try {
      const chain = getChainById(walletStore.chainId);
      if (!chain) {
        throw new Error("Unsupported chain");
      }
      const walletClient = createWalletClientForChain(chain);
      const txHash = await walletClient.writeContract({
        account: walletStore.address,
        address: config.address,
        abi: config.abi,
        functionName: config.functionName,
        args: params == null ? void 0 : params.args,
        value: params == null ? void 0 : params.value,
        chain
      });
      hash.value = txHash;
      isSuccess.value = true;
      uiStore.showSuccess("Transaction sent", `Hash: ${txHash.slice(0, 10)}...`);
      return txHash;
    } catch (err) {
      const parsedError = parseWeb3Error(err);
      error.value = parsedError;
      uiStore.showError("Transaction failed", getUserFriendlyErrorMessage(parsedError));
      throw parsedError;
    } finally {
      isLoading.value = false;
    }
  }
  async function waitForConfirmation() {
    if (!hash.value || !walletStore.chainId) {
      throw new Error("No transaction hash to wait for");
    }
    const chain = getChainById(walletStore.chainId);
    if (!chain) {
      throw new Error("Unsupported chain");
    }
    const publicClient = getPublicClient(chain);
    try {
      const receipt = await publicClient.waitForTransactionReceipt({
        hash: hash.value
      });
      if (receipt.status === "success") {
        uiStore.showSuccess("Transaction confirmed");
        return receipt;
      } else {
        throw new Error("Transaction failed");
      }
    } catch (err) {
      const parsedError = parseWeb3Error(err);
      error.value = parsedError;
      uiStore.showError("Transaction failed", getUserFriendlyErrorMessage(parsedError));
      throw parsedError;
    }
  }
  return {
    write,
    waitForConfirmation,
    hash,
    isLoading,
    isSuccess,
    error
  };
}
function mapViemLogToEvent(log) {
  var _a, _b, _c, _d, _e;
  return {
    eventName: (_a = log.eventName) != null ? _a : "Unknown",
    args: (_b = log.args) != null ? _b : {},
    blockNumber: (_c = log.blockNumber) != null ? _c : BigInt(0),
    transactionHash: (_d = log.transactionHash) != null ? _d : "0x",
    logIndex: (_e = log.logIndex) != null ? _e : 0,
    address: log.address
  };
}
function useEventListener(config) {
  const walletStore = useWalletStore();
  const events = ref([]);
  const isListening = ref(false);
  const error = ref(null);
  let unwatch = null;
  const isEnabled = computed(() => {
    const enabled = config.enabled;
    if (typeof enabled === "boolean") {
      return enabled;
    }
    if (enabled && "value" in enabled) {
      return enabled.value;
    }
    return true;
  });
  function startWatching() {
    if (!walletStore.chainId || !isEnabled.value) {
      return;
    }
    try {
      const chain = getChainById(walletStore.chainId);
      if (!chain) {
        throw new Error("Unsupported chain");
      }
      const publicClient = getPublicClient(chain);
      unwatch = publicClient.watchContractEvent({
        address: config.address,
        abi: config.abi,
        eventName: config.eventName,
        onLogs: (logs) => {
          const parsedLogs = logs.map(mapViemLogToEvent);
          events.value = [...parsedLogs, ...events.value];
          if (config.onLogs) {
            config.onLogs(parsedLogs);
          }
        },
        onError: (err) => {
          const parsedError = parseWeb3Error(err);
          error.value = parsedError;
          console.error("Event listener error:", parsedError);
        }
      });
      isListening.value = true;
    } catch (err) {
      const parsedError = parseWeb3Error(err);
      error.value = parsedError;
      console.error("Failed to start event listener:", parsedError);
    }
  }
  function stopWatching() {
    if (unwatch) {
      unwatch();
      unwatch = null;
      isListening.value = false;
    }
  }
  function clearEvents() {
    events.value = [];
  }
  async function fetchPastEvents(fromBlock, toBlock) {
    if (!walletStore.chainId) {
      return;
    }
    try {
      const chain = getChainById(walletStore.chainId);
      if (!chain) {
        throw new Error("Unsupported chain");
      }
      const publicClient = getPublicClient(chain);
      const logs = await publicClient.getContractEvents({
        address: config.address,
        abi: config.abi,
        eventName: config.eventName,
        fromBlock,
        toBlock
      });
      const parsedLogs = logs.map(mapViemLogToEvent);
      events.value = [...events.value, ...parsedLogs];
      return parsedLogs;
    } catch (err) {
      const parsedError = parseWeb3Error(err);
      error.value = parsedError;
      console.error("Failed to fetch past events:", parsedError);
      throw parsedError;
    }
  }
  watch(
    () => [walletStore.chainId, isEnabled.value],
    () => {
      stopWatching();
      if (isEnabled.value) {
        startWatching();
      }
    },
    { immediate: true }
  );
  return {
    events,
    isListening,
    error,
    startWatching,
    stopWatching,
    clearEvents,
    fetchPastEvents
  };
}
const COUNTER_ABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "message",
        "type": "string"
      }
    ],
    "name": "Decreament",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "message",
        "type": "string"
      }
    ],
    "name": "Increament",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "decreament",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getValue",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "increament",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
const COUNTER_ADDRESS = "0xE1154A98ca967d28B505D8DF29ebCE3dcB6B7BEe";
const SEPOLIA_CHAIN_ID = 11155111;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "contract",
  __ssrInlineRender: true,
  setup(__props) {
    const { isConnected, chainId } = useWallet();
    const uiStore = useUIStore();
    const writeLoading = ref(false);
    const txHash = ref(null);
    ref(false);
    const showABI = ref(false);
    const chainName = computed(() => {
      if (!chainId.value) return "Unknown";
      const chain = getChainById(chainId.value);
      return (chain == null ? void 0 : chain.name) || "Unknown";
    });
    const isOnSepolia = computed(() => chainId.value === SEPOLIA_CHAIN_ID);
    const isRefreshDisabled = computed(() => {
      var _a;
      return (_a = counterData.value) == null ? void 0 : _a.isLoading;
    });
    const isDecrementDisabled = computed(
      () => {
        var _a;
        return !isOnSepolia.value || writeLoading.value || ((_a = counterData.value) == null ? void 0 : _a.isLoading);
      }
    );
    const isIncrementDisabled = computed(
      () => {
        var _a;
        return !isOnSepolia.value || writeLoading.value || ((_a = counterData.value) == null ? void 0 : _a.isLoading);
      }
    );
    const counterData = ref(null);
    useContractWrite({
      address: COUNTER_ADDRESS,
      abi: COUNTER_ABI,
      functionName: "increament"
    });
    useContractWrite({
      address: COUNTER_ADDRESS,
      abi: COUNTER_ABI,
      functionName: "decreament"
    });
    const incrementEvents = useEventListener({
      address: COUNTER_ADDRESS,
      abi: COUNTER_ABI,
      eventName: "Increament",
      enabled: isOnSepolia,
      onLogs: (logs) => {
        var _a;
        uiStore.showSuccess("Counter Incremented!", "Transaction confirmed");
        (_a = counterData.value) == null ? void 0 : _a.refetch();
      }
    });
    const decrementEvents = useEventListener({
      address: COUNTER_ADDRESS,
      abi: COUNTER_ABI,
      eventName: "Decreament",
      enabled: isOnSepolia,
      onLogs: (logs) => {
        var _a;
        uiStore.showSuccess("Counter Decremented!", "Transaction confirmed");
        (_a = counterData.value) == null ? void 0 : _a.refetch();
      }
    });
    const events = computed(() => {
      return [
        ...incrementEvents.events.value,
        ...decrementEvents.events.value
      ].sort((a, b) => {
        const blockA = a.blockNumber || BigInt(0);
        const blockB = b.blockNumber || BigInt(0);
        return blockB > blockA ? 1 : -1;
      });
    });
    const explorerLink = computed(() => {
      if (!txHash.value) return "#";
      const config = useRuntimeConfig();
      return `${config.public.blockExplorerUrl}/tx/${txHash.value}`;
    });
    const formattedABI = computed(() => {
      return JSON.stringify(COUNTER_ABI, null, 2);
    });
    function getEventMessage(event) {
      if (event.args && event.args.message) {
        return event.args.message;
      }
      return "Counter value updated on blockchain";
    }
    useHead({
      title: "Counter - Nuxt DApp",
      meta: [
        { name: "description", content: "Interact with smart contract counter" }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d;
      const _component_Web3WalletNotConnected = _sfc_main$1;
      const _component_Icon = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "counter-page" }, _attrs))}><div class="page-header"><div class="page-header__content"><div><h1 class="page-title">Smart Contract Counter</h1><p class="page-description"> Interact with the deployed counter contract on the blockchain </p></div>`);
      if (unref(isConnected)) {
        _push(`<div class="page-header__badge"><div class="status-indicator status-indicator--connected"></div><span>Connected</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      if (!unref(isConnected)) {
        _push(ssrRenderComponent(_component_Web3WalletNotConnected, null, null, _parent));
      } else {
        _push(`<div class="content-grid"><div class="counter-card"><div class="counter-card__header"><h2>Current Value</h2><button class="icon-button"${ssrIncludeBooleanAttr(isRefreshDisabled.value) ? " disabled" : ""}><svg class="${ssrRenderClass({ spin: (_a = counterData.value) == null ? void 0 : _a.isLoading })}" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.8333 10C15.8333 13.2217 13.2217 15.8333 10 15.8333C6.77834 15.8333 4.16667 13.2217 4.16667 10C4.16667 6.77834 6.77834 4.16667 10 4.16667" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M13.3333 4.16667H15.8333V6.66667" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></button></div><div class="counter-display">`);
        if ((_b = counterData.value) == null ? void 0 : _b.isLoading) {
          _push(`<div class="counter-value counter-value--loading"><div class="spinner"></div></div>`);
        } else {
          _push(`<div class="counter-value"><span class="counter-number">${ssrInterpolate(((_d = (_c = counterData.value) == null ? void 0 : _c.data) == null ? void 0 : _d.toString()) || 0)}</span></div>`);
        }
        _push(`</div>`);
        if (!isOnSepolia.value) {
          _push(`<div class="network-warning"><div class="network-warning__icon">`);
          _push(ssrRenderComponent(_component_Icon, { name: "info" }, null, _parent));
          _push(`</div><div class="network-warning__content"><h4>Wrong Network</h4><p> This Contract is deployed on Sepolia testnet. Please switch to Sepolia to interact with it. </p></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="counter-actions"><button${ssrIncludeBooleanAttr(isDecrementDisabled.value) ? " disabled" : ""} class="counter-button counter-button--decrement"><span class="counter-button__icon">`);
        _push(ssrRenderComponent(_component_Icon, { name: "minus" }, null, _parent));
        _push(`</span><span class="counter-button__text">Decrement</span></button><button${ssrIncludeBooleanAttr(isIncrementDisabled.value) ? " disabled" : ""} class="counter-button counter-button--increment"><span class="counter-button__icon">`);
        _push(ssrRenderComponent(_component_Icon, { name: "plus" }, null, _parent));
        _push(`</span><span class="counter-button__text">Increment</span></button></div>`);
        if (txHash.value) {
          _push(`<div class="transaction-status"><div class="transaction-status__content"><div class="transaction-status__icon"><span class="pulse-dot"></span></div><div class="transaction-status__info"><h4>Transaction Pending</h4><p>Waiting for confirmation...</p></div></div><a${ssrRenderAttr("href", explorerLink.value)} target="_blank" rel="noopener noreferrer" class="transaction-status__link"> View on Explorer `);
          _push(ssrRenderComponent(_component_Icon, { name: "explore" }, null, _parent));
          _push(`</a></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="events-card"><div class="events-card__header"><h2>Recent Events</h2><button class="btn-ghost btn-sm"${ssrIncludeBooleanAttr(!isOnSepolia.value) ? " disabled" : ""}> Clear All </button></div>`);
        if (!isOnSepolia.value) {
          _push(`<div class="network-warning"><div class="network-warning__icon">`);
          _push(ssrRenderComponent(_component_Icon, { name: "info" }, null, _parent));
          _push(`</div><div class="network-warning__content"><h4>Wrong Network</h4><p> This Contract is deployed on Sepolia testnet. Please switch to Sepolia to interact with it. </p></div></div>`);
        } else if (events.value.length === 0) {
          _push(`<div class="events-empty">`);
          _push(ssrRenderComponent(_component_Icon, { name: "clock" }, null, _parent));
          _push(`<h4>No Events Yet</h4><p>Increment or decrement the counter to see blockchain events</p></div>`);
        } else {
          _push(`<div class="events-list"><!--[-->`);
          ssrRenderList(events.value.slice(0, 10), (event, index) => {
            var _a2;
            _push(`<div class="event-item"><div class="${ssrRenderClass([`event-item__icon--${event.eventName === "Increament" ? "increment" : "decrement"}`, "event-item__icon"])}">`);
            if (event.eventName === "Increament") {
              _push(ssrRenderComponent(_component_Icon, { name: "increase" }, null, _parent));
            } else {
              _push(ssrRenderComponent(_component_Icon, { name: "decrease" }, null, _parent));
            }
            _push(`</div><div class="event-item__content"><div class="event-item__header"><h4>${ssrInterpolate(event.eventName === "Increament" ? "Incremented" : "Decremented")}</h4><span class="event-item__time">Just now</span></div><p class="event-item__message">${ssrInterpolate(getEventMessage(event))}</p><div class="event-item__meta"><span>Block: ${ssrInterpolate((_a2 = event.blockNumber) == null ? void 0 : _a2.toString())}</span></div></div></div>`);
          });
          _push(`<!--]--></div>`);
        }
        _push(`</div><div class="contract-card"><div class="contract-card__header"><h2>Contract Details</h2><button class="icon-button">`);
        _push(ssrRenderComponent(_component_Icon, { name: "copy" }, null, _parent));
        _push(`</button></div><div class="contract-info"><div class="contract-info__item"><span class="contract-info__label">Address</span><code class="contract-info__value">${ssrInterpolate(unref(COUNTER_ADDRESS))}</code></div><div class="contract-info__item"><span class="contract-info__label">Network</span><span class="contract-info__value">${ssrInterpolate(chainName.value)}</span></div></div><div class="abi-section"><div class="abi-section__header"><h3>Contract ABI</h3><button class="btn-ghost btn-sm">${ssrInterpolate(showABI.value ? "Hide" : "Show")}</button></div>`);
        if (showABI.value) {
          _push(`<div class="abi-code-wrapper"><pre class="abi-code">${ssrInterpolate(formattedABI.value)}</pre></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/contract.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=contract-CgAtjBJG.mjs.map
