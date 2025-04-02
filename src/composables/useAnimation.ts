import { ref } from 'vue'

/**
 * Constants for podium animations
 */
export const ANIMATION_INITIAL_DELAY = 100 // ms before starting the sequence
export const ANIMATION_SEQUENCE_DELAY = 250 // ms between each podium element

/**
 * Composable for handling animations in the application
 * Provides animation state and utility functions
 */
export function useAnimation() {
  // Animation states for podium
  const showThirdPlace = ref(false)
  const showSecondPlace = ref(false)
  const showFirstPlace = ref(false)

  /**
   * Reset all animation states
   */
  const resetAnimations = () => {
    showThirdPlace.value = false
    showSecondPlace.value = false
    showFirstPlace.value = false
  }

  /**
   * Animate the podium in sequence
   */
  const animatePodium = () => {
    resetAnimations()
    
    setTimeout(() => {
      showThirdPlace.value = true
      
      setTimeout(() => {
        showSecondPlace.value = true
        
        setTimeout(() => {
          showFirstPlace.value = true
        }, ANIMATION_SEQUENCE_DELAY)
      }, ANIMATION_SEQUENCE_DELAY)
    }, ANIMATION_INITIAL_DELAY)
  }

  /**
   * Returns a random confetti color
   * @returns A random hexadecimal color from the predefined list
   */
  const getRandomConfettiColor = (): string => {
    const colors = [
      '#FFD700', // Gold
      '#C0C0C0', // Silver
      '#CD7F32', // Bronze
      '#FF5252', // Red
      '#4CAF50', // Green
      '#2196F3', // Blue
      '#9C27B0', // Purple
      '#FF9800' // Orange
    ]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  return {
    // Animation states
    showThirdPlace,
    showSecondPlace,
    showFirstPlace,
    
    // Animation functions
    resetAnimations,
    animatePodium,
    getRandomConfettiColor
  }
}
