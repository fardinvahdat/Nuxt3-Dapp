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

    <!-- Not Connected State -->
    <div v-if="!isConnected" class="connect-prompt">
      <div class="connect-prompt__card">
        <div class="connect-prompt__illustration">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="60" cy="60" r="60" fill="url(#dashboardGradient)" fill-opacity="0.1"/>
            <path d="M80 35H70C65 35 60 30 60 25V15C60 10 65 5 70 5H80" stroke="url(#dashboardGradient)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M80 60H70C65 60 60 55 60 50V40C60 35 65 30 70 30H80" stroke="url(#dashboardGradient)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M30 35V25C30 15 35 10 45 10H60" stroke="url(#dashboardGradient)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M30 60V70C30 80 35 85 45 85H75C85 85 90 80 90 70V60" stroke="url(#dashboardGradient)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            <defs>
              <linearGradient id="dashboardGradient" x1="30" y1="5" x2="90" y2="85" gradientUnits="userSpaceOnUse">
                <stop stop-color="#8B5CF6"/>
                <stop offset="1" stop-color="#7C3AED"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <h2>Welcome to Nuxt DApp</h2>
        <p>Connect your wallet to access your dashboard, manage tokens, and interact with smart contracts</p>
        <WalletButton />
        
        <div class="features-grid">
          <div class="feature-item">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Multiple Wallets</span>
          </div>
          <div class="feature-item">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 6V12L16 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Real-time Updates</span>
          </div>
          <div class="feature-item">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Secure & Safe</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Connected State -->
    <div v-else class="dashboard-content">
      <!-- Stats Grid -->
      <div class="stats-grid">
        <!-- Balance Card -->
        <div class="stat-card stat-card--primary">
          <div class="stat-card__header">
            <h3>Total Balance</h3>
            <div class="stat-card__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 4H3C1.89543 4 1 4.89543 1 6V18C1 19.1046 1.89543 20 3 20H21C22.1046 20 23 19.1046 23 18V6C23 4.89543 22.1046 4 21 4Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M1 10H23" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
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
              <svg v-if="!addressCopied" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.3333 10.7501V14.2501C13.3333 16.9168 12.25 18.0001 9.58333 18.0001H5.75C3.08333 18.0001 2 16.9168 2 14.2501V10.4168C2 7.75011 3.08333 6.66678 5.75 6.66678H9.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <svg v-else width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
          <div class="stat-card__value stat-card__value--mono">{{ shortAddress }}</div>
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
            <p class="section-card__description">Current gas fees for transactions</p>
          </div>
          <button @click="gasPrice.refetch()" class="btn-secondary" :disabled="gasPrice.isLoading.value">
            <svg
              :class="{ 'spin': gasPrice.isLoading.value }"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M15.8333 10C15.8333 13.2217 13.2217 15.8333 10 15.8333C6.77834 15.8333 4.16667 13.2217 4.16667 10C4.16667 6.77834 6.77834 4.16667 10 4.16667" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M13.3333 4.16667H15.8333V6.66667" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
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
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 14.6667V21.3333C24 26.6667 22 28.6667 16.6667 28.6667H10.6667C5.33333 28.6667 3.33333 26.6667 3.33333 21.3333V14.6667C3.33333 9.33333 5.33333 7.33333 10.6667 7.33333H16.6667C22 7.33333 24 9.33333 24 14.6667Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M28.6667 10.6667V17.3333C28.6667 20.6667 27.3333 22 24 22V14.6667C24 9.33333 22 7.33333 16.6667 7.33333H8.66667V5.33333C8.66667 2 10 0.666667 13.3333 0.666667H24C27.3333 0.666667 28.6667 2 28.6667 5.33333" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9.33203 19.3333H14.6654" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9.33203 24H17.332" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="gas-price-card__content">
              <h3>Current Gas Price</h3>
              <div class="gas-price-value">
                {{ gasPrice.formatted.value }} <span class="gas-price-unit">Gwei</span>
              </div>
              <p class="gas-price-description">Network: {{ chainName }}</p>
            </div>
          </div>

          <div class="gas-price-info">
            <div class="gas-info-item">
              <div class="gas-info-item__icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M12 6V12L16 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div>
                <h5>Real-time Pricing</h5>
                <p>Gas prices fluctuate based on network congestion</p>
              </div>
            </div>
            
            <div class="gas-info-item">
              <div class="gas-info-item__icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 11L12 14L22 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div>
                <h5>Transaction Cost</h5>
                <p>Total fee = Gas Price × Gas Used</p>
              </div>
            </div>

            <div class="gas-info-item">
              <div class="gas-info-item__icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
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
            <p class="section-card__description">Manage your assets and interact with contracts</p>
          </div>
        </div>

        <div class="actions-grid">
          <NuxtLink to="/transfer" class="action-card">
            <div class="action-card__icon">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 18.6667L20 10.6667" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M16.5467 18.6667H12V14.12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 29.3333H20C26.6667 29.3333 29.3333 26.6667 29.3333 20V12C29.3333 5.33333 26.6667 2.66667 20 2.66667H12C5.33333 2.66667 2.66667 5.33333 2.66667 12V20C2.66667 26.6667 5.33333 29.3333 12 29.3333Z" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="action-card__content">
              <h3>Send ETH</h3>
              <p>Transfer native currency to any address</p>
            </div>
            <div class="action-card__arrow">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </NuxtLink>

          <NuxtLink to="/counter" class="action-card">
            <div class="action-card__icon">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 29.3333C23.3638 29.3333 29.3333 23.3638 29.3333 16C29.3333 8.63621 23.3638 2.66667 16 2.66667C8.63621 2.66667 2.66667 8.63621 2.66667 16C2.66667 23.3638 8.63621 29.3333 16 29.3333Z" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M16 10.6667V16" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M16 21.3333H16.0133" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="action-card__content">
              <h3>Smart Contract</h3>
              <p>Interact with the counter contract</p>
            </div>
            <div class="action-card__arrow">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useHead } from '#app'
import type { Address } from 'viem'
import { useWallet } from '~/composables/web3/useWallet'
import { useBalance } from '~/composables/web3/useBalance'
import { useGasPrice } from '~/composables/web3/useGasPrice'
import { useUIStore } from '~/store/ui'
import { getChainById } from '~/lib/constants/chains'
import WalletButton from '~/components/web3/WalletButton.vue'

const { isConnected, shortAddress, chainId, address } = useWallet()
const balance = useBalance()
const gasPrice = useGasPrice()
const uiStore = useUIStore()

const addressCopied = ref(false)

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

function formatBalance(balance: string): string {
  const num = parseFloat(balance)
  if (isNaN(num)) return '0.00'
  if (num === 0) return '0.00'
  if (num < 0.0001) return '< 0.0001'
  return num.toFixed(4)
}

async function copyAddress() {
  if (address.value) {
    await navigator.clipboard.writeText(address.value)
    addressCopied.value = true
    uiStore.showSuccess('Address copied to clipboard')
    setTimeout(() => {
      addressCopied.value = false
    }, 2000)
  }
}

useHead({
  title: 'Dashboard - Nuxt DApp',
  meta: [
    { name: 'description', content: 'View your wallet balances and manage tokens' }
  ]
})
</script>
