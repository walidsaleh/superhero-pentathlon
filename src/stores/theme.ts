// Vue core
import { ref } from 'vue'
// External libraries
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(window.matchMedia('(prefers-color-scheme: dark)').matches)

  // Watch for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    isDark.value = e.matches
    updateTheme()
  })

  function toggleTheme() {
    isDark.value = !isDark.value
    updateTheme()
  }

  function updateTheme() {
    if (isDark.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  // Initialize theme
  updateTheme()

  return {
    isDark,
    toggleTheme
  }
})
