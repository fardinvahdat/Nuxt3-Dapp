import { ref, computed } from 'vue'
import type { Address } from 'viem'
import { useWalletStore } from '~/store/wallet'
import { useUIStore } from '~/store/ui'
import { parseWeb3Error, getUserFriendlyErrorMessage } from '~/lib/utils/errors'

// Global flag to track if event listeners are set up
let eventListenersInitialized = false
// Global flag to track if autoConnect has been called
let autoConnectInitialized = false

/**
 * Composable for wallet connection and management
 * 
 * @example
 * ```vue
 * <script setup lang="ts">
 * const { connect, disconnect, address, isConnected, switchChain } = useWallet()
 * 
 * async function handleConnect() {
 *   await connect('metamask')
 * }
 * </script>
 * ```
 */
export function useWallet() {
  const walletStore = useWalletStore()
  const uiStore = useUIStore()
  
  const isConnecting = ref(false)
  const error = ref<Error | null>(null)

  // Computed properties from store
  const address = computed(() => walletStore.address)
  const chainId = computed(() => walletStore.chainId)
  const isConnected = computed(() => walletStore.isConnected)
  const connector = computed(() => walletStore.connector)
  const shortAddress = computed(() => walletStore.shortAddress)

  /**
   * Connect to a wallet provider
   */
  async function connect(connectorName: string = 'metamask'): Promise<void> {
    isConnecting.value = true
    error.value = null
    walletStore.setConnecting(true)

    try {
      // Check if Ethereum provider exists
      if (typeof window === 'undefined' || !window.ethereum) {
        throw new Error('No Ethereum provider found. Please install MetaMask.')
      }

      // Request accounts
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      }) as string[]

      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts found')
      }

      // Get chain ID
      const chainIdHex = await window.ethereum.request({ 
        method: 'eth_chainId' 
      }) as string
      const currentChainId = parseInt(chainIdHex, 16)

      // Update store
      walletStore.setConnected(
        accounts[0] as Address,
        currentChainId,
        connectorName
      )

      uiStore.showSuccess('Wallet connected successfully')

      // Setup event listeners
      setupEventListeners()
    } catch (err) {
      const parsedError = parseWeb3Error(err)
      error.value = parsedError
      uiStore.showError('Failed to connect wallet', getUserFriendlyErrorMessage(parsedError))
      throw parsedError
    } finally {
      isConnecting.value = false
      walletStore.setConnecting(false)
    }
  }

  /**
   * Disconnect wallet
   */
  async function disconnect(): Promise<void> {
    try {
      // Clean up event listeners first
      cleanupEventListeners()
      
      // Clear store state
      walletStore.disconnect()
      
      // Clear persisted state from localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('wallet')
      }
      
      // Request MetaMask to revoke permissions (if supported)
      if (window.ethereum?.request) {
        try {
          // This will prompt user to disconnect in MetaMask
          await window.ethereum.request({
            method: 'wallet_revokePermissions',
            params: [{ eth_accounts: {} }]
          })
        } catch (err) {
          // Fallback: Just disconnect locally if revoke not supported
          console.warn('Wallet revoke permissions not supported:', err)
        }
      }
      
      uiStore.showSuccess('Wallet disconnected successfully')
    } catch (err) {
      console.error('Error during disconnect:', err)
      // Still show as disconnected even if there's an error
      uiStore.showSuccess('Wallet disconnected successfully')
    }
  }

  /**
   * Switch to a different chain
   */
  async function switchChain(targetChainId: number): Promise<void> {
    if (!window.ethereum) {
      throw new Error('No Ethereum provider found')
    }

    try {
      const chainIdHex = `0x${targetChainId.toString(16)}`
      
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chainIdHex }]
      })

      walletStore.setChainId(targetChainId)
      uiStore.showSuccess('Network switched successfully')
    } catch (err: any) {
      // Chain not added to wallet, try adding it
      if (err.code === 4902) {
        uiStore.showError('Network not found', 'Please add this network to your wallet manually')
      } else {
        const parsedError = parseWeb3Error(err)
        uiStore.showError('Failed to switch network', getUserFriendlyErrorMessage(parsedError))
        throw parsedError
      }
    }
  }

  /**
   * Setup event listeners for wallet changes
   */
  function setupEventListeners(): void {
    if (!window.ethereum || eventListenersInitialized) return

    // Account changed
    window.ethereum.on('accountsChanged', handleAccountsChanged)
    
    // Chain changed
    window.ethereum.on('chainChanged', handleChainChanged)
    
    // Disconnect
    window.ethereum.on('disconnect', handleDisconnect)

    // Set the flag to true
    eventListenersInitialized = true
  }

  /**
   * Cleanup event listeners
   */
  function cleanupEventListeners(): void {
    if (!window.ethereum) return

    window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
    window.ethereum.removeListener('chainChanged', handleChainChanged)
    window.ethereum.removeListener('disconnect', handleDisconnect)

    // Set the flag to false
    eventListenersInitialized = false
  }

  /**
   * Handle accounts changed event
   */
  function handleAccountsChanged(accounts: string[]): void {
    if (accounts.length === 0) {
      disconnect()
    } else if (accounts[0] !== walletStore.address) {
      walletStore.setConnected(
        accounts[0] as Address,
        walletStore.chainId!,
        walletStore.connector!
      )
      uiStore.showInfo('Account changed')
    }
  }

  /**
   * Handle chain changed event
   */
  function handleChainChanged(chainIdHex: string): void {
    const newChainId = parseInt(chainIdHex, 16)
    walletStore.setChainId(newChainId)
    uiStore.showInfo('Network changed')
    
    // Reload page to avoid state issues (recommended by MetaMask)
    if (process.client) {
      window.location.reload()
    }
  }

  /**
   * Handle disconnect event
   */
  function handleDisconnect(): void {
    disconnect()
  }

  /**
   * Auto-reconnect on mount if previously connected
   */
  async function autoConnect(): Promise<void> {
    debugger
    // Only auto-connect if we have persisted connection data
    if (walletStore.connector && walletStore.address) {
      try {
        // Check if the wallet is actually still connected
        if (window.ethereum) {
          const accounts = await window.ethereum.request({ 
            method: 'eth_accounts' 
          }) as string[]
          
          if (accounts && accounts.length > 0 && accounts[0] === walletStore.address) {
            // Wallet is still connected, just restore the state
            const chainIdHex = await window.ethereum.request({ 
              method: 'eth_chainId' 
            }) as string
            const currentChainId = parseInt(chainIdHex, 16)
            
            walletStore.setConnected(
              accounts[0] as Address,
              currentChainId,
              walletStore.connector
            )
            
            // Setup event listeners
            setupEventListeners()
          } else {
            // Wallet is not connected anymore, clear the store
            walletStore.disconnect()
          }
        }
      } catch (err) {
        // Silent fail for auto-connect and clear store
        console.warn('Auto-connect failed:', err)
        walletStore.disconnect()
      }
    }
  }

  // Auto-connect on composable initialization
  if (process.client && !autoConnectInitialized) {
    autoConnect()
    autoConnectInitialized = true
  }

  return {
    // State
    address,
    chainId,
    isConnected,
    isConnecting: computed(() => isConnecting.value || walletStore.isConnecting),
    connector,
    shortAddress,
    error: computed(() => error.value),

    // Methods
    connect,
    disconnect,
    switchChain,
    autoConnect
  }
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    ethereum?: any
  }
}