import { ref, onMounted, onUnmounted, watch, computed, type Ref, type ComputedRef } from 'vue'
import type { Address, Abi, Log } from 'viem'
import { useWalletStore } from '~/store/wallet'
import { getPublicClient } from '~/lib/web3/client'
import { getChainById } from '~/lib/constants/chains'
import { parseWeb3Error } from '~/lib/utils/errors'

/**
 * Parsed event with standardized structure
 */
export interface ParsedEvent {
  eventName: string
  args: any
  blockNumber: bigint
  transactionHash: string
  logIndex: number
  address: Address
}

/**
 * Map viem log to standardized event
 */
function mapViemLogToEvent(log: Log): ParsedEvent {
  return {
    eventName: (log as any).eventName ?? 'Unknown',
    args: (log as any).args ?? {},
    blockNumber: log.blockNumber ?? BigInt(0),
    transactionHash: log.transactionHash ?? '0x',
    logIndex: log.logIndex ?? 0,
    address: log.address
  }
}

/**
 * Composable for watching contract events
 * 
 * @example
 * ```vue
 * <script setup lang="ts">
 * const { events, isListening } = useEventListener({
 *   address: '0x...',
 *   abi: MyContractABI,
 *   eventName: 'Transfer'
 * })
 * </script>
 * ```
 */
export function useEventListener<TAbi extends Abi = Abi>(config: {
  address: Address
  abi: TAbi
  eventName: string
  onLogs?: (logs: ParsedEvent[]) => void
  enabled?: boolean | ComputedRef<boolean>
}): {
  events: Ref<ParsedEvent[]>
  isListening: Ref<boolean>
  error: Ref<Error | null>
  startWatching: () => void
  stopWatching: () => void
  clearEvents: () => void
  fetchPastEvents: (fromBlock?: bigint, toBlock?: bigint) => Promise<ParsedEvent[] | undefined>
} {
  const walletStore = useWalletStore()
  
  const events = ref<ParsedEvent[]>([])
  const isListening = ref(false)
  const error = ref<Error | null>(null)
  
  let unwatch: (() => void) | null = null

  // Unwrap enabled if it's a ComputedRef
  const isEnabled = computed(() => {
    const enabled = config.enabled
    if (typeof enabled === 'boolean') {
      return enabled
    }
    if (enabled && 'value' in enabled) {
      return enabled.value
    }
    return true
  })

  /**
   * Start watching for events
   */
  function startWatching() {
    if (!walletStore.chainId || !isEnabled.value) {
      return
    }

    try {
      const chain = getChainById(walletStore.chainId)
      if (!chain) {
        throw new Error('Unsupported chain')
      }

      const publicClient = getPublicClient(chain)
      
      // Watch for contract events
      unwatch = publicClient.watchContractEvent({
        address: config.address,
        abi: config.abi as Abi,
        eventName: config.eventName as any,
        onLogs: (logs) => {
          // Map raw logs to parsed events
          const parsedLogs = logs.map(mapViemLogToEvent)
          events.value = [...parsedLogs, ...events.value]
          
          if (config.onLogs) {
            config.onLogs(parsedLogs)
          }
        },
        onError: (err) => {
          const parsedError = parseWeb3Error(err)
          error.value = parsedError
          console.error('Event listener error:', parsedError)
        }
      })

      isListening.value = true
    } catch (err) {
      const parsedError = parseWeb3Error(err)
      error.value = parsedError
      console.error('Failed to start event listener:', parsedError)
    }
  }

  /**
   * Stop watching for events
   */
  function stopWatching() {
    if (unwatch) {
      unwatch()
      unwatch = null
      isListening.value = false
    }
  }

  /**
   * Clear collected events
   */
  function clearEvents() {
    events.value = []
  }

  /**
   * Fetch past events
   */
  async function fetchPastEvents(fromBlock?: bigint, toBlock?: bigint): Promise<ParsedEvent[] | undefined> {
    if (!walletStore.chainId) {
      return
    }

    try {
      const chain = getChainById(walletStore.chainId)
      if (!chain) {
        throw new Error('Unsupported chain')
      }

      const publicClient = getPublicClient(chain)
      
      const logs = await publicClient.getContractEvents({
        address: config.address,
        abi: config.abi as Abi,
        eventName: config.eventName as any,
        fromBlock,
        toBlock
      })

      // Map to parsed events
      const parsedLogs = logs.map(mapViemLogToEvent)
      events.value = [...events.value, ...parsedLogs]
      return parsedLogs
    } catch (err) {
      const parsedError = parseWeb3Error(err)
      error.value = parsedError
      console.error('Failed to fetch past events:', parsedError)
      throw parsedError
    }
  }

  // Auto-start watching when enabled
  watch(
    () => [walletStore.chainId, isEnabled.value],
    () => {
      stopWatching()
      if (isEnabled.value) {
        startWatching()
      }
    },
    { immediate: true }
  )

  // Cleanup on unmount
  onUnmounted(() => {
    stopWatching()
  })

  return {
    events,
    isListening,
    error,
    startWatching,
    stopWatching,
    clearEvents,
    fetchPastEvents
  }
}