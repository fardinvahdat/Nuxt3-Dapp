import { _ as _sfc_main$1 } from './WalletNotConnected-BkWT2AOS.mjs';
import { u as useWallet, a as useBalance, b as useUIStore, g as getChainById, _ as _sfc_main$2, c as useWalletStore, d as getPublicClient, p as parseWeb3Error } from './WalletButton-B8d8q0EA.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-6obakcGN.mjs';
import { defineComponent, ref, computed, mergeProps, unref, withCtx, createVNode, createBlock, openBlock, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { u as useHead } from './v3-Dx88fRy8.mjs';
import { formatGwei } from 'viem';
import './server.mjs';
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
import 'viem/chains';

function useGasPrice() {
  const walletStore = useWalletStore();
  const gasPrice = ref(null);
  const isLoading = ref(false);
  const error = ref(null);
  const formatted = computed(() => {
    if (!gasPrice.value) return "0";
    return Number(formatGwei(gasPrice.value)).toFixed(2);
  });
  async function fetchGasPrice() {
    if (!walletStore.chainId) {
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
      const price = await client.getGasPrice();
      gasPrice.value = price;
    } catch (err) {
      const parsedError = parseWeb3Error(err);
      error.value = parsedError;
      console.error("Failed to fetch gas price:", parsedError);
    } finally {
      isLoading.value = false;
    }
  }
  async function refetch() {
    await fetchGasPrice();
  }
  return {
    gasPrice: computed(() => gasPrice.value),
    formatted,
    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value),
    refetch
  };
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { isConnected, shortAddress, chainId } = useWallet();
    const balance = useBalance();
    const gasPrice = useGasPrice();
    useUIStore();
    const addressCopied = ref(false);
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
    function formatBalance(balance2) {
      const num = parseFloat(balance2);
      if (isNaN(num)) return "0.00";
      if (num === 0) return "0.00";
      if (num < 1e-4) return "< 0.0001";
      return num.toFixed(4);
    }
    useHead({
      title: "Dashboard - Nuxt DApp",
      meta: [
        {
          name: "description",
          content: "View your wallet balances and manage tokens"
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Web3WalletNotConnected = _sfc_main$1;
      const _component_Icon = _sfc_main$2;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "dashboard" }, _attrs))}><div class="page-header"><div class="page-header__content"><div><h1 class="page-title">Dashboard</h1>`);
      if (!unref(isConnected)) {
        _push(`<p class="page-description"> Connect your wallet to access your dashboard </p>`);
      } else {
        _push(`<p class="page-description"> Welcome back! Here&#39;s your wallet overview </p>`);
      }
      _push(`</div></div></div>`);
      if (!unref(isConnected)) {
        _push(ssrRenderComponent(_component_Web3WalletNotConnected, null, null, _parent));
      } else {
        _push(`<div class="dashboard-content"><div class="stats-grid"><div class="stat-card stat-card--primary info-card col-span-1"><div class="stat-card__header"><h3>Total Balance</h3><div class="stat-card__icon">`);
        _push(ssrRenderComponent(_component_Icon, { name: "wallet" }, null, _parent));
        _push(`</div></div>`);
        if (!unref(balance).isLoading.value) {
          _push(`<div class="stat-card__value">${ssrInterpolate(formatBalance(unref(balance).formatted.value))} ${ssrInterpolate(nativeCurrency.value)}</div>`);
        } else {
          _push(`<div class="stat-card__value"><span class="spinner"></span></div>`);
        }
        _push(`<div class="stat-card__label">Native Currency</div></div><div class="stat-card"><div class="stat-card__header"><h3>Address</h3><button class="copy-btn">`);
        if (!addressCopied.value) {
          _push(ssrRenderComponent(_component_Icon, { name: "copy" }, null, _parent));
        } else {
          _push(ssrRenderComponent(_component_Icon, { name: "check" }, null, _parent));
        }
        _push(`</button></div><div class="stat-card__value stat-card__value--mono">${ssrInterpolate(unref(shortAddress))}</div><div class="stat-card__label">Your Wallet</div></div><div class="stat-card"><div class="stat-card__header"><h3>Network</h3><div class="network-indicator"></div></div><div class="stat-card__value">${ssrInterpolate(chainName.value)}</div><div class="stat-card__label">Connected Network</div></div></div><div class="section-card"><div class="section-card__header"><div><h2>Network Gas Price</h2><p class="section-card__description"> Current gas fees for transactions </p></div><button class="btn-secondary"${ssrIncludeBooleanAttr(unref(gasPrice).isLoading.value) ? " disabled" : ""}><svg class="${ssrRenderClass({ spin: unref(gasPrice).isLoading.value })}" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.8333 10C15.8333 13.2217 13.2217 15.8333 10 15.8333C6.77834 15.8333 4.16667 13.2217 4.16667 10C4.16667 6.77834 6.77834 4.16667 10 4.16667" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M13.3333 4.16667H15.8333V6.66667" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg><span>Refresh</span></button></div>`);
        if (unref(gasPrice).isLoading.value) {
          _push(`<div class="loading-state"><div class="spinner"></div><p>Loading gas price...</p></div>`);
        } else {
          _push(`<div class="gas-price-display"><div class="gas-price-card gas-price-card--primary"><div class="gas-price-card__icon">`);
          _push(ssrRenderComponent(_component_Icon, { name: "price" }, null, _parent));
          _push(`</div><div class="gas-price-card__content"><h3>Current Gas Price</h3><div class="gas-price-value">${ssrInterpolate(unref(gasPrice).formatted.value)} <span class="gas-price-unit">Gwei</span></div><p class="gas-price-description">Network: ${ssrInterpolate(chainName.value)}</p></div></div><div class="gas-price-info"><div class="gas-info-item"><div class="gas-info-item__icon">`);
          _push(ssrRenderComponent(_component_Icon, { name: "time" }, null, _parent));
          _push(`</div><div><h5>Real-time Pricing</h5><p>Gas prices fluctuate based on network congestion</p></div></div><div class="gas-info-item"><div class="gas-info-item__icon">`);
          _push(ssrRenderComponent(_component_Icon, { name: "cost" }, null, _parent));
          _push(`</div><div><h5>Transaction Cost</h5><p>Total fee = Gas Price \xD7 Gas Used</p></div></div><div class="gas-info-item"><div class="gas-info-item__icon">`);
          _push(ssrRenderComponent(_component_Icon, { name: "shield" }, null, _parent));
          _push(`</div><div><h5>Optimal Timing</h5><p>Lower gas prices typically occur during off-peak hours</p></div></div></div></div>`);
        }
        _push(`</div><div class="section-card"><div class="section-card__header"><div><h2>Quick Actions</h2><p class="section-card__description"> Manage your assets and interact with contracts </p></div></div><div class="actions-grid">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/transfer",
          class: "action-card"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="action-card__icon"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, { name: "explore" }, null, _parent2, _scopeId));
              _push2(`</div><div class="action-card__content"${_scopeId}><h3${_scopeId}>Send ETH</h3><p${_scopeId}>Transfer native currency to any address</p></div><div class="action-card__arrow"${_scopeId}><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"${_scopeId}><path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"${_scopeId}></path></svg></div>`);
            } else {
              return [
                createVNode("div", { class: "action-card__icon" }, [
                  createVNode(_component_Icon, { name: "explore" })
                ]),
                createVNode("div", { class: "action-card__content" }, [
                  createVNode("h3", null, "Send ETH"),
                  createVNode("p", null, "Transfer native currency to any address")
                ]),
                createVNode("div", { class: "action-card__arrow" }, [
                  (openBlock(), createBlock("svg", {
                    width: "20",
                    height: "20",
                    viewBox: "0 0 20 20",
                    fill: "none",
                    xmlns: "http://www.w3.org/2000/svg"
                  }, [
                    createVNode("path", {
                      d: "M7.5 15L12.5 10L7.5 5",
                      stroke: "currentColor",
                      "stroke-width": "2",
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round"
                    })
                  ]))
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/counter",
          class: "action-card"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="action-card__icon"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, { name: "contract" }, null, _parent2, _scopeId));
              _push2(`</div><div class="action-card__content"${_scopeId}><h3${_scopeId}>Smart Contract</h3><p${_scopeId}>Interact with the counter contract</p></div><div class="action-card__arrow"${_scopeId}><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"${_scopeId}><path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"${_scopeId}></path></svg></div>`);
            } else {
              return [
                createVNode("div", { class: "action-card__icon" }, [
                  createVNode(_component_Icon, { name: "contract" })
                ]),
                createVNode("div", { class: "action-card__content" }, [
                  createVNode("h3", null, "Smart Contract"),
                  createVNode("p", null, "Interact with the counter contract")
                ]),
                createVNode("div", { class: "action-card__arrow" }, [
                  (openBlock(), createBlock("svg", {
                    width: "20",
                    height: "20",
                    viewBox: "0 0 20 20",
                    fill: "none",
                    xmlns: "http://www.w3.org/2000/svg"
                  }, [
                    createVNode("path", {
                      d: "M7.5 15L12.5 10L7.5 5",
                      stroke: "currentColor",
                      "stroke-width": "2",
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round"
                    })
                  ]))
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DntZbLJR.mjs.map
