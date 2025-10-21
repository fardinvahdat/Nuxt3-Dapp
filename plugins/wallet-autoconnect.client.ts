import { defineNuxtPlugin } from '#app'
import { useWallet } from '~/composables/web3/useWallet'

/**
 * Auto-connect plugin
 * Automatically reconnects wallet on page load if previously connected
 */
export default defineNuxtPlugin(async (nuxtApp) => {
  // Only run on client side
  if (process.server) return

  const { autoConnect } = useWallet()
  
  // Auto-connect on app initialization
  try {
    await autoConnect()
  } catch (error) {
    // Silent fail - user can manually connect if needed
    console.debug('Auto-connect skipped:', error)
  }
})
