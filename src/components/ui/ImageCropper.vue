<script setup lang="ts">
// Vue core
import { ref, onMounted, onUnmounted } from 'vue'
// External libraries
import { Cropper } from 'vue-advanced-cropper'
// Styles
import 'vue-advanced-cropper/dist/style.css'
// External libraries
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  imageUrl: string
}>()

const emit = defineEmits<{
  (e: 'crop', croppedImage: string): void
  (e: 'cancel'): void
}>()

const cropperRef = ref<InstanceType<typeof Cropper> | null>(null)
const dialogRef = ref<HTMLDialogElement | null>(null)

const { t } = useI18n()

const onReady = () => {
  if (!cropperRef.value) return

  // Wait for a tick to ensure the cropper is mounted
  setTimeout(() => {
    // Get the actual size of the container
    const container = document.querySelector('.cropper')
    if (!container) return

    // Get the original image
    const img = new Image()
    img.src = props.imageUrl
    img.onload = () => {
      const imageSize = {
        width: img.width,
        height: img.height
      }

      const containerSize = {
        width: container.clientWidth,
        height: container.clientHeight
      }

      // Calculate the scale
      const scale = Math.min(
        containerSize.width / imageSize.width,
        containerSize.height / imageSize.height
      )

      // Calculate the actual size of the scaled image
      const scaledSize = {
        width: imageSize.width * scale,
        height: imageSize.height * scale
      }

      // Use the smallest side as the cropper size
      const cropperSize = Math.min(scaledSize.width, scaledSize.height)

      // Adjust coordinates to the actual image size
      cropperRef.value?.setCoordinates({
        width: cropperSize / scale,
        height: cropperSize / scale,
        left: (imageSize.width - cropperSize / scale) / 2,
        top: (imageSize.height - cropperSize / scale) / 2
      })
    }
  }, 0)
}

const handleCancel = () => {
  if (dialogRef.value) {
    dialogRef.value.close()
  }
  emit('cancel')
}

// Handle dialog cancel event (Escape key)
onMounted(() => {
  if (dialogRef.value) {
    dialogRef.value.addEventListener('cancel', (e) => {
      e.preventDefault() // Prevent automatic closing
      handleCancel()
    })
    // Show dialog when component is mounted
    dialogRef.value.showModal()
  }
})

// Close dialog when component is unmounted
onUnmounted(() => {
  if (dialogRef.value && dialogRef.value.open) {
    dialogRef.value.close()
  }
})

const crop = () => {
  if (!cropperRef.value) return

  const { canvas } = cropperRef.value.getResult()

  // Ensure the output is 128x128
  const outputCanvas = document.createElement('canvas')
  outputCanvas.width = 128
  outputCanvas.height = 128
  const ctx = outputCanvas.getContext('2d')

  if (ctx && canvas) {
    ctx.drawImage(canvas, 0, 0, 128, 128)
    const croppedImage = outputCanvas.toDataURL('image/jpeg', 0.9)
    if (dialogRef.value) {
      dialogRef.value.close()
    }
    emit('crop', croppedImage)
  }
}
</script>

<template>
  <dialog
    ref="dialogRef"
    class="image-cropper p-0 m-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl max-h-[90vh] overflow-y-auto relative w-[320px] sm:w-[600px]"
  >
    <div class="image-cropper__container p-6">
      <h3 class="image-cropper__title text-lg font-semibold mb-4 dark:text-white">{{ t('components.imageCropper.title') }}</h3>

      <div
        class="image-cropper__area aspect-square w-full mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden"
      >
        <Cropper
          ref="cropperRef"
          class="h-full cropper"
          :src="imageUrl"
          :stencil-props="{
            aspectRatio: 1
          }"
          :min-width="128"
          :min-height="128"
          image-restriction="stencil"
          @ready="onReady"
          @dragstart.prevent
          @dragend.prevent
          @dragover.prevent
          @mousedown.prevent
        />
      </div>

      <div class="image-cropper__actions flex justify-end space-x-3">
        <button
          @click="handleCancel"
          class="image-cropper__button image-cropper__button--cancel px-4 py-2 border rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          Cancel
        </button>
        <button
          @click="crop"
          class="image-cropper__button image-cropper__button--confirm px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700 transition-colors duration-200"
        >
          OK
        </button>
      </div>
    </div>
  </dialog>
</template>

<style>
.cropper {
  height: 100%;
  width: 100%;
  background: #f0f0f0;
}

.dark .cropper {
  background: #1f2937;
}

/* Styles for cropper icons */
:deep(.vue-advanced-cropper__foreground) {
  border: 2px solid white;
  box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5);
}

:deep(.vue-advanced-cropper__handles-wrapper) {
  border: 1px solid rgba(255, 255, 255, 0.3);
}

:deep(.vue-advanced-cropper__handle) {
  background: white;
  border: 1px solid rgba(255, 255, 255, 0.5);
}

:deep(.vue-advanced-cropper__handle::before) {
  background: white;
}

:deep(.vue-advanced-cropper__handle::after) {
  background: white;
}

/* Style for dialog backdrop */
dialog::backdrop {
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

/* Dialog animations */
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
