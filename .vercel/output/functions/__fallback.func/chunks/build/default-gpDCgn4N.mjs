import { _ as __nuxt_component_0 } from './nuxt-link-6obakcGN.mjs';
import { _ as _sfc_main$2$1, m as _sfc_main$3, u as useWallet, b as useUIStore, g as getChainById, S as SUPPORTED_CHAINS } from './WalletButton-B8d8q0EA.mjs';
import { defineComponent, ref, computed, mergeProps, withCtx, createVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderList, ssrRenderTeleport } from 'vue/server-renderer';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import './server.mjs';
import 'node:zlib';
import 'node:stream';
import 'node:util';
import 'node:url';
import 'node:net';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';
import 'viem';
import 'viem/chains';

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "NetworkSwitcher",
  __ssrInlineRender: true,
  setup(__props) {
    const { isConnected, chainId } = useWallet();
    useUIStore();
    const isDropdownOpen = ref(false);
    const chainName = computed(() => {
      if (!chainId.value) return "Select Network";
      const chain = getChainById(chainId.value);
      return (chain == null ? void 0 : chain.name) || "Unknown";
    });
    const availableChains = computed(() => SUPPORTED_CHAINS.filter((chain) => chain !== void 0));
    function getChainColor(chainId2) {
      if (!chainId2) return "default";
      switch (chainId2) {
        case 1:
          return "ethereum";
        case 11155111:
          return "sepolia";
        case 5:
          return "goerli";
        case 137:
          return "polygon";
        case 80001:
          return "mumbai";
        case 42161:
          return "arbitrum";
        case 10:
          return "optimism";
        case 8453:
          return "base";
        default:
          return "default";
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "network-switcher" }, _attrs))}><button class="network-button"${ssrIncludeBooleanAttr(!unref(isConnected)) ? " disabled" : ""}><div class="${ssrRenderClass([`network-icon--${getChainColor(unref(chainId))}`, "network-icon"])}"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 8C14.6667 4.3181 11.6819 1.33333 8 1.33333C4.3181 1.33333 1.33333 4.3181 1.33333 8C1.33333 11.6819 4.3181 14.6667 8 14.6667Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M1.33333 8H14.6667" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8 14.6667C9.47276 14.6667 10.6667 11.6819 10.6667 8C10.6667 4.3181 9.47276 1.33333 8 1.33333C6.52724 1.33333 5.33333 4.3181 5.33333 8C5.33333 11.6819 6.52724 14.6667 8 14.6667Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></div><span class="network-name">${ssrInterpolate(chainName.value)}</span><svg class="${ssrRenderClass([{ "dropdown-icon--open": isDropdownOpen.value }, "dropdown-icon"])}" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>`);
      if (isDropdownOpen.value) {
        _push(`<div class="network-dropdown"><div class="dropdown-header"><h4>Select Network</h4></div><div class="networks-list"><!--[-->`);
        ssrRenderList(availableChains.value, (chain) => {
          _push(`<button class="${ssrRenderClass([{ "network-item--active": unref(chainId) === chain.id }, "network-item"])}"><div class="${ssrRenderClass([`network-icon--${getChainColor(chain.id)}`, "network-item__icon"])}"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 18.3333C14.6024 18.3333 18.3333 14.6024 18.3333 10C18.3333 5.39763 14.6024 1.66667 10 1.66667C5.39763 1.66667 1.66667 5.39763 1.66667 10C1.66667 14.6024 5.39763 18.3333 10 18.3333Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M1.66667 10H18.3333" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></div><div class="network-item__info"><span class="network-item__name">${ssrInterpolate(chain.name)}</span><span class="network-item__currency">${ssrInterpolate(chain.nativeCurrency.symbol)}</span></div>`);
          if (unref(chainId) === chain.id) {
            _push(`<div class="network-item__check"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.3333 4L6 11.3333L2.66667 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</button>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/web3/NetworkSwitcher.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Toast",
  __ssrInlineRender: true,
  setup(__props) {
    const uiStore = useUIStore();
    const toasts = computed(() => uiStore.toasts);
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        _push2(`<div class="toast-container"><!--[-->`);
        ssrRenderList(toasts.value, (toast) => {
          _push2(`<div class="${ssrRenderClass(["toast", `toast--${toast.type}`])}"><div class="toast__content"><div class="toast__icon">`);
          if (toast.type === "success") {
            _push2(`<span>\u2713</span>`);
          } else if (toast.type === "error") {
            _push2(`<span>\u2715</span>`);
          } else if (toast.type === "warning") {
            _push2(`<span>\u26A0</span>`);
          } else {
            _push2(`<span>\u2139</span>`);
          }
          _push2(`</div><div class="toast__message"><div class="toast__title">${ssrInterpolate(toast.message)}</div>`);
          if (toast.description) {
            _push2(`<div class="toast__description">${ssrInterpolate(toast.description)}</div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div></div><button class="toast__close"> \u2715 </button></div>`);
        });
        _push2(`<!--]--></div>`);
      }, "body", false, _parent);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/Toast.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const isMobileMenuOpen = ref(false);
    const currentYear = computed(() => (/* @__PURE__ */ new Date()).getFullYear());
    function closeMobileMenu() {
      isMobileMenuOpen.value = false;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Icon = _sfc_main$2$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "layout dark" }, _attrs))}><header class="header"><div class="container"><div class="header__content">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "header__logo"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="logo"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, { name: "logo" }, null, _parent2, _scopeId));
            _push2(`<span class="logo-text"${_scopeId}>Nuxt 3 DApp</span></div>`);
          } else {
            return [
              createVNode("div", { class: "logo" }, [
                createVNode(_component_Icon, { name: "logo" }),
                createVNode("span", { class: "logo-text" }, "Nuxt 3 DApp")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<nav class="header__nav">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "nav-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, { name: "home" }, null, _parent2, _scopeId));
            _push2(`<span${_scopeId}>Dashboard</span>`);
          } else {
            return [
              createVNode(_component_Icon, { name: "home" }),
              createVNode("span", null, "Dashboard")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/transfer",
        class: "nav-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, { name: "transfer" }, null, _parent2, _scopeId));
            _push2(`<span${_scopeId}>Transfer</span>`);
          } else {
            return [
              createVNode(_component_Icon, { name: "transfer" }),
              createVNode("span", null, "Transfer")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/contract",
        class: "nav-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, { name: "contract" }, null, _parent2, _scopeId));
            _push2(`<span${_scopeId}>Contract</span>`);
          } else {
            return [
              createVNode(_component_Icon, { name: "contract" }),
              createVNode("span", null, "Contract")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</nav><button class="mobile-menu-button text-white" aria-label="Toggle menu">`);
      if (!isMobileMenuOpen.value) {
        _push(ssrRenderComponent(_component_Icon, { name: "menu-open" }, null, _parent));
      } else {
        _push(ssrRenderComponent(_component_Icon, { name: "menu-close" }, null, _parent));
      }
      _push(`</button><div class="header__actions">`);
      _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, null, null, _parent));
      _push(`</div></div></div>`);
      if (isMobileMenuOpen.value) {
        _push(`<div class="mobile-nav"><nav class="mobile-nav__content">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          onClick: closeMobileMenu,
          to: "/",
          class: "mobile-nav-link"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, { name: "home" }, null, _parent2, _scopeId));
              _push2(`<span${_scopeId}>Dashboard</span>`);
            } else {
              return [
                createVNode(_component_Icon, { name: "home" }),
                createVNode("span", null, "Dashboard")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          onClick: closeMobileMenu,
          to: "/transfer",
          class: "mobile-nav-link"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, { name: "transfer" }, null, _parent2, _scopeId));
              _push2(`<span${_scopeId}>Transfer</span>`);
            } else {
              return [
                createVNode(_component_Icon, { name: "transfer" }),
                createVNode("span", null, "Transfer")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          onClick: closeMobileMenu,
          to: "/counter",
          class: "mobile-nav-link"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, { name: "contract" }, null, _parent2, _scopeId));
              _push2(`<span${_scopeId}>Contract</span>`);
            } else {
              return [
                createVNode(_component_Icon, { name: "contract" }),
                createVNode("span", null, "Contract")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</nav></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</header><main class="main"><div class="container">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></main><footer class="footer"><div class="container"><div class="footer__content"><div class="footer__section"><div class="footer__logo">`);
      _push(ssrRenderComponent(_component_Icon, { name: "logo" }, null, _parent));
      _push(`<span class="text-white">Nuxt DApp</span></div><p class="footer__description"> Production-ready modular DApp architecture built with Nuxt 3, TypeScript, Viem. </p></div><div class="footer__links"><div class="footer__link-group"><h4>Resources</h4><a href="https://nuxt.com" target="_blank" rel="noopener noreferrer">Nuxt Docs</a><a href="https://viem.sh" target="_blank" rel="noopener noreferrer">Viem Docs</a></div><div class="footer__link-group"><h4>Community</h4><a href="https://github.com/fardinvahdat" target="_blank" rel="noopener noreferrer">GitHub</a><a href="https://www.linkedin.com/in/fardinvahdat/" target="_blank" rel="noopener noreferrer">LinkedIn</a></div></div></div><div class="footer__bottom"><p>\xA9 ${ssrInterpolate(currentYear.value)} Nuxt DApp.</p><div class="footer__badges"><span class="badge badge--primary">Nuxt 3</span><span class="badge badge--primary">TypeScript</span><span class="badge badge--primary">Viem</span></div></div></div></footer>`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default-gpDCgn4N.mjs.map
