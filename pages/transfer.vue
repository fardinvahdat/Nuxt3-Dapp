<template>
  <div class="transfer-page">
    <!-- Page Header -->
    <div class="page-header">
      <div class="page-header__content">
        <div>
          <h1 class="page-title">Transfer Tokens</h1>
          <p class="page-description">
            Send ETH or ERC-20 tokens to any address on the blockchain
          </p>
        </div>
      </div>
    </div>

    <Web3WalletNotConnected v-if="!isConnected" />

    <!-- Connected State -->
    <div v-else class="content-grid">
      <!-- Transfer Information Card -->
      <div class="info-card md:col-span-2">
        <div class="info-card__header">
          <div class="info-card__icon">
            <Icon name="contract" />
          </div>
          <h3>Important Information</h3>
        </div>
        <ul class="info-list">
          <li>
            <Icon name="check" />
            <span
              >Ensure sufficient balance to cover transaction amount plus gas
              fees</span
            >
          </li>
          <li>
            <Icon name="check" />
            <span>Double-check the recipient address before confirming</span>
          </li>
          <li>
            <Icon name="check" />
            <span
              >Transactions may take 15-60 seconds to confirm depending on
              network</span
            >
          </li>
          <li>
            <Icon name="check" />
            <span
              >Start with a small test transaction when sending to a new
              address</span
            >
          </li>
        </ul>
      </div>
      <!-- ETH Transfer Card -->
      <div class="transfer-card !col-span-1">
        <div class="transfer-card__header">
          <div class="transfer-card__title">
            <div class="transfer-card__icon transfer-card__icon--eth">
              <Icon name="explore" />
            </div>
            <div>
              <h2>Send Native Currency</h2>
              <p>Transfer ETH to any wallet address</p>
            </div>
          </div>
        </div>
        <TransferForm />
      </div>

      <!-- ERC-20 Transfer Card -->
      <div class="transfer-card !col-span-1">
        <div class="transfer-card__header">
          <div class="transfer-card__title">
            <div class="transfer-card__icon transfer-card__icon--token">
              <Icon name="explore" />
            </div>
            <div>
              <h2>Send ERC-20 Token</h2>
              <p>Enter a token contract address to transfer</p>
            </div>
          </div>
        </div>

        <div class="token-selector">
          <input
            v-model="customTokenAddress"
            type="text"
            placeholder="0x... Token Contract Address"
            class="token-input"
          />
          <button
            @click="loadCustomToken"
            :disabled="!isValidTokenAddress"
            class="load-button"
          >
            <span>Load Token</span>
          </button>
        </div>

        <div v-if="customToken" class="custom-token-info">
          <div class="token-info-header">
            <div class="token-info-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 18.3333C14.6024 18.3333 18.3333 14.6024 18.3333 10C18.3333 5.39763 14.6024 1.66667 10 1.66667C5.39763 1.66667 1.66667 5.39763 1.66667 10C1.66667 14.6024 5.39763 18.3333 10 18.3333Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6.66667 10L8.75 12.0833L13.3333 7.5"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div>
              <h4>Token Loaded</h4>
              <p>{{ customToken.symbol }} - {{ customToken.name }}</p>
            </div>
          </div>
          <div class="token-balance">
            <span class="token-balance-label">Your Balance:</span>
            <span class="token-balance-value"
              >{{ customToken.formatted }} {{ customToken.symbol }}</span
            >
          </div>
        </div>

        <TransferForm
          v-if="customToken"
          :token-address="customTokenAddress as Address"
          :token-symbol="customToken.symbol"
          :token-decimals="customToken.decimals"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useHead } from "#app";
import type { Address } from "viem";
import { useWallet } from "~/composables/web3/useWallet";
import { useTokenBalance } from "~/composables/web3/useTokenBalance";
import { isValidAddress, normalizeAddress } from "~/lib/utils/format";
import WalletButton from "~/components/web3/WalletButton.vue";
import TransferForm from "~/components/web3/TransferForm.vue";

const { isConnected } = useWallet();

const customTokenAddress = ref("");
const customToken = ref<any>(null);

const isValidTokenAddress = computed(() => {
  return isValidAddress(customTokenAddress.value);
});

function loadCustomToken() {
  if (!isValidTokenAddress.value) return;

  const tokenAddress = normalizeAddress(customTokenAddress.value) as Address;
  const tokenData = useTokenBalance(tokenAddress);

  customToken.value = tokenData.tokenData;
}

useHead({
  title: "Transfer - Nuxt DApp",
  meta: [{ name: "description", content: "Send ETH and ERC-20 tokens" }],
});
</script>
