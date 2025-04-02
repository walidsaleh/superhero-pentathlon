<!-- ModalDialog.vue -->
<script setup lang="ts">
import { computed, ref, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  show: boolean
  size?: 'sm' | 'md' | 'lg'
  closeOnBackdropClick?: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const dialogRef = ref<HTMLDialogElement | null>(null)

// Handle dialog close
const handleClose = () => {
  emit('close')
}

// Manejar clics en el backdrop
const handleBackdropClick = (event: MouseEvent) => {
  // Solo cerrar si el clic fue directamente en el backdrop (no en el contenido)
  const rect = dialogRef.value?.getBoundingClientRect()
  if (rect) {
    const clickedInDialog =
      rect.top <= event.clientY &&
      event.clientY <= rect.top + rect.height &&
      rect.left <= event.clientX &&
      event.clientX <= rect.left + rect.width

    if (!clickedInDialog && props.closeOnBackdropClick !== false) {
      handleClose()
    }
  }
}

// Calculate width based on size
const modalWidth = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'w-[320px] sm:w-[400px]'
    case 'lg':
      return 'w-[320px] sm:w-[600px]'
    case 'md':
    default:
      return 'w-[320px] sm:w-[500px]'
  }
})

// Control dialog opening/closing based on show prop
watch(
  () => props.show,
  (isVisible) => {
    if (!dialogRef.value) return

    const action = isVisible ? 'showModal' : 'close'
    dialogRef.value[action]()
  },
  { immediate: true }
)

// Handle dialog cancel event (Escape key)
onMounted(() => {
  if (dialogRef.value) {
    dialogRef.value.addEventListener('cancel', (e) => {
      e.preventDefault() // Prevent automatic closing
      handleClose()
    })
  }
})

// Make sure the dialog opens when the component mounts if show is true
onMounted(() => {
  if (props.show && dialogRef.value && !dialogRef.value.open) {
    dialogRef.value.showModal()
  }
})

// Close the dialog when the component unmounts
onUnmounted(() => {
  if (dialogRef.value && dialogRef.value.open) {
    dialogRef.value.close()
  }
})
</script>

<template>
  <dialog
    ref="dialogRef"
    class="modal-dialog"
    :class="[
      modalWidth,
      'p-0 m-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl max-h-[90vh] overflow-y-auto relative'
    ]"
    @click="handleBackdropClick"
  >
    <div class="relative">
      <slot />
    </div>
  </dialog>
</template>

<style>
/* Styling for the dialog backdrop */
dialog::backdrop {
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 9000; /* Ensure the backdrop is below toasts */
}

/* Styling for the dialog */
dialog {
  position: relative;
  z-index: 9500; /* Mayor que el backdrop pero menor que los toasts */
}

/* Dialog animation */
dialog[open] {
  animation: dialog-show 0.2s ease-out;
}

@keyframes dialog-show {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
