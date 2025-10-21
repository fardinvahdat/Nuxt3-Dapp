import { defineStore } from 'pinia'

export interface Toast {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
  description?: string
  duration?: number
}

export interface UIState {
  toasts: Toast[]
  isWalletModalOpen: boolean
  isNetworkModalOpen: boolean
  isSidebarOpen: boolean
  theme: 'light' | 'dark' | 'system'
}

export const useUIStore = defineStore('ui', {
  state: (): UIState => ({
    toasts: [],
    isWalletModalOpen: false,
    isNetworkModalOpen: false,
    isSidebarOpen: false,
    theme: 'system'
  }),

  actions: {
    /**
     * Add a toast notification
     */
    addToast(toast: Omit<Toast, 'id'>) {
      const id = `toast-${Date.now()}-${Math.random()}`
      const newToast: Toast = {
        id,
        duration: 5000,
        ...toast
      }

      this.toasts.push(newToast)

      // Auto-remove after duration
      if (newToast.duration) {
        setTimeout(() => {
          this.removeToast(id)
        }, newToast.duration)
      }
    },

    /**
     * Remove a toast by ID
     */
    removeToast(id: string) {
      this.toasts = this.toasts.filter(t => t.id !== id)
    },

    /**
     * Clear all toasts
     */
    clearToasts() {
      this.toasts = []
    },

    /**
     * Show success toast
     */
    showSuccess(message: string, description?: string) {
      this.addToast({ type: 'success', message, description })
    },

    /**
     * Show error toast
     */
    showError(message: string, description?: string) {
      this.addToast({ type: 'error', message, description })
    },

    /**
     * Show warning toast
     */
    showWarning(message: string, description?: string) {
      this.addToast({ type: 'warning', message, description })
    },

    /**
     * Show info toast
     */
    showInfo(message: string, description?: string) {
      this.addToast({ type: 'info', message, description })
    },

    /**
     * Toggle wallet modal
     */
    toggleWalletModal(open?: boolean) {
      this.isWalletModalOpen = open ?? !this.isWalletModalOpen
    },

    /**
     * Toggle network modal
     */
    toggleNetworkModal(open?: boolean) {
      this.isNetworkModalOpen = open ?? !this.isNetworkModalOpen
    },

    /**
     * Toggle sidebar
     */
    toggleSidebar(open?: boolean) {
      this.isSidebarOpen = open ?? !this.isSidebarOpen
    },

    /**
     * Set theme
     */
    setTheme(theme: 'light' | 'dark' | 'system') {
      this.theme = theme
      this.applyTheme()
    },

    /**
     * Apply theme to document
     */
    applyTheme() {
      if (process.client) {
        const root = document.documentElement
        const isDark = this.theme === 'dark' || 
          (this.theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
        
        if (isDark) {
          root.classList.add('dark')
        } else {
          root.classList.remove('dark')
        }
      }
    }
  }
})