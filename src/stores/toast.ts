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
    
    // Crear el timeout para auto-eliminar el toast
    const timeoutId = window.setTimeout(() => {
      removeToast(id)
    }, TOAST_DURATION_MS)
    
    toast.timeoutId = timeoutId
    toasts.value.push(toast)

    return id
  }

  const removeToast = (id: number) => {
    const index = toasts.value.findIndex(t => t.id === id)
    if (index > -1) {
      // Limpiar el timeout si existe
      if (toasts.value[index].timeoutId) {
        window.clearTimeout(toasts.value[index].timeoutId)
      }
      toasts.value.splice(index, 1)
    }
  }
  
  const pauseToast = (id: number) => {
    const toast = toasts.value.find(t => t.id === id)
    if (toast && toast.timeoutId && !toast.pausedAt) {
      // Cancelar el timeout actual
      window.clearTimeout(toast.timeoutId)
      toast.timeoutId = undefined
      
      // Guardar el momento en que se pausa
      toast.pausedAt = Date.now()
    }
  }
  
  const resumeToast = (id: number) => {
    const toast = toasts.value.find(t => t.id === id)
    if (toast && toast.pausedAt && toast.remainingTime) {
      // Calcular el tiempo restante ajustado por el tiempo de pausa
      const elapsedPauseTime = Date.now() - toast.pausedAt
      toast.remainingTime = Math.max(0, toast.remainingTime - elapsedPauseTime)
      
      // Crear un nuevo timeout con el tiempo restante
      toast.timeoutId = window.setTimeout(() => {
        removeToast(id)
      }, toast.remainingTime)
      
      // Limpiar el estado de pausa
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
