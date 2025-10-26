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

    <Web3WalletNotConnected v-if="!isConnected" />

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
            <Icon name="info" />
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
              <Icon name="minus" />
            </span>
            <span class="counter-button__text">Decrement</span>
          </button>

          <button
            @click="handleIncrement"
            :disabled="isIncrementDisabled"
            class="counter-button counter-button--increment"
          >
            <span class="counter-button__icon">
              <Icon name="plus" />
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
              <Icon name="explore" />
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

        <!-- Network Warning -->
        <div v-if="!isOnSepolia" class="network-warning">
          <div class="network-warning__icon">
            <Icon name="info" />
          </div>
          <div class="network-warning__content">
            <h4>Wrong Network</h4>
            <p>
              This counter is deployed on Sepolia testnet. Please switch to
              Sepolia to interact with it.
            </p>
          </div>
        </div>

        <div v-else-if="events.length === 0" class="events-empty">
          <Icon name="clock" />
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
                <Icon name="increase" v-if="event.eventName === 'Increament'" />
                <Icon name="decrease" v-else />
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
            <Icon name="copy" />
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

const counterData = ref<any>(null);
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
