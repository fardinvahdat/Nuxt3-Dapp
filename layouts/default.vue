<template>
  <div class="layout dark">
    <!-- Header -->
    <header class="header">
      <div class="container">
        <div class="header__content">
          <!-- Logo -->
          <NuxtLink to="/" class="header__logo">
            <div class="logo">
              <Icon name="logo" />
              <span class="logo-text">Nuxt 3 DApp</span>
            </div>
          </NuxtLink>

          <!-- Desktop Navigation -->
          <nav class="header__nav">
            <NuxtLink to="/" class="nav-link">
              <Icon name="home" />
              <span>Dashboard</span>
            </NuxtLink>

            <NuxtLink to="/transfer" class="nav-link">
              <Icon name="transfer" />
              <span>Transfer</span>
            </NuxtLink>

            <NuxtLink to="/contract" class="nav-link">
              <Icon name="contract" />
              <span>Contract</span>
            </NuxtLink>
          </nav>

          <!-- Mobile Menu Button -->
          <button
            @click="toggleMobileMenu"
            class="mobile-menu-button text-white"
            aria-label="Toggle menu"
          >
            <Icon v-if="!isMobileMenuOpen" name="menu-open" />
            <Icon v-else name="menu-close" />
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
              <Icon name="home" />
              <span>Dashboard</span>
            </NuxtLink>

            <NuxtLink
              @click="closeMobileMenu"
              to="/transfer"
              class="mobile-nav-link"
            >
              <Icon name="transfer" />
              <span>Transfer</span>
            </NuxtLink>

            <NuxtLink
              @click="closeMobileMenu"
              to="/counter"
              class="mobile-nav-link"
            >
              <Icon name="contract" />
              <span>Contract</span>
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
              <Icon name="logo" />
              <span class="text-white">Nuxt DApp</span>
            </div>
            <p class="footer__description">
              Production-ready modular DApp architecture built with Nuxt 3,
              TypeScript, Viem.
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
            </div>

            <div class="footer__link-group">
              <h4>Community</h4>
              <a
                href="https://github.com/fardinvahdat"
                target="_blank"
                rel="noopener noreferrer"
                >GitHub</a
              >
              <a
                href="https://www.linkedin.com/in/fardinvahdat/"
                target="_blank"
                rel="noopener noreferrer"
                >LinkedIn</a
              >
            </div>
          </div>
        </div>

        <div class="footer__bottom">
          <p>&copy; {{ currentYear }} Nuxt DApp.</p>
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
    } catch (err) {
      console.error("Wallet connection failed:", err);
    }
  }
});
</script>
