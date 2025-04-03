/**
 * Constants for podium animations
 */
export const ANIMATION_INITIAL_DELAY = 100 // ms before starting the sequence
export const ANIMATION_SEQUENCE_DELAY = 250 // ms between each podium element

/**
 * Returns a random color for confetti
 * @returns A random color from the predefined list
 */
export const getRandomConfettiColor = (): string => {
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

export const MAX_CONFETTIS = 50 // Maximum number of confetti pieces
