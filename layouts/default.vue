<template>
  <div class="layout dark">
    <!-- Header -->
    <header class="header">
      <div class="container">
        <div class="header__content">
          <!-- Logo -->
          <NuxtLink to="/" class="header__logo">
            <div class="logo">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="32" height="32" rx="8" fill="url(#gradient)" />
                <path
                  d="M16 8L8 16L16 24L24 16L16 8Z"
                  fill="white"
                  fill-opacity="0.9"
                />
                <defs>
                  <linearGradient
                    id="gradient"
                    x1="0"
                    y1="0"
                    x2="32"
                    y2="32"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#8B5CF6" />
                    <stop offset="1" stop-color="#7C3AED" />
                  </linearGradient>
                </defs>
              </svg>
              <span class="logo-text">DApp</span>
            </div>
          </NuxtLink>

          <!-- Desktop Navigation -->
          <nav class="header__nav">
            <NuxtLink to="/" class="nav-link">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.5 14.1667H12.5"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10.0001 2.29175L3.39175 7.40841C2.86675 7.81675 2.45008 8.75841 2.55841 9.40841L3.55008 16.0001C3.70008 17.0167 4.66675 17.8501 5.70008 17.8501H14.3001C15.3251 17.8501 16.3001 17.0084 16.4501 15.9917L17.4417 9.40008C17.5417 8.75841 17.1251 7.81675 16.6084 7.40008L10.0001 2.29175Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span>Dashboard</span>
            </NuxtLink>

            <NuxtLink to="/transfer" class="nav-link">
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
                <path
                  d="M7.5 18.3333H12.5C16.6667 18.3333 18.3333 16.6667 18.3333 12.5V7.5C18.3333 3.33333 16.6667 1.66667 12.5 1.66667H7.5C3.33333 1.66667 1.66667 3.33333 1.66667 7.5V12.5C1.66667 16.6667 3.33333 18.3333 7.5 18.3333Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span>Transfer</span>
            </NuxtLink>

            <NuxtLink to="/counter" class="nav-link">
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
                  d="M10 6.66667V10"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10 13.3333H10.0083"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span>Counter</span>
            </NuxtLink>
          </nav>

          <!-- Mobile Menu Button -->
          <button
            @click="toggleMobileMenu"
            class="mobile-menu-button"
            aria-label="Toggle menu"
          >
            <svg
              v-if="!isMobileMenuOpen"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 12H21M3 6H21M3 18H21"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <svg
              v-else
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>

          <!-- Wallet Button -->
          <div class="header__actions">
            <NetworkSwitcher />
            <WalletButton />
          </div>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <Transition name="mobile-menu">
        <div v-if="isMobileMenuOpen" class="mobile-nav">
          <nav class="mobile-nav__content">
            <NuxtLink @click="closeMobileMenu" to="/" class="mobile-nav-link">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.5 14.1667H12.5"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10.0001 2.29175L3.39175 7.40841C2.86675 7.81675 2.45008 8.75841 2.55841 9.40841L3.55008 16.0001C3.70008 17.0167 4.66675 17.8501 5.70008 17.8501H14.3001C15.3251 17.8501 16.3001 17.0084 16.4501 15.9917L17.4417 9.40008C17.5417 8.75841 17.1251 7.81675 16.6084 7.40008L10.0001 2.29175Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span>Dashboard</span>
            </NuxtLink>

            <NuxtLink
              @click="closeMobileMenu"
              to="/transfer"
              class="mobile-nav-link"
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
                <path
                  d="M7.5 18.3333H12.5C16.6667 18.3333 18.3333 16.6667 18.3333 12.5V7.5C18.3333 3.33333 16.6667 1.66667 12.5 1.66667H7.5C3.33333 1.66667 1.66667 3.33333 1.66667 7.5V12.5C1.66667 16.6667 3.33333 18.3333 7.5 18.3333Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span>Transfer</span>
            </NuxtLink>

            <NuxtLink
              @click="closeMobileMenu"
              to="/counter"
              class="mobile-nav-link"
            >
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
                  d="M10 6.66667V10"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10 13.3333H10.0083"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span>Counter</span>
            </NuxtLink>
          </nav>
        </div>
      </Transition>
    </header>

    <!-- Main Content -->
    <main class="main">
      <div class="container">
        <slot />
      </div>
    </main>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer__content">
          <div class="footer__section">
            <div class="footer__logo">
              <svg
                width="24"
                height="24"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  width="32"
                  height="32"
                  rx="8"
                  fill="url(#footerGradient)"
                />
                <path
                  d="M16 8L8 16L16 24L24 16L16 8Z"
                  fill="white"
                  fill-opacity="0.9"
                />
                <defs>
                  <linearGradient
                    id="footerGradient"
                    x1="0"
                    y1="0"
                    x2="32"
                    y2="32"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#8B5CF6" />
                    <stop offset="1" stop-color="#7C3AED" />
                  </linearGradient>
                </defs>
              </svg>
              <span>Nuxt DApp</span>
            </div>
            <p class="footer__description">
              Production-ready modular DApp architecture built with Nuxt 3,
              TypeScript, Viem, and Wagmi Core.
            </p>
          </div>

          <div class="footer__links">
            <div class="footer__link-group">
              <h4>Resources</h4>
              <a
                href="https://nuxt.com"
                target="_blank"
                rel="noopener noreferrer"
                >Nuxt Docs</a
              >
              <a
                href="https://viem.sh"
                target="_blank"
                rel="noopener noreferrer"
                >Viem Docs</a
              >
              <a
                href="https://wagmi.sh"
                target="_blank"
                rel="noopener noreferrer"
                >Wagmi Docs</a
              >
            </div>

            <div class="footer__link-group">
              <h4>Community</h4>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                >GitHub</a
              >
              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                >Discord</a
              >
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                >Twitter</a
              >
            </div>
          </div>
        </div>

        <div class="footer__bottom">
          <p>&copy; {{ currentYear }} Nuxt DApp. All rights reserved.</p>
          <div class="footer__badges">
            <span class="badge badge--primary">Nuxt 3</span>
            <span class="badge badge--primary">TypeScript</span>
            <span class="badge badge--primary">Viem</span>
          </div>
        </div>
      </div>
    </footer>

    <!-- Toast Container -->
    <Toast />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import WalletButton from "~/components/web3/WalletButton.vue";
import NetworkSwitcher from "~/components/web3/NetworkSwitcher.vue";
import Toast from "~/components/ui/Toast.vue";
import { useWalletStore } from "~/store/wallet";
import { useWallet } from "~/composables/web3/useWallet";

const isMobileMenuOpen = ref(false);
const currentYear = computed(() => new Date().getFullYear());

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false;
}

onMounted(async () => {
  if (typeof window.ethereum !== "undefined") {
    try {
      const walletStore = useWalletStore();
      // Request accounts (will prompt user if not connected)
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length > 0) {
        const chain = await window.ethereum.request({ method: "eth_chainId" });
        walletStore.setConnected(accounts[0], parseInt(chain, 16));
        const { autoConnect } = useWallet();
        autoConnect();
      }

      // Get chain ID
      // chainId.value = parseInt(chain, 16)

      // Listen to account changes
      // window.ethereum.on('accountsChanged', (newAccounts: string[]) => {
      //   address.value = newAccounts[0] || null
      //   isConnected.value = newAccounts.length > 0
      // })

      // // Listen to chain/network changes
      // window.ethereum.on('chainChanged', (newChainId: string) => {
      //   chainId.value = parseInt(newChainId, 16)
      // })
    } catch (err) {
      console.error("Wallet connection failed:", err);
    }
  }
});
</script>

