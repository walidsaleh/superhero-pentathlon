<script setup lang="ts">
// Stores
import { useToastStore } from '@/stores/toast'
// Components
import ToastMessage from './ToastMessage.vue'

const toastStore = useToastStore()
</script>

<template>
  <Teleport to="body">
    <div class="toast-overlay">
      <TransitionGroup name="toast">
        <ToastMessage
          v-for="toast in toastStore.toasts"
          :key="toast.id"
          :id="toast.id"
          :message="toast.message"
          :type="toast.type"
          :on-close="() => toastStore.removeToast(toast.id)"
        />
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style>
/* Contenedor de los toasts */
.toast-overlay {
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 999999; /* Un z-index extremadamente alto para estar por encima de todo */
  pointer-events: none; /* Permite hacer clic a través del contenedor */
}

/* Animaciones para los toasts */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100px);
}
</style>
