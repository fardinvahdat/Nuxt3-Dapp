<template>
  <Teleport to="body">
    <div class="toast-container">
      <TransitionGroup name="toast">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          :class="['toast', `toast--${toast.type}`]"
        >
          <div class="toast__content">
            <div class="toast__icon">
              <span v-if="toast.type === 'success'">✓</span>
              <span v-else-if="toast.type === 'error'">✕</span>
              <span v-else-if="toast.type === 'warning'">⚠</span>
              <span v-else>ℹ</span>
            </div>
            <div class="toast__message">
              <div class="toast__title">{{ toast.message }}</div>
              <div v-if="toast.description" class="toast__description">
                {{ toast.description }}
              </div>
            </div>
          </div>
          <button @click="removeToast(toast.id)" class="toast__close">
            ✕
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useUIStore } from '~/store/ui'

const uiStore = useUIStore()

const toasts = computed(() => uiStore.toasts)

function removeToast(id: string) {
  uiStore.removeToast(id)
}
</script>
