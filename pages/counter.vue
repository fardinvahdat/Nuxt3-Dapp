<template>
  <div class="counter-page">
    <!-- Page Header -->
    <div class="page-header">
      <div class="page-header__content">
        <div>
          <h1 class="page-title">Smart Contract Counter</h1>
          <p class="page-description">
            Interact with the deployed counter contract on the blockchain
          </p>
        </div>
        <div v-if="isConnected" class="page-header__badge">
          <div class="status-indicator status-indicator--connected"></div>
          <span>Connected</span>
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
              fill="url(#connectGradient)"
              fill-opacity="0.1"
            />
            <path
              d="M44 20H38.6667C36.6667 20 35 18.3333 35 16.3333V11C35 8.33333 36.6667 6.66667 38.6667 6.66667H44"
              stroke="url(#connectGradient)"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M44 31.6667H38.6667C36.6667 31.6667 35 30 35 28V22.6667C35 20.6667 36.6667 19 38.6667 19H44"
              stroke="url(#connectGradient)"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M19 20V16.3333C19 12.6667 21.3333 10.3333 25 10.3333H31"
              stroke="url(#connectGradient)"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M19 32V35.6667C19 39.3333 21.3333 41.6667 25 41.6667H39C42.6667 41.6667 45 39.3333 45 35.6667V32"
              stroke="url(#connectGradient)"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <defs>
              <linearGradient
                id="connectGradient"
                x1="19"
                y1="6.66667"
                x2="45"
                y2="41.6667"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#8B5CF6" />
                <stop offset="1" stop-color="#7C3AED" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <h2>Wallet Connection Required</h2>
        <p>Connect your wallet to interact with the smart contract counter</p>
        <WalletButton />
      </div>
    </div>

    <!-- Connected State -->
    <div v-else class="content-grid">
      <!-- Counter Card -->
      <div class="counter-card">
        <div class="counter-card__header">
          <h2>Current Value</h2>
          <button
            @click="counterData.refetch()"
            class="icon-button"
            :disabled="isRefreshDisabled"
          >
            <svg
              :class="{ spin: counterData?.isLoading }"
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
          </button>
        </div>

        <div class="counter-display">
          <div
            v-if="counterData?.isLoading"
            class="counter-value counter-value--loading"
          >
            <div class="spinner"></div>
          </div>
          <div v-else class="counter-value">
            <span class="counter-number">{{
              counterData?.data?.toString() || 0
            }}</span>
          </div>
        </div>

        <!-- Network Warning -->
        <div v-if="!isOnSepolia" class="network-warning">
          <div class="network-warning__icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2 17L12 22L22 17"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2 12L12 17L22 12"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div class="network-warning__content">
            <h4>Wrong Network</h4>
            <p>
              This counter is deployed on Sepolia testnet. Please switch to
              Sepolia to interact with it.
            </p>
          </div>
        </div>

        <div class="counter-actions">
          <button
            @click="handleDecrement"
            :disabled="isDecrementDisabled"
            class="counter-button counter-button--decrement"
          >
            <span class="counter-button__icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 12H18"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
            <span class="counter-button__text">Decrement</span>
          </button>

          <button
            @click="handleIncrement"
            :disabled="isIncrementDisabled"
            class="counter-button counter-button--increment"
          >
            <span class="counter-button__icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 6V18M6 12H18"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
            <span class="counter-button__text">Increment</span>
          </button>
        </div>

        <!-- Transaction Status -->
        <Transition name="fade">
          <div v-if="txHash" class="transaction-status">
            <div class="transaction-status__content">
              <div class="transaction-status__icon">
                <span class="pulse-dot"></span>
              </div>
              <div class="transaction-status__info">
                <h4>Transaction Pending</h4>
                <p>Waiting for confirmation...</p>
              </div>
            </div>
            <a
              :href="explorerLink"
              target="_blank"
              rel="noopener noreferrer"
              class="transaction-status__link"
            >
              View on Explorer
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 8.66667V12.6667C12 13.4 11.4 14 10.6667 14H3.33333C2.6 14 2 13.4 2 12.6667V5.33333C2 4.6 2.6 4 3.33333 4H7.33333"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10 2H14V6"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6.66667 9.33333L14 2"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </a>
          </div>
        </Transition>
      </div>

      <!-- Events Card -->
      <div class="events-card">
        <div class="events-card__header">
          <h2>Recent Events</h2>
          <button
            @click="clearEvents"
            class="btn-ghost btn-sm"
            :disabled="!isOnSepolia"
          >
            Clear All
          </button>
        </div>

        <!-- Network Warning for Events -->
        <div v-if="!isOnSepolia" class="events-disabled-notice">
          <div class="events-disabled-notice__icon">
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="24" cy="24" r="24" fill="rgba(251, 191, 36, 0.1)" />
              <path
                d="M24 16V24"
                stroke="#f59e0b"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M24 32H24.02"
                stroke="#f59e0b"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <h4>Events Only Available on Sepolia</h4>
          <p>
            The counter contract is deployed on Sepolia testnet. Switch to
            Sepolia network to see real-time blockchain events.
          </p>
        </div>

        <div v-else-if="events.length === 0" class="events-empty">
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="32" cy="32" r="32" fill="var(--color-bg-secondary)" />
            <path
              d="M32 20V32L38.6667 38.6667"
              stroke="var(--color-text-tertiary)"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <h4>No Events Yet</h4>
          <p>Increment or decrement the counter to see blockchain events</p>
        </div>

        <div v-else class="events-list">
          <TransitionGroup name="list">
            <div
              v-for="(event, index) in events.slice(0, 10)"
              :key="`${event.blockNumber}-${index}`"
              class="event-item"
            >
              <div
                class="event-item__icon"
                :class="`event-item__icon--${event.eventName === 'Increament' ? 'increment' : 'decrement'}`"
              >
                <svg
                  v-if="event.eventName === 'Increament'"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 10L10 5L15 10"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M10 15V5"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <svg
                  v-else
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 10L10 15L5 10"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M10 5V15"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <div class="event-item__content">
                <div class="event-item__header">
                  <h4>
                    {{
                      event.eventName === "Increament"
                        ? "Incremented"
                        : "Decremented"
                    }}
                  </h4>
                  <span class="event-item__time">Just now</span>
                </div>
                <p class="event-item__message">{{ getEventMessage(event) }}</p>
                <div class="event-item__meta">
                  <span>Block: {{ event.blockNumber?.toString() }}</span>
                </div>
              </div>
            </div>
          </TransitionGroup>
        </div>
      </div>

      <!-- Contract Info Card -->
      <div class="contract-card">
        <div class="contract-card__header">
          <h2>Contract Details</h2>
          <button @click="copyABI" class="icon-button">
            <svg
              v-if="!copied"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.3333 10.7501V14.2501C13.3333 16.9168 12.25 18.0001 9.58333 18.0001H5.75C3.08333 18.0001 2 16.9168 2 14.2501V10.4168C2 7.75011 3.08333 6.66678 5.75 6.66678H9.25"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M13.3333 10.7501H10.8333C9.58333 10.7501 9.25 10.4168 9.25 9.16678V6.66678L13.3333 10.7501Z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <svg
              v-else
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
          </button>
        </div>

        <div class="contract-info">
          <div class="contract-info__item">
            <span class="contract-info__label">Address</span>
            <code class="contract-info__value">{{ COUNTER_ADDRESS }}</code>
          </div>

          <div class="contract-info__item">
            <span class="contract-info__label">Network</span>
            <span class="contract-info__value">{{ chainName }}</span>
          </div>
        </div>

        <div class="abi-section">
          <div class="abi-section__header">
            <h3>Contract ABI</h3>
            <button @click="toggleABI" class="btn-ghost btn-sm">
              {{ showABI ? "Hide" : "Show" }}
            </button>
          </div>

          <Transition name="slide">
            <div v-if="showABI" class="abi-code-wrapper">
              <pre class="abi-code">{{ formattedABI }}</pre>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useHead, useRuntimeConfig } from "#app";
