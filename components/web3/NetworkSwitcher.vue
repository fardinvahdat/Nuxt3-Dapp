<template>
  <div class="network-switcher">
    <button @click="toggleDropdown" class="network-button" :disabled="!isConnected">
      <div class="network-icon" :class="`network-icon--${getChainColor(chainId)}`">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 8C14.6667 4.3181 11.6819 1.33333 8 1.33333C4.3181 1.33333 1.33333 4.3181 1.33333 8C1.33333 11.6819 4.3181 14.6667 8 14.6667Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M1.33333 8H14.6667" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M8 14.6667C9.47276 14.6667 10.6667 11.6819 10.6667 8C10.6667 4.3181 9.47276 1.33333 8 1.33333C6.52724 1.33333 5.33333 4.3181 5.33333 8C5.33333 11.6819 6.52724 14.6667 8 14.6667Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <span class="network-name">{{ chainName }}</span>
      <svg
        class="dropdown-icon"
        :class="{ 'dropdown-icon--open': isDropdownOpen }"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>

    <!-- Dropdown Menu -->
    <Transition name="dropdown">
      <div v-if="isDropdownOpen" class="network-dropdown">
        <div class="dropdown-header">
          <h4>Select Network</h4>
        </div>
        
        <div class="networks-list">
          <button
            v-for="chain in availableChains"
            :key="chain.id"
            @click="switchNetwork(chain.id)"
            class="network-item"
            :class="{ 'network-item--active': chainId === chain.id }"
          >
            <div class="network-item__icon" :class="`network-icon--${getChainColor(chain.id)}`">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 18.3333C14.6024 18.3333 18.3333 14.6024 18.3333 10C18.3333 5.39763 14.6024 1.66667 10 1.66667C5.39763 1.66667 1.66667 5.39763 1.66667 10C1.66667 14.6024 5.39763 18.3333 10 18.3333Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M1.66667 10H18.3333" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="network-item__info">
              <span class="network-item__name">{{ chain.name }}</span>
              <span class="network-item__currency">{{ chain.nativeCurrency.symbol }}</span>
            </div>
            <div v-if="chainId === chain.id" class="network-item__check">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.3333 4L6 11.3333L2.66667 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { Chain } from 'viem'
import { useWallet } from '~/composables/web3/useWallet'
import { useUIStore } from '~/store/ui'
import { SUPPORTED_CHAINS, getChainById } from '~/lib/constants/chains'

const { isConnected, chainId, switchChain } = useWallet()
const uiStore = useUIStore()

const isDropdownOpen = ref(false)

const chainName = computed(() => {
  if (!chainId.value) return 'Select Network'
  const chain = getChainById(chainId.value)
  return chain?.name || 'Unknown'
})

const availableChains = computed(() => SUPPORTED_CHAINS.filter((chain) => chain !== undefined))

function toggleDropdown() {
  if (!isConnected.value) return
  isDropdownOpen.value = !isDropdownOpen.value
}

async function switchNetwork(newChainId: number) {
  if (chainId.value === newChainId) {
    isDropdownOpen.value = false
    return
  }

  try {
    await switchChain(newChainId)
    isDropdownOpen.value = false
    uiStore.showSuccess('Network switched successfully')
  } catch (error) {
    console.error('Failed to switch network:', error)
    uiStore.showError('Failed to switch network', 'Please try again or switch manually in your wallet')
  }
}

function getChainColor(chainId: number | null): string {
  if (!chainId) return 'default'
  
  switch (chainId) {
    case 1: return 'ethereum'
    case 11155111: return 'sepolia'
    case 5: return 'goerli'
    case 137: return 'polygon'
    case 80001: return 'mumbai'
    case 42161: return 'arbitrum'
    case 10: return 'optimism'
    case 8453: return 'base'
    default: return 'default'
  }
}

// Close dropdown when clicking outside
function handleClickOutside(event: MouseEvent) {
  const target = event.target as HTMLElement
  if (!target.closest('.network-switcher')) {
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
