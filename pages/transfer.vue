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

    <!-- Not Connected State -->
    <div v-if="!isConnected" class="connect-prompt">
      <div class="connect-prompt__card">
        <div class="connect-prompt__icon">
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="32"
              cy="32"
              r="32"
              fill="url(#transferGradient)"
              fill-opacity="0.1"
            />
            <path
              d="M24 34.6667L32 26.6667"
              stroke="url(#transferGradient)"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M29.6667 34.6667H24V29"
              stroke="url(#transferGradient)"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M24 48H40C50.6667 48 54.6667 44 54.6667 33.3333V22.6667C54.6667 12 50.6667 8 40 8H24C13.3333 8 9.33333 12 9.33333 22.6667V33.3333C9.33333 44 13.3333 48 24 48Z"
              stroke="url(#transferGradient)"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <defs>
              <linearGradient
                id="transferGradient"
                x1="9.33333"
                y1="8"
                x2="54.6667"
                y2="48"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#8B5CF6" />
                <stop offset="1" stop-color="#7C3AED" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <h2>Wallet Connection Required</h2>
        <p>Connect your wallet to transfer tokens</p>
        <WalletButton />
      </div>
    </div>

    <!-- Connected State -->
    <div v-else class="content-grid">
      <!-- ETH Transfer Card -->
      <div class="transfer-card">
        <div class="transfer-card__header">
          <div class="transfer-card__title">
            <div class="transfer-card__icon transfer-card__icon--eth">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 13L12 16L20 8"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M16 8L12 12L8 16"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
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
      <div class="transfer-card">
        <div class="transfer-card__header">
          <div class="transfer-card__title">
            <div class="transfer-card__icon transfer-card__icon--token">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 4H3C1.89543 4 1 4.89543 1 6V18C1 19.1046 1.89543 20 3 20H21C22.1046 20 23 19.1046 23 18V6C23 4.89543 22.1046 4 21 4Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M1 10H23"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
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
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.5 11.6667L12.5 6.66675"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10.3417 11.6667H7.5V8.82508"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
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

      <!-- Transfer Information Card -->
      <div class="info-card">
        <div class="info-card__header">
          <div class="info-card__icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12 16V12"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12 8H12.01"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <h3>Important Information</h3>
        </div>
        <ul class="info-list">
          <li>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.6667 5L7.50004 14.1667L3.33337 10"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span
              >Ensure sufficient balance to cover transaction amount plus gas
              fees</span
            >
          </li>
          <li>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.6667 5L7.50004 14.1667L3.33337 10"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span>Double-check the recipient address before confirming</span>
          </li>
          <li>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.6667 5L7.50004 14.1667L3.33337 10"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span
              >Transactions may take 15-60 seconds to confirm depending on
              network</span
            >
          </li>
          <li>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.6667 5L7.50004 14.1667L3.33337 10"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span
              >Start with a small test transaction when sending to a new
              address</span
            >
          </li>
        </ul>
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