// Global type declarations for Nuxt DApp
export {}

declare global {
  interface Process {
    client?: boolean
    server?: boolean
  }

  interface Window {
    ethereum?: any
    coinbaseWalletExtension?: any
  }
}