import type { Log } from "viem";
import { useWallet } from "~/composables/web3/useWallet";
import {
  useContractRead,
  useContractWrite,
} from "~/composables/web3/useContract";
import { useEventListener } from "~/composables/web3/useEventListener";
import { useUIStore } from "~/store/ui";
import { COUNTER_ABI, COUNTER_ADDRESS } from "~/contracts/abis/Counter";
import { getChainById } from "~/lib/constants/chains";
import WalletButton from "~/components/web3/WalletButton.vue";

const { isConnected, chainId } = useWallet();
const uiStore = useUIStore();

const writeLoading = ref(false);
const txHash = ref<string | null>(null);
const copied = ref(false);
const showABI = ref(false);

// Sepolia chain ID
const SEPOLIA_CHAIN_ID = 11155111;

// Chain name
const chainName = computed(() => {
  if (!chainId.value) return "Unknown";
  const chain = getChainById(chainId.value);
  return chain?.name || "Unknown";
});

// Check if connected to Sepolia
const isOnSepolia = computed(() => chainId.value === SEPOLIA_CHAIN_ID);

// Disabled states for buttons
const isRefreshDisabled = computed(() => counterData.value?.isLoading);
const isDecrementDisabled = computed(
  () => !isOnSepolia.value || writeLoading.value || counterData.value?.isLoading
);
const isIncrementDisabled = computed(
  () => !isOnSepolia.value || writeLoading.value || counterData.value?.isLoading
);

