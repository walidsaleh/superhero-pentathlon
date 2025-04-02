/**
 * Funciones de utilidad para animaciones
 */

/**
 * Constantes para las animaciones del podio
 */
export const ANIMATION_INITIAL_DELAY = 100 // ms antes de empezar la secuencia
export const ANIMATION_SEQUENCE_DELAY = 250 // ms entre cada elemento del podio

/**
 * Devuelve un color aleatorio para los confetis
 * @returns Un color hexadecimal aleatorio de la lista predefinida
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
