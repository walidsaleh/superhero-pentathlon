// Vue core
import { ref } from 'vue'
// External libraries
import { defineStore } from 'pinia'

const TOAST_DURATION_MS = 5000

export type ToastType = 'success' | 'error' | 'info'

interface Toast {
  id: number
  message: string
  type: ToastType
  timeoutId?: number
  remainingTime?: number
  pausedAt?: number
}

export const useToastStore = defineStore('toast', () => {
  const toasts = ref<Toast[]>([])
  let nextId = 0

  const showToast = (message: string, type: ToastType = 'info') => {
    const id = nextId++
    const toast: Toast = {
      id,
      message,
      type,
      remainingTime: TOAST_DURATION_MS
    }

    // Create the timeout to auto-remove the toast
    const timeoutId = window.setTimeout(() => {
      removeToast(id)
    }, TOAST_DURATION_MS)

    toast.timeoutId = timeoutId
    toasts.value.push(toast)

    return id
  }

  const removeToast = (id: number) => {
    const index = toasts.value.findIndex((t) => t.id === id)
    if (index > -1) {
      // Clear the timeout if it exists
      if (toasts.value[index].timeoutId) {
        window.clearTimeout(toasts.value[index].timeoutId)
      }
      toasts.value.splice(index, 1)
    }
  }

  const pauseToast = (id: number) => {
    const toast = toasts.value.find((t) => t.id === id)
    if (toast && toast.timeoutId && !toast.pausedAt) {
      // Cancel the current timeout
      window.clearTimeout(toast.timeoutId)
      toast.timeoutId = undefined

      // Save the moment it was paused
      toast.pausedAt = Date.now()
    }
  }

  const resumeToast = (id: number) => {
    const toast = toasts.value.find((t) => t.id === id)
    if (toast && toast.pausedAt && toast.remainingTime) {
      // Calculate the remaining time adjusted by the pause time
      const elapsedPauseTime = Date.now() - toast.pausedAt
      toast.remainingTime = Math.max(0, toast.remainingTime - elapsedPauseTime)

      // Create a new timeout with the remaining time
      toast.timeoutId = window.setTimeout(() => {
        removeToast(id)
      }, toast.remainingTime)

      // Clear the pause state
      toast.pausedAt = undefined
    }
  }

  return {
    toasts,
    showToast,
    removeToast,
    pauseToast,
    resumeToast
  }
})
