<template>
  <div class="wallet-button-wrapper">
    <!-- Connect Button -->
    <button
      v-if="!isConnected"
      @click="openModal"
      :disabled="isConnecting"
      class="wallet-button wallet-button--connect"
    >
      <Icon name="wallet" v-if="!isConnecting" />
      <span v-if="isConnecting" class="spinner"></span>
      <span>{{ isConnecting ? "Connecting..." : "Connect Wallet" }}</span>
    </button>

    <!-- Connected Dropdown -->
    <div v-else class="wallet-connected">
      <button
        @click="toggleDropdown"
        class="wallet-button wallet-button--connected"
      >
        <div class="wallet-avatar">
          <Icon name="avatar" />
        </div>
        <div class="wallet-info">
          <span class="wallet-address">{{ shortAddress }}</span>
        </div>
        <svg
          class="dropdown-icon"
          :class="{ 'dropdown-icon--open': isDropdownOpen }"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 7.5L10 12.5L15 7.5"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>

      <!-- Dropdown Menu -->
      <Transition name="dropdown">
        <div v-if="isDropdownOpen" class="wallet-dropdown">
          <!-- Account Info -->
          <div class="dropdown-section">
            <div class="dropdown-item dropdown-item--header">
              <div class="account-info">
                <div class="account-avatar">
                  <Icon name="avatar" />
                </div>
                <div>
                  <div class="account-label">Account</div>
                  <div class="account-address">{{ shortAddress }}</div>
                </div>
              </div>
            </div>

            <!-- Balance -->
            <div class="dropdown-item dropdown-item--info">
              <div class="info-row">
                <span class="info-label">Balance</span>
                <span class="info-value" v-if="!balance.isLoading.value">
                  {{ formatBalance(balance.formatted.value) }}
                  {{ nativeCurrency }}
                </span>
                <span class="info-value" v-else>
                  <span class="spinner spinner--small"></span>
                </span>
              </div>
            </div>

            <!-- Network -->
            <div class="dropdown-item dropdown-item--info">
              <div class="info-row">
                <span class="info-label">Network</span>
                <span class="info-value">
                  <span class="network-indicator"></span>
                  {{ chainName }}
                </span>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="dropdown-section">
            <button
              @click="copyAddress"
              class="dropdown-item dropdown-item--action"
            >
              <Icon name="copy" />
              <span>{{ copied ? "Copied!" : "Copy Address" }}</span>
            </button>

            <button
              @click="viewOnExplorer"
              class="dropdown-item dropdown-item--action"
            >
              <Icon name="explore"/>
              <span>View on Explorer</span>
            </button>
          </div>

          <!-- Disconnect -->
          <div class="dropdown-section">
            <button
              @click="handleDisconnect"
              class="dropdown-item dropdown-item--action dropdown-item--danger"
            >
              <Icon name="log-out"/>
              <span>Disconnect</span>
            </button>
          </div>
        </div>
      </Transition>
    </div>

    <!-- Wallet Connect Modal -->
    <WalletConnectModal :is-open="isModalOpen" @close="closeModal" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRuntimeConfig } from "#app";
import { useWallet } from "~/composables/web3/useWallet";
import { useBalance } from "~/composables/web3/useBalance";
import { useUIStore } from "~/store/ui";
import { getChainById } from "~/lib/constants/chains";
import WalletConnectModal from "./WalletConnectModal.vue";

const {
  disconnect,
  isConnected,
  isConnecting,
  address,
  chainId,
  shortAddress,
} = useWallet();
const balance = useBalance();
const uiStore = useUIStore();

const isDropdownOpen = ref(false);
const isModalOpen = ref(false);
const copied = ref(false);

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

function openModal() {
  isModalOpen.value = true;
}

function closeModal() {
  isModalOpen.value = false;
}

async function handleDisconnect() {
  await disconnect();
  isDropdownOpen.value = false;
}

function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value;
}

async function copyAddress() {
  if (address.value) {
    await navigator.clipboard.writeText(address.value);
    copied.value = true;
    uiStore.showSuccess("Address copied to clipboard");

    setTimeout(() => {
      copied.value = false;
    }, 2000);
  }
}

function viewOnExplorer() {
  if (address.value) {
    const config = useRuntimeConfig();
    const url = `${config.public.blockExplorerUrl}/address/${address.value}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }
}

function formatBalance(balance: string): string {
  const num = parseFloat(balance);
  if (isNaN(num)) return "0.00";
  if (num === 0) return "0.00";
  if (num < 0.0001) return "< 0.0001";
  return num.toFixed(4);
}

// Close dropdown when clicking outside
function handleClickOutside(event: MouseEvent) {
  const target = event.target as HTMLElement;
  if (!target.closest(".wallet-connected")) {
    isDropdownOpen.value = false;
  }
}

onMounted(() => {
  if (typeof document !== "undefined") {
    document.addEventListener("click", handleClickOutside);
  }
});

onUnmounted(() => {
  if (typeof document !== "undefined") {
    document.removeEventListener("click", handleClickOutside);
  }
});
</script>
