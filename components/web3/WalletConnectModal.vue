<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen" class="modal-overlay" @click="closeModal">
        <div class="modal-container" @click.stop>
          <div class="modal-header">
            <h2>Connect Wallet</h2>
            <button @click="closeModal" class="close-button" aria-label="Close">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>

          <div class="modal-content">
            <p class="modal-description">
              Choose your preferred wallet to connect to this dApp
            </p>

            <div class="wallets-grid">
              <button
                v-for="wallet in wallets"
                :key="wallet.id"
                @click="handleWalletClick(wallet)"
                :disabled="isConnecting || !wallet.available"
                class="wallet-option"
                :class="{ 'wallet-option--disabled': !wallet.available }"
              >
                <div class="wallet-option__icon">
                  <img :src="wallet.icon" :alt="wallet.name" />
                </div>
                <div class="wallet-option__info">
                  <h3>{{ wallet.name }}</h3>
                  <p v-if="!wallet.available" class="wallet-option__status">
                    Not installed
                  </p>
                  <p v-else-if="isConnecting && selectedWallet === wallet.id" class="wallet-option__status wallet-option__status--connecting">
                    Connecting...
                  </p>
                  <p v-else class="wallet-option__status">
                    {{ wallet.description }}
                  </p>
                </div>
                <div v-if="wallet.popular" class="wallet-option__badge">
                  Popular
                </div>
              </button>
            </div>

            <div class="modal-footer">
              <p class="modal-footer__text">
                New to Ethereum?
                <a href="https://ethereum.org/wallets" target="_blank" rel="noopener noreferrer">
                  Learn more about wallets
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useWallet } from '~/composables/web3/useWallet'
import { useUIStore } from '~/store/ui'

interface Wallet {
  id: string
  name: string
  description: string
  icon: string
  available: boolean
  popular?: boolean
  installUrl?: string
}

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const { connect, isConnecting } = useWallet()
const uiStore = useUIStore()
const selectedWallet = ref<string | null>(null)

// Check wallet availability
const isMetaMaskAvailable = computed(() => {
  if (typeof window === 'undefined') return false
  return !!(window.ethereum?.isMetaMask)
})

const isCoinbaseAvailable = computed(() => {
  if (typeof window === 'undefined') return false
  return !!(window.ethereum?.isCoinbaseWallet || window.coinbaseWalletExtension)
})

const isBraveAvailable = computed(() => {
  if (typeof window === 'undefined') return false
  return !!(window.ethereum?.isBraveWallet)
})

const wallets = computed<Wallet[]>(() => [
  {
    id: 'metamask',
    name: 'MetaMask',
    description: 'Connect using browser wallet',
    icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEyIiBoZWlnaHQ9IjE4OSIgdmlld0JveD0iMCAwIDIxMiAxODkiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xOTkuNjYgMEw5Ni4xNiA3Ny41Mkw5Ni43NyA5My4zTDE5OS42NiAwWiIgZmlsbD0iI0UxNzczQSIvPgo8cGF0aCBkPSJNMTkuNjYgMEwxMjMuMTYgNzcuNTJMMTIzLjc3IDkzLjNMMTkuNjYgMFoiIGZpbGw9IiNFMTc3M0EiLz4KPC9zdmc+Cg==',
    available: isMetaMaskAvailable.value,
    popular: true,
    installUrl: 'https://metamask.io/download/'
  },
  {
    id: 'coinbase',
    name: 'Coinbase Wallet',
    description: 'Connect using Coinbase',
    icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAyNCIgaGVpZ2h0PSIxMDI0IiB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8Y2lyY2xlIGN4PSI1MTIiIGN5PSI1MTIiIHI9IjUxMiIgZmlsbD0iIzAwNTJGRiIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTE1MiA1MTJDMTUyIDcxMC44MjMgMzEzLjE3NyA4NzIgNTEyIDg3MkM3MTAuODIzIDg3MiA4NzIgNzEwLjgyMyA4NzIgNTEyQzg3MiAzMTMuMTc3IDcxMC44MjMgMTUyIDUxMiAxNTJDMzEzLjE3NyAxNTIgMTUyIDMxMy4xNzcgMTUyIDUxMlpNNDIwIDQyMEg2MDRWNjA0SDQyMFY0MjBaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K',
    available: isCoinbaseAvailable.value,
    installUrl: 'https://www.coinbase.com/wallet'
  },
  {
    id: 'walletconnect',
    name: 'WalletConnect',
    description: 'Scan with mobile wallet',
    icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE4NSIgdmlld0JveD0iMCAwIDMwMCAxODUiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik02MS40Mzc1IDM2Ljg5MjVDMTAxLjQ1IC0zLjEyMDgzIDE2Ny41NSAtMy4xMjA4MyAyMDcuNTYyIDM2Ljg5MjVMMjEyLjQzNyA0MS43NjY3QzIxNC40MzggNDMuNzY2NyAyMTQuNDM4IDQ3LjAzMzMgMjEyLjQzNyA0OS4wMzMzTDE5My44NjIgNjcuNjA4M0MxOTIuODYyIDY4LjYwODMgMTkxLjEzNyA2OC42MDgzIDE5MC4xMzcgNjcuNjA4M0wxODIuNjM3IDYwLjEwODNDMTU3LjEzNyAzNC42MDgzIDExNi44NjIgMzQuNjA4MyA5MS4zNjI1IDYwLjEwODNMODMuMzYyNSA2OC4xMDgzQzgyLjM2MjUgNjkuMTA4MyA4MC42Mzc1IDY5LjEwODMgNzkuNjM3NSA2OC4xMDgzTDYxLjA2MjUgNDkuNTMzM0M1OS4wNjI1IDQ3LjUzMzMgNTkuMDYyNSA0NC4yNjY3IDYxLjA2MjUgNDIuMjY2N0w2MS40Mzc1IDM2Ljg5MjVaIiBmaWxsPSIjM0I5OUZDIi8+Cjwvc3ZnPgo=',
    available: true, // WalletConnect is always available
    installUrl: 'https://walletconnect.com/'
  },
  {
    id: 'brave',
    name: 'Brave Wallet',
    description: 'Connect using Brave browser',
    icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjI1NiIgY3k9IjI1NiIgcj0iMjU2IiBmaWxsPSIjRkI1NDJCIi8+Cjwvc3ZnPgo=',
    available: isBraveAvailable.value,
    installUrl: 'https://brave.com/wallet/'
  }
])

async function handleWalletClick(wallet: Wallet) {
  if (!wallet.available) {
    // Open install URL in new tab
    if (wallet.installUrl) {
      window.open(wallet.installUrl, '_blank', 'noopener,noreferrer')
    }
    return
  }

  selectedWallet.value = wallet.id

  try {
    if (wallet.id === 'walletconnect') {
      uiStore.showInfo('WalletConnect coming soon', 'Please use a browser wallet for now')
      return
    }

    await connect(wallet.id)
    closeModal()
  } catch (error) {
    console.error('Failed to connect wallet:', error)
    selectedWallet.value = null
  }
}

function closeModal() {
  if (!isConnecting.value) {
    emit('close')
    selectedWallet.value = null
  }
}

// Close modal when successfully connected
watch(() => isConnecting.value, (connecting, wasConnecting) => {
  if (wasConnecting && !connecting && selectedWallet.value) {
    // Connection attempt finished
    selectedWallet.value = null
  }
})
</script>
