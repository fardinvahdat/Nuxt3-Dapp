<template>
  <div class="wallet-button-wrapper">
    <!-- Connect Button -->
    <button
      v-if="!isConnected"
      @click="openModal"
      :disabled="isConnecting"
      class="wallet-button wallet-button--connect"
    >
      <svg v-if="!isConnecting" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.5 7.5H15.8333C14.9167 7.5 14.1667 6.75 14.1667 5.83333V4.16667C14.1667 3.25 14.9167 2.5 15.8333 2.5H17.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M17.5 12.5H15.8333C14.9167 12.5 14.1667 11.75 14.1667 10.8333V9.16667C14.1667 8.25 14.9167 7.5 15.8333 7.5H17.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M2.5 7.5V5.83333C2.5 4.45833 3.625 3.33333 5 3.33333H8.33333" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M2.5 12.5V14.1667C2.5 15.5417 3.625 16.6667 5 16.6667H15C16.375 16.6667 17.5 15.5417 17.5 14.1667V12.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span v-if="isConnecting" class="spinner"></span>
      <span>{{ isConnecting ? 'Connecting...' : 'Connect Wallet' }}</span>
    </button>

    <!-- Connected Dropdown -->
    <div v-else class="wallet-connected">
      <button @click="toggleDropdown" class="wallet-button wallet-button--connected">
        <div class="wallet-avatar">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 8C10.21 8 12 6.21 12 4C12 1.79 10.21 0 8 0C5.79 0 4 1.79 4 4C4 6.21 5.79 8 8 8ZM8 10C5.33 10 0 11.34 0 14V16H16V14C16 11.34 10.67 10 8 10Z" fill="currentColor"/>
          </svg>
        </div>
        <div class="wallet-info">
          <span class="wallet-address">{{ shortAddress }}</span>
          <span class="wallet-network">{{ chainName }}</span>
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
          <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
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
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor"/>
                  </svg>
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
                  {{ formatBalance(balance.formatted.value) }} {{ nativeCurrency }}
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
            <button @click="copyAddress" class="dropdown-item dropdown-item--action">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.3333 10.7501V14.2501C13.3333 16.9168 12.25 18.0001 9.58333 18.0001H5.75C3.08333 18.0001 2 16.9168 2 14.2501V10.4168C2 7.75011 3.08333 6.66678 5.75 6.66678H9.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M13.3333 10.7501H10.8333C9.58333 10.7501 9.25 10.4168 9.25 9.16678V6.66678L13.3333 10.7501Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10.4167 2H12.9167" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6.66675 4.33333C6.66675 3.04167 7.70841 2 9.00008 2H11.0834" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M18 6.66667V11.525C18 12.7333 17.0167 13.7167 15.8083 13.7167" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M18 6.66667H15.5C14.2583 6.66667 14 6.39167 14 5.16667V2.66667L18 6.66667Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>{{ copied ? 'Copied!' : 'Copy Address' }}</span>
            </button>

            <button @click="viewOnExplorer" class="dropdown-item dropdown-item--action">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.2583 8.74167L17.425 2.575" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M18.3333 5.66667V1.66667H14.3333" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9.16667 1.66667H7.5C3.33333 1.66667 1.66667 3.33333 1.66667 7.5V12.5C1.66667 16.6667 3.33333 18.3333 7.5 18.3333H12.5C16.6667 18.3333 18.3333 16.6667 18.3333 12.5V10.8333" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>View on Explorer</span>
            </button>
          </div>

          <!-- Disconnect -->
          <div class="dropdown-section">
            <button @click="handleDisconnect" class="dropdown-item dropdown-item--action dropdown-item--danger">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.41675 6.29995C7.67508 3.29995 9.21675 2.07495 12.5917 2.07495H12.7001C16.4251 2.07495 17.9167 3.56662 17.9167 7.29162V12.725C17.9167 16.45 16.4251 17.9416 12.7001 17.9416H12.5917C9.24175 17.9416 7.70008 16.7333 7.42508 13.7833" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12.5 10H3.01667" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M4.87508 7.20825L2.08341 9.99992L4.87508 12.7916" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
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
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRuntimeConfig } from '#app'
import { useWallet } from '~/composables/web3/useWallet'
import { useBalance } from '~/composables/web3/useBalance'
import { useUIStore } from '~/store/ui'
import { getChainById } from '~/lib/constants/chains'
import WalletConnectModal from './WalletConnectModal.vue'

const { disconnect, isConnected, isConnecting, address, chainId, shortAddress } = useWallet()
const balance = useBalance()
const uiStore = useUIStore()

const isDropdownOpen = ref(false)
const isModalOpen = ref(false)
const copied = ref(false)

const chainName = computed(() => {
  if (!chainId.value) return 'Unknown'
  const chain = getChainById(chainId.value)
  return chain?.name || 'Unknown'
})

const nativeCurrency = computed(() => {
  if (!chainId.value) return 'ETH'
  const chain = getChainById(chainId.value)
  return chain?.nativeCurrency.symbol || 'ETH'
})

function openModal() {
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
}

async function handleDisconnect() {
  await disconnect()
  isDropdownOpen.value = false
}

function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value
}

async function copyAddress() {
  if (address.value) {
    await navigator.clipboard.writeText(address.value)
    copied.value = true
    uiStore.showSuccess('Address copied to clipboard')
    
    setTimeout(() => {
      copied.value = false
    }, 2000)
  }
}

function viewOnExplorer() {
  if (address.value) {
    const config = useRuntimeConfig()
    const url = `${config.public.blockExplorerUrl}/address/${address.value}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }
}

function formatBalance(balance: string): string {
  const num = parseFloat(balance)
  if (isNaN(num)) return '0.00'
  if (num === 0) return '0.00'
  if (num < 0.0001) return '< 0.0001'
  return num.toFixed(4)
}

// Close dropdown when clicking outside
function handleClickOutside(event: MouseEvent) {
  const target = event.target as HTMLElement
  if (!target.closest('.wallet-connected')) {
    isDropdownOpen.value = false
  }
}

onMounted(() => {
  if (typeof document !== 'undefined') {
    document.addEventListener('click', handleClickOutside)
  }
})

onUnmounted(() => {
  if (typeof document !== 'undefined') {
    document.removeEventListener('click', handleClickOutside)
  }
})
</script>