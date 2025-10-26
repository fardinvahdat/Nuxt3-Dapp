import { _ as _sfc_main$2 } from './WalletNotConnected-BkWT2AOS.mjs';
import { u as useWallet, i as isValidAddress, _ as _sfc_main$2$1, n as normalizeAddress, c as useWalletStore, b as useUIStore, h as formatTokenAmount, g as getChainById, d as getPublicClient, p as parseWeb3Error, e as getUserFriendlyErrorMessage, f as createWalletClientForChain, j as parseTokenAmount, k as formatGwei, l as formatWeiToEther } from './WalletButton-B8d8q0EA.mjs';
import { defineComponent, ref, computed, mergeProps, unref, reactive, watch, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { u as useHead } from './v3-Dx88fRy8.mjs';
import { u as useRuntimeConfig } from './server.mjs';
import { parseEther } from 'viem';
import 'viem/chains';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'node:zlib';
import 'node:stream';
import 'node:util';
import 'node:url';
import 'node:net';
import 'vue-router';

async function safeMulticall(client, contracts) {
  const normalizedContracts = contracts.map((c) => ({
    ...c,
    abi: c.abi
  }));
  return client.multicall({
    contracts: normalizedContracts
  });
}
const ERC20ABI = [
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [
      {
        name: "",
        type: "string"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "_spender",
        type: "address"
      },
      {
        name: "_value",
        type: "uint256"
      }
    ],
    name: "approve",
    outputs: [
      {
        name: "",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "_from",
        type: "address"
      },
      {
        name: "_to",
        type: "address"
      },
      {
        name: "_value",
        type: "uint256"
      }
    ],
    name: "transferFrom",
    outputs: [
      {
        name: "",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [
      {
        name: "",
        type: "uint8"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address"
      }
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "balance",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [
      {
        name: "",
        type: "string"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "_to",
        type: "address"
      },
      {
        name: "_value",
        type: "uint256"
      }
    ],
    name: "transfer",
    outputs: [
      {
        name: "",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address"
      },
      {
        name: "_spender",
        type: "address"
      }
    ],
    name: "allowance",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "from",
        type: "address"
      },
      {
        indexed: true,
        name: "to",
        type: "address"
      },
      {
        indexed: false,
        name: "value",
        type: "uint256"
      }
    ],
    name: "Transfer",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "owner",
        type: "address"
      },
      {
        indexed: true,
        name: "spender",
        type: "address"
      },
      {
        indexed: false,
        name: "value",
        type: "uint256"
      }
    ],
    name: "Approval",
    type: "event"
  }
];
function useTokenBalance(tokenAddress, holderAddress) {
  const walletStore = useWalletStore();
  const balance = ref(null);
  const symbol = ref("");
  const name = ref("");
  const decimals = ref(18);
  const isLoading = ref(false);
  const error = ref(null);
  const addressToQuery = computed(() => walletStore.address);
  const formatted = computed(() => {
    if (!balance.value) return "0.0000";
    return formatTokenAmount(balance.value, decimals.value, 4);
  });
  const tokenData = computed(() => {
    if (!addressToQuery.value || !balance.value) return null;
    return {
      address: tokenAddress,
      symbol: symbol.value,
      name: name.value,
      decimals: decimals.value,
      balance: balance.value,
      formatted: formatted.value
    };
  });
  async function fetchTokenData() {
    var _a, _b, _c, _d;
    const queryAddress = addressToQuery.value;
    if (!queryAddress || !walletStore.chainId) {
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
      const contracts = [
        {
          address: tokenAddress,
          abi: ERC20ABI,
          functionName: "symbol"
        },
        {
          address: tokenAddress,
          abi: ERC20ABI,
          functionName: "name"
        },
        {
          address: tokenAddress,
          abi: ERC20ABI,
          functionName: "decimals"
        },
        {
          address: tokenAddress,
          abi: ERC20ABI,
          functionName: "balanceOf",
          args: [queryAddress]
          // Pass unwrapped value
        }
      ];
      const results = await safeMulticall(client, contracts);
      symbol.value = ((_a = results[0]) == null ? void 0 : _a.status) === "success" ? results[0].result : "";
      name.value = ((_b = results[1]) == null ? void 0 : _b.status) === "success" ? results[1].result : "";
      decimals.value = ((_c = results[2]) == null ? void 0 : _c.status) === "success" ? results[2].result : 18;
      balance.value = ((_d = results[3]) == null ? void 0 : _d.status) === "success" ? results[3].result : BigInt(0);
    } catch (err) {
      const parsedError = parseWeb3Error(err);
      error.value = parsedError;
      console.error("Failed to fetch token data:", parsedError);
    } finally {
      isLoading.value = false;
    }
  }
  async function refetch() {
    await fetchTokenData();
  }
  watch(
    () => [addressToQuery.value, walletStore.chainId],
    () => {
      if (addressToQuery.value && walletStore.chainId) {
        fetchTokenData();
      }
    },
    { immediate: true }
  );
  return {
    balance: computed(() => balance.value),
    symbol: computed(() => symbol.value),
    name: computed(() => name.value),
    decimals: computed(() => decimals.value),
    formatted,
    tokenData,
    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value),
    refetch
  };
}
function useTransfer() {
  const walletStore = useWalletStore();
  const uiStore = useUIStore();
  const hash = ref(null);
  const isLoading = ref(false);
  const isSuccess = ref(false);
  const error = ref(null);
  async function transfer(params) {
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
      const value = parseEther(params.amount);
      const txHash = await walletClient.sendTransaction({
        account: walletStore.address,
        to: params.to,
        value,
        data: params.data,
        chain
      });
      hash.value = txHash;
      isSuccess.value = true;
      uiStore.showSuccess("Transaction sent", `Hash: ${txHash.slice(0, 10)}...`);
      return txHash;
    } catch (err) {
      const parsedError = parseWeb3Error(err);
      error.value = parsedError;
      uiStore.showError("Transfer failed", getUserFriendlyErrorMessage(parsedError));
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
    transfer,
    waitForConfirmation,
    hash: computed(() => hash.value),
    isLoading: computed(() => isLoading.value),
    isSuccess: computed(() => isSuccess.value),
    error: computed(() => error.value)
  };
}
function useTokenTransfer(tokenAddress) {
  const walletStore = useWalletStore();
  const uiStore = useUIStore();
  const hash = ref(null);
  const isLoading = ref(false);
  const isSuccess = ref(false);
  const error = ref(null);
  async function transfer(params) {
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
      const value = parseTokenAmount(params.amount, params.decimals);
      const txHash = await walletClient.writeContract({
        account: walletStore.address,
        address: tokenAddress,
        abi: ERC20ABI,
        functionName: "transfer",
        args: [params.to, value],
        chain
      });
      hash.value = txHash;
      isSuccess.value = true;
      uiStore.showSuccess("Token transfer sent", `Hash: ${txHash.slice(0, 10)}...`);
      return txHash;
    } catch (err) {
      const parsedError = parseWeb3Error(err);
      error.value = parsedError;
      uiStore.showError("Token transfer failed", getUserFriendlyErrorMessage(parsedError));
      throw parsedError;
    } finally {
      isLoading.value = false;
    }
  }
  async function approve(params) {
    walletStore.ensureConnected();
    isLoading.value = true;
    error.value = null;
    try {
      const chain = getChainById(walletStore.chainId);
      if (!chain) {
        throw new Error("Unsupported chain");
      }
      const walletClient = createWalletClientForChain(chain);
      const value = parseTokenAmount(params.amount, params.decimals);
      const txHash = await walletClient.writeContract({
        account: walletStore.address,
        address: tokenAddress,
        abi: ERC20ABI,
        functionName: "approve",
        args: [params.spender, value],
        chain
      });
      hash.value = txHash;
      uiStore.showSuccess("Approval sent", `Hash: ${txHash.slice(0, 10)}...`);
      return txHash;
    } catch (err) {
      const parsedError = parseWeb3Error(err);
      error.value = parsedError;
      uiStore.showError("Approval failed", getUserFriendlyErrorMessage(parsedError));
      throw parsedError;
    } finally {
      isLoading.value = false;
    }
  }
  return {
    transfer,
    approve,
    hash: computed(() => hash.value),
    isLoading: computed(() => isLoading.value),
    isSuccess: computed(() => isSuccess.value),
    error: computed(() => error.value)
  };
}
function useGasEstimation() {
  const walletStore = useWalletStore();
  const estimation = ref(null);
  const isLoading = ref(false);
  const error = ref(null);
  async function estimate(params) {
    walletStore.ensureConnected();
    isLoading.value = true;
    error.value = null;
    try {
      const chain = getChainById(walletStore.chainId);
      if (!chain) {
        throw new Error("Unsupported chain");
      }
      const publicClient = getPublicClient(chain);
      const gasLimit = await publicClient.estimateGas({
        account: walletStore.address,
        to: params.to,
        value: params.value,
        data: params.data
      });
      const feeData = await publicClient.estimateFeesPerGas();
      const maxFeePerGas = feeData.maxFeePerGas || BigInt(0);
      const maxPriorityFeePerGas = feeData.maxPriorityFeePerGas || BigInt(0);
      const totalCost = gasLimit * maxFeePerGas;
      const result = {
        gasLimit,
        maxFeePerGas,
        maxPriorityFeePerGas,
        totalCost,
        totalCostFormatted: formatWeiToEther(totalCost, 6)
      };
      estimation.value = result;
      return result;
    } catch (err) {
      const parsedError = parseWeb3Error(err);
      error.value = parsedError;
      console.error("Gas estimation failed:", parsedError);
      throw parsedError;
    } finally {
      isLoading.value = false;
    }
  }
  async function getCurrentGasPrice() {
    if (!walletStore.chainId) {
      throw new Error("No chain connected");
    }
    try {
      const chain = getChainById(walletStore.chainId);
      if (!chain) {
        throw new Error("Unsupported chain");
      }
      const publicClient = getPublicClient(chain);
      const feeData = await publicClient.estimateFeesPerGas();
      return {
        maxFeePerGas: feeData.maxFeePerGas || BigInt(0),
        maxPriorityFeePerGas: feeData.maxPriorityFeePerGas || BigInt(0),
        formatted: {
          maxFee: formatGwei(feeData.maxFeePerGas || BigInt(0)),
          maxPriorityFee: formatGwei(feeData.maxPriorityFeePerGas || BigInt(0))
        }
      };
    } catch (err) {
      const parsedError = parseWeb3Error(err);
      error.value = parsedError;
      throw parsedError;
    }
  }
  return {
    estimate,
    getCurrentGasPrice,
    estimation: computed(() => estimation.value),
    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value)
  };
}
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "TransferForm",
  __ssrInlineRender: true,
  props: {
    tokenAddress: {},
    tokenSymbol: {},
    tokenDecimals: {}
  },
  setup(__props) {
    const props = __props;
    const formData = reactive({
      recipient: "",
      amount: ""
    });
    const errors = reactive({
      recipient: "",
      amount: ""
    });
    const nativeTransfer = !props.tokenAddress ? useTransfer() : null;
    const tokenTransfer = props.tokenAddress ? useTokenTransfer(props.tokenAddress) : null;
    const transfer = nativeTransfer || tokenTransfer;
    const tokenBalance = props.tokenAddress ? useTokenBalance(props.tokenAddress) : null;
    const { estimate, estimation: gasEstimation } = useGasEstimation();
    const token = computed(() => {
      if (!props.tokenAddress) return null;
      return {
        address: props.tokenAddress,
        symbol: props.tokenSymbol || "TOKEN",
        decimals: props.tokenDecimals || 18
      };
    });
    const isLoading = computed(() => transfer.isLoading.value);
    const txHash = computed(() => transfer.hash.value);
    const isFormValid = computed(() => {
      return isValidAddress(formData.recipient) && formData.amount && parseFloat(formData.amount) > 0 && !errors.recipient && !errors.amount;
    });
    const explorerLink = computed(() => {
      if (!txHash.value) return "#";
      const config = useRuntimeConfig();
      return `${config.public.blockExplorerUrl}/tx/${txHash.value}`;
    });
    function validateRecipient() {
      if (!formData.recipient) {
        errors.recipient = "";
        return;
      }
      if (!isValidAddress(formData.recipient)) {
        errors.recipient = "Invalid Ethereum address";
      } else {
        errors.recipient = "";
      }
    }
    function validateAmount() {
      if (!formData.amount) {
        errors.amount = "";
        return;
      }
      const amount = parseFloat(formData.amount);
      if (isNaN(amount) || amount <= 0) {
        errors.amount = "Amount must be greater than 0";
      } else if ((tokenBalance == null ? void 0 : tokenBalance.balance.value) && token.value) {
        const amountBigInt = parseEther(formData.amount);
        if (amountBigInt > tokenBalance.balance.value) {
          errors.amount = "Insufficient balance";
        } else {
          errors.amount = "";
        }
      } else {
        errors.amount = "";
      }
    }
    watch(
      () => [formData.recipient, formData.amount],
      async () => {
        if (isFormValid.value && !token.value) {
          try {
            await estimate({
              to: normalizeAddress(formData.recipient),
              value: parseEther(formData.amount)
            });
          } catch (err) {
          }
        }
      }
    );
    watch(() => formData.recipient, validateRecipient);
    watch(() => formData.amount, validateAmount);
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "transfer-form" }, _attrs))}><h3 class="transfer-form__title">Send ${ssrInterpolate(((_a = token.value) == null ? void 0 : _a.symbol) || "ETH")}</h3><form class="transfer-form__form"><div class="form-group"><label for="recipient" class="form-label">Recipient Address</label><input id="recipient"${ssrRenderAttr("value", formData.recipient)} type="text" placeholder="0x..." class="${ssrRenderClass([{ "form-input--error": errors.recipient }, "token-input"])}" required>`);
      if (errors.recipient) {
        _push(`<span class="form-error">${ssrInterpolate(errors.recipient)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="form-group"><label for="amount" class="form-label"> Amount `);
      if (unref(tokenBalance)) {
        _push(`<span class="form-label-hint"> Balance: ${ssrInterpolate(unref(tokenBalance).formatted)} ${ssrInterpolate(((_b = token.value) == null ? void 0 : _b.symbol) || "ETH")}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</label><input id="amount"${ssrRenderAttr("value", formData.amount)} type="text" placeholder="0.0" class="${ssrRenderClass([{ "form-input--error": errors.amount }, "token-input"])}" required>`);
      if (errors.amount) {
        _push(`<span class="form-error">${ssrInterpolate(errors.amount)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (unref(gasEstimation)) {
        _push(`<div class="gas-estimation"><div class="gas-estimation__row"><span>Estimated Gas:</span><span>${ssrInterpolate(unref(gasEstimation).totalCostFormatted)} ETH</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="submit"${ssrIncludeBooleanAttr(isLoading.value || !isFormValid.value) ? " disabled" : ""} class="submit-button">`);
      if (isLoading.value) {
        _push(`<span>Sending...</span>`);
      } else {
        _push(`<span>Send ${ssrInterpolate(((_c = token.value) == null ? void 0 : _c.symbol) || "ETH")}</span>`);
      }
      _push(`</button></form>`);
      if (txHash.value) {
        _push(`<div class="transaction-status"><div class="transaction-status__success"> \u2713 Transaction sent successfully! </div><a${ssrRenderAttr("href", explorerLink.value)} target="_blank" rel="noopener noreferrer" class="transaction-status__link"> View on Explorer \u2192 </a></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/web3/TransferForm.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "transfer",
  __ssrInlineRender: true,
  setup(__props) {
    const { isConnected } = useWallet();
    const customTokenAddress = ref("");
    const customToken = ref(null);
    const isValidTokenAddress = computed(() => {
      return isValidAddress(customTokenAddress.value);
    });
    useHead({
      title: "Transfer - Nuxt DApp",
      meta: [{ name: "description", content: "Send ETH and ERC-20 tokens" }]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Web3WalletNotConnected = _sfc_main$2;
      const _component_Icon = _sfc_main$2$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "transfer-page" }, _attrs))}><div class="page-header"><div class="page-header__content"><div><h1 class="page-title">Transfer Tokens</h1><p class="page-description"> Send ETH or ERC-20 tokens to any address on the blockchain </p></div></div></div>`);
      if (!unref(isConnected)) {
        _push(ssrRenderComponent(_component_Web3WalletNotConnected, null, null, _parent));
      } else {
        _push(`<div class="content-grid"><div class="info-card md:col-span-2"><div class="info-card__header"><div class="info-card__icon">`);
        _push(ssrRenderComponent(_component_Icon, { name: "contract" }, null, _parent));
        _push(`</div><h3>Important Information</h3></div><ul class="info-list"><li>`);
        _push(ssrRenderComponent(_component_Icon, { name: "check" }, null, _parent));
        _push(`<span>Ensure sufficient balance to cover transaction amount plus gas fees</span></li><li>`);
        _push(ssrRenderComponent(_component_Icon, { name: "check" }, null, _parent));
        _push(`<span>Double-check the recipient address before confirming</span></li><li>`);
        _push(ssrRenderComponent(_component_Icon, { name: "check" }, null, _parent));
        _push(`<span>Transactions may take 15-60 seconds to confirm depending on network</span></li><li>`);
        _push(ssrRenderComponent(_component_Icon, { name: "check" }, null, _parent));
        _push(`<span>Start with a small test transaction when sending to a new address</span></li></ul></div><div class="transfer-card !col-span-1"><div class="transfer-card__header"><div class="transfer-card__title"><div class="transfer-card__icon transfer-card__icon--eth">`);
        _push(ssrRenderComponent(_component_Icon, { name: "explore" }, null, _parent));
        _push(`</div><div><h2>Send Native Currency</h2><p>Transfer ETH to any wallet address</p></div></div></div>`);
        _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
        _push(`</div><div class="transfer-card !col-span-1"><div class="transfer-card__header"><div class="transfer-card__title"><div class="transfer-card__icon transfer-card__icon--token">`);
        _push(ssrRenderComponent(_component_Icon, { name: "explore" }, null, _parent));
        _push(`</div><div><h2>Send ERC-20 Token</h2><p>Enter a token contract address to transfer</p></div></div></div><div class="token-selector"><input${ssrRenderAttr("value", customTokenAddress.value)} type="text" placeholder="0x... Token Contract Address" class="token-input"><button${ssrIncludeBooleanAttr(!isValidTokenAddress.value) ? " disabled" : ""} class="load-button"><span>Load Token</span></button></div>`);
        if (customToken.value) {
          _push(`<div class="custom-token-info"><div class="token-info-header"><div class="token-info-icon"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 18.3333C14.6024 18.3333 18.3333 14.6024 18.3333 10C18.3333 5.39763 14.6024 1.66667 10 1.66667C5.39763 1.66667 1.66667 5.39763 1.66667 10C1.66667 14.6024 5.39763 18.3333 10 18.3333Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M6.66667 10L8.75 12.0833L13.3333 7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></div><div><h4>Token Loaded</h4><p>${ssrInterpolate(customToken.value.symbol)} - ${ssrInterpolate(customToken.value.name)}</p></div></div><div class="token-balance"><span class="token-balance-label">Your Balance:</span><span class="token-balance-value">${ssrInterpolate(customToken.value.formatted)} ${ssrInterpolate(customToken.value.symbol)}</span></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (customToken.value) {
          _push(ssrRenderComponent(_sfc_main$1, {
            "token-address": customTokenAddress.value,
            "token-symbol": customToken.value.symbol,
            "token-decimals": customToken.value.decimals
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/transfer.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=transfer-DfnqUG8J.mjs.map
