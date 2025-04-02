import { ref } from 'vue'

/**
 * Composable for handling image uploads and cropping
 * Provides methods and state for managing image operations
 */
export function useImageHandling() {
  const imageUrl = ref<string | null>(null)
  const showCropper = ref(false)
  const isLoading = ref(false)
  const croppedImage = ref<string | null>(null)
  
  /**
   * Handle file selection from input
   * @param event The file input change event
   */
  const handleFileSelect = (event: Event) => {
    const input = event.target as HTMLInputElement
    if (input.files && input.files.length > 0) {
      const file = input.files[0]
      handleFile(file)
    }
  }
  
  /**
   * Handle file from drag and drop or other sources
   * @param file The file to process
   */
  const handleFile = (file: File) => {
    if (!file.type.match('image.*')) {
      return
    }
    
    isLoading.value = true
    const reader = new FileReader()
    
    reader.onload = (e) => {
      if (e.target?.result) {
        imageUrl.value = e.target.result as string
        showCropper.value = true
      }
      isLoading.value = false
    }
    
    reader.readAsDataURL(file)
  }
  
  /**
   * Handle drag and drop events
   * @param event The drag event
   */
  const handleDrop = (event: DragEvent) => {
    event.preventDefault()
    event.stopPropagation()
    
    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0]
      handleFile(file)
    }
  }
  
  /**
   * Handle drag over event
   * @param event The drag event
   */
  const handleDragOver = (event: DragEvent) => {
    event.preventDefault()
    event.stopPropagation()
  }
  
  /**
   * Handle cropped image
   * @param image The cropped image data URL
   */
  const handleCrop = (image: string) => {
    croppedImage.value = image
    showCropper.value = false
  }
  
  /**
   * Cancel cropping
   */
  const cancelCrop = () => {
    showCropper.value = false
  }
  
  /**
   * Reset all image state
   */
  const resetImage = () => {
    imageUrl.value = null
    croppedImage.value = null
    showCropper.value = false
  }
  
  return {
    // State
    imageUrl,
    showCropper,
    isLoading,
    croppedImage,
    
    // Methods
    handleFileSelect,
    handleFile,
    handleDrop,
    handleDragOver,
    handleCrop,
    cancelCrop,
    resetImage
  }
}
