import { ref, watch, onMounted, onUnmounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'

type ThemeType = 'light' | 'dark' | 'system'

/**
 * Composable for handling theme preferences
 * Provides methods and state for managing the application's theme
 */
export function useTheme() {
  const { t } = useI18n()
  const theme = ref<ThemeType>('system')
  const isDark = ref(false)

  /**
   * Apply the current theme to the document
   */
  const applyTheme = () => {
    if (theme.value === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      isDark.value = prefersDark
      document.documentElement.classList.toggle('dark', prefersDark)
    } else {
      isDark.value = theme.value === 'dark'
      document.documentElement.classList.toggle('dark', theme.value === 'dark')
    }
  }

  /**
   * Set the theme
   * @param newTheme The theme to set
   */
  const setTheme = (newTheme: ThemeType) => {
    theme.value = newTheme
    localStorage.setItem('theme', newTheme)
    applyTheme()
  }

  /**
   * Toggle between light and dark themes
   */
  const toggleTheme = () => {
    if (theme.value === 'system') {
      setTheme(isDark.value ? 'light' : 'dark')
    } else {
      setTheme(theme.value === 'dark' ? 'light' : 'dark')
    }
  }

  /**
   * Get the theme options for UI
   */
  const themeOptions = computed(() => [
    { value: 'light', label: t('settings.theme.light') },
    { value: 'dark', label: t('settings.theme.dark') },
    { value: 'system', label: t('settings.theme.system') }
  ])

  // Watch for system preference changes
  onMounted(() => {
    // Load saved theme preference
    const savedTheme = localStorage.getItem('theme') as ThemeType | null
    if (savedTheme) {
      theme.value = savedTheme
    }

    // Apply theme
    applyTheme()

    // Watch for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', applyTheme)

    // Clean up
    onUnmounted(() => {
      mediaQuery.removeEventListener('change', applyTheme)
    })
  })

  // Watch for theme changes
  watch(theme, applyTheme)

  return {
    theme,
    isDark,
    setTheme,
    toggleTheme,
    themeOptions
  }
}