const counterData = ref(null);
// Read counter value (no auto-refresh) - Always read from Sepolia
onMounted(() => {
  counterData.value = useContractRead<bigint>({
    address: COUNTER_ADDRESS,
    abi: COUNTER_ABI,
    functionName: "getValue",
    watch: false,
    chainId: SEPOLIA_CHAIN_ID, // Explicitly read from Sepolia
  });
});

// Write functions
const incrementWrite = useContractWrite({
  address: COUNTER_ADDRESS,
  abi: COUNTER_ABI,
  functionName: "increament",
});

const decrementWrite = useContractWrite({
  address: COUNTER_ADDRESS,
  abi: COUNTER_ABI,
  functionName: "decreament",
});

// Event listeners (only enabled on Sepolia)
const incrementEvents = useEventListener({
  address: COUNTER_ADDRESS,
  abi: COUNTER_ABI,
  eventName: "Increament",
  enabled: isOnSepolia,
  onLogs: (logs) => {
    uiStore.showSuccess("Counter Incremented!", "Transaction confirmed");
    counterData.value?.refetch();
  },
});

const decrementEvents = useEventListener({
  address: COUNTER_ADDRESS,
  abi: COUNTER_ABI,
  eventName: "Decreament",
  enabled: isOnSepolia,
  onLogs: (logs) => {
    uiStore.showSuccess("Counter Decremented!", "Transaction confirmed");
    counterData.value?.refetch();
  },
});

// Combine and sort events
const events = computed(() => {
  return [
    ...incrementEvents.events.value,
    ...decrementEvents.events.value,
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

async function handleIncrement() {
  writeLoading.value = true;
  txHash.value = null;

  try {
    const hash = await incrementWrite.write();
    if (hash) {
      txHash.value = hash;
      uiStore.showInfo("Transaction Submitted", "Waiting for confirmation...");
      await incrementWrite.waitForConfirmation();
      txHash.value = null;
      await counterData.value?.refetch();
    }
  } catch (err) {
    console.error("Increment failed:", err);
  } finally {
    writeLoading.value = false;
  }
}

async function handleDecrement() {
  writeLoading.value = true;
  txHash.value = null;

  try {
    const hash = await decrementWrite.write();
    if (hash) {
      txHash.value = hash;
      uiStore.showInfo("Transaction Submitted", "Waiting for confirmation...");
      await decrementWrite.waitForConfirmation();
      txHash.value = null;
      await counterData.value?.refetch();
    }
  } catch (err) {
    console.error("Decrement failed:", err);
  } finally {
    writeLoading.value = false;
  }
}

function getEventMessage(event: any): string {
  if (event.args && event.args.message) {
    return event.args.message;
  }
  return "Counter value updated on blockchain";
}

function clearEvents() {
  incrementEvents.clearEvents();
  decrementEvents.clearEvents();
  uiStore.showInfo("Events Cleared");
}

async function copyABI() {
  await navigator.clipboard.writeText(formattedABI.value);
  copied.value = true;
  uiStore.showSuccess("ABI copied to clipboard");
  setTimeout(() => {
    copied.value = false;
  }, 2000);
}

function toggleABI() {
  showABI.value = !showABI.value;
}

useHead({
  title: "Counter - Nuxt DApp",
  meta: [
    { name: "description", content: "Interact with smart contract counter" },
  ],
});
</script>

