<template>
  <div class="dashboard">
    <!-- Page Header -->
    <div class="page-header">
      <div class="page-header__content">
        <div>
          <h1 class="page-title">Dashboard</h1>
          <p class="page-description" v-if="!isConnected">
            Connect your wallet to access your dashboard
          </p>
          <p class="page-description" v-else>
            Welcome back! Here's your wallet overview
          </p>
        </div>
      </div>
    </div>

    <Web3WalletNotConnected v-if="!isConnected" />

    <!-- Connected State -->
    <div v-else class="dashboard-content">
      <!-- Stats Grid -->
      <div class="stats-grid">
        <!-- Balance Card -->
        <div class="stat-card stat-card--primary info-card col-span-1">
          <div class="stat-card__header">
            <h3>Total Balance</h3>
            <div class="stat-card__icon">
              <Icon name="wallet" />
            </div>
          </div>
          <div v-if="!balance.isLoading.value" class="stat-card__value">
            {{ formatBalance(balance.formatted.value) }} {{ nativeCurrency }}
          </div>
          <div v-else class="stat-card__value">
            <span class="spinner"></span>
          </div>
          <div class="stat-card__label">Native Currency</div>
        </div>

        <!-- Address Card -->
        <div class="stat-card">
          <div class="stat-card__header">
            <h3>Address</h3>
            <button @click="copyAddress" class="copy-btn">
              <Icon name="copy" v-if="!addressCopied" />
              <Icon name="check" v-else />
            </button>
          </div>
          <div class="stat-card__value stat-card__value--mono">
            {{ shortAddress }}
          </div>
          <div class="stat-card__label">Your Wallet</div>
        </div>

        <!-- Network Card -->
        <div class="stat-card">
          <div class="stat-card__header">
            <h3>Network</h3>
            <div class="network-indicator"></div>
          </div>
          <div class="stat-card__value">{{ chainName }}</div>
          <div class="stat-card__label">Connected Network</div>
        </div>
      </div>

      <!-- Gas Price Section -->
      <div class="section-card">
        <div class="section-card__header">
          <div>
            <h2>Network Gas Price</h2>
            <p class="section-card__description">
              Current gas fees for transactions
            </p>
          </div>
          <button
            @click="gasPrice.refetch()"
            class="btn-secondary"
            :disabled="gasPrice.isLoading.value"
          >
            <svg
              :class="{ spin: gasPrice.isLoading.value }"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.8333 10C15.8333 13.2217 13.2217 15.8333 10 15.8333C6.77834 15.8333 4.16667 13.2217 4.16667 10C4.16667 6.77834 6.77834 4.16667 10 4.16667"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M13.3333 4.16667H15.8333V6.66667"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span>Refresh</span>
          </button>
        </div>

        <div v-if="gasPrice.isLoading.value" class="loading-state">
          <div class="spinner"></div>
          <p>Loading gas price...</p>
        </div>

        <div v-else class="gas-price-display">
          <div class="gas-price-card gas-price-card--primary">
            <div class="gas-price-card__icon">
              <Icon name="price" />
            </div>
            <div class="gas-price-card__content">
              <h3>Current Gas Price</h3>
              <div class="gas-price-value">
                {{ gasPrice.formatted.value }}
                <span class="gas-price-unit">Gwei</span>
              </div>
              <p class="gas-price-description">Network: {{ chainName }}</p>
            </div>
          </div>

          <div class="gas-price-info">
            <div class="gas-info-item">
              <div class="gas-info-item__icon">
                <Icon name="time" />
              </div>
              <div>
                <h5>Real-time Pricing</h5>
                <p>Gas prices fluctuate based on network congestion</p>
              </div>
            </div>

            <div class="gas-info-item">
              <div class="gas-info-item__icon">
                <Icon name="cost" />
              </div>
              <div>
                <h5>Transaction Cost</h5>
                <p>Total fee = Gas Price × Gas Used</p>
              </div>
            </div>

            <div class="gas-info-item">
              <div class="gas-info-item__icon">
                <Icon name="shield" />
              </div>
              <div>
                <h5>Optimal Timing</h5>
                <p>Lower gas prices typically occur during off-peak hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="section-card">
        <div class="section-card__header">
          <div>
            <h2>Quick Actions</h2>
            <p class="section-card__description">
              Manage your assets and interact with contracts
            </p>
          </div>
        </div>

        <div class="actions-grid">
          <NuxtLink to="/transfer" class="action-card">
            <div class="action-card__icon">
              <Icon name="explore"/>
            </div>
            <div class="action-card__content">
              <h3>Send ETH</h3>
              <p>Transfer native currency to any address</p>
            </div>
            <div class="action-card__arrow">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.5 15L12.5 10L7.5 5"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </NuxtLink>

          <NuxtLink to="/counter" class="action-card">
            <div class="action-card__icon">
              <Icon name="contract" />
            </div>
            <div class="action-card__content">
              <h3>Smart Contract</h3>
              <p>Interact with the counter contract</p>
            </div>
            <div class="action-card__arrow">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.5 15L12.5 10L7.5 5"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useHead } from "#app";
import type { Address } from "viem";
import { useWallet } from "~/composables/web3/useWallet";
import { useBalance } from "~/composables/web3/useBalance";
import { useGasPrice } from "~/composables/web3/useGasPrice";
import { useUIStore } from "~/store/ui";
import { getChainById } from "~/lib/constants/chains";
import WalletButton from "~/components/web3/WalletButton.vue";

const { isConnected, shortAddress, chainId, address } = useWallet();
const balance = useBalance();
const gasPrice = useGasPrice();
const uiStore = useUIStore();

const addressCopied = ref(false);

const chainName = computed(() => {
  if (!chainId.value) return "Unknown";
  const chain = getChainById(chainId.value);
  return chain?.name || "Unknown";
});

const nativeCurrency = computed(() => {
  if (!chainId.value) return "ETH";
  const chain = getChainById(chainId.value);
  return chain?.nativeCurrency.symbol || "ETH";
});

function formatBalance(balance: string): string {
  const num = parseFloat(balance);
  if (isNaN(num)) return "0.00";
  if (num === 0) return "0.00";
  if (num < 0.0001) return "< 0.0001";
  return num.toFixed(4);
}

async function copyAddress() {
  if (address.value) {
    await navigator.clipboard.writeText(address.value);
    addressCopied.value = true;
    uiStore.showSuccess("Address copied to clipboard");
    setTimeout(() => {
      addressCopied.value = false;
    }, 2000);
  }
}

useHead({
  title: "Dashboard - Nuxt DApp",
  meta: [
    {
      name: "description",
      content: "View your wallet balances and manage tokens",
    },
  ],
});
</script>
