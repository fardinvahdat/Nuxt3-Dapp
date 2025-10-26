import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { m as _sfc_main$1 } from './WalletButton-B8d8q0EA.mjs';

const _sfc_main = {
  __name: "WalletNotConnected",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "connect-prompt" }, _attrs))}><div class="connect-prompt__card"><div class="connect-prompt__icon"><svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="32" r="32" fill="url(#connectGradient)" fill-opacity="0.1"></circle><path d="M44 20H38.6667C36.6667 20 35 18.3333 35 16.3333V11C35 8.33333 36.6667 6.66667 38.6667 6.66667H44" stroke="url(#connectGradient)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path><path d="M44 31.6667H38.6667C36.6667 31.6667 35 30 35 28V22.6667C35 20.6667 36.6667 19 38.6667 19H44" stroke="url(#connectGradient)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path><path d="M19 20V16.3333C19 12.6667 21.3333 10.3333 25 10.3333H31" stroke="url(#connectGradient)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path><path d="M19 32V35.6667C19 39.3333 21.3333 41.6667 25 41.6667H39C42.6667 41.6667 45 39.3333 45 35.6667V32" stroke="url(#connectGradient)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path><defs><linearGradient id="connectGradient" x1="19" y1="6.66667" x2="45" y2="41.6667" gradientUnits="userSpaceOnUse"><stop stop-color="#8B5CF6"></stop><stop offset="1" stop-color="#7C3AED"></stop></linearGradient></defs></svg></div><h2>Wallet Connection Required</h2><p>Connect your wallet to interact with the smart contract counter</p>`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/web3/WalletNotConnected.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=WalletNotConnected-BkWT2AOS.mjs.map
