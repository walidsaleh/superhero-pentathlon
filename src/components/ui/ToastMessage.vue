<!-- ToastMessage.vue -->
<script setup lang="ts">
// Vue core
import { computed } from 'vue'
// External libraries
import { XMarkIcon } from '@heroicons/vue/24/outline'
// Stores
import { useToastStore } from '@/stores/toast'

const props = defineProps<{
  message: string
  type: 'success' | 'error' | 'info'
  id: number
  onClose: () => void
}>()

const toastStore = useToastStore()

const typeClasses = computed(
  () =>
    ({
      success: 'bg-green-500 dark:bg-green-600',
      error: 'bg-red-500 dark:bg-red-600',
      info: 'bg-blue-500 dark:bg-blue-600'
    })[props.type]
)

// Pause the counter when mouse is over the toast
const handleMouseEnter = () => {
  toastStore.pauseToast(props.id)
}

// Resume the counter when mouse leaves the toast
const handleMouseLeave = () => {
  toastStore.resumeToast(props.id)
}
</script>

<template>
  <div
    class="toast-message flex items-center p-4 rounded-lg text-white shadow-lg transition-all duration-300 transform translate-y-0 w-72 toast-item"
    :class="typeClasses"
    role="alert"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <span class="mr-3 flex-grow">{{ message }}</span>
    <button
      @click="onClose"
      class="text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded"
      aria-label="Close notification"
    >
      <XMarkIcon class="h-5 w-5" />
    </button>
  </div>
</template>

<style>
/* Check that the toasts are above everything */
.toast-item {
  position: relative;
  z-index: 100000;
}
</style>
