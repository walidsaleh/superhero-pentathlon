import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSuperheroStore } from '@/stores/superhero'
import { useToastStore } from '@/stores/toast'
import { REQUIRED_HEROES } from '@/config/constants'

/**
 * Composable for handling hero selection functionality
 * Provides methods and state for selecting heroes for the competition
 */
export function useHeroSelection() {
  const store = useSuperheroStore()
  const toastStore = useToastStore()
  const { t } = useI18n()

  // Selection state
  const selectedHeroes = ref<string[]>([])
  const isLoading = ref(true)

  // Available heroes from the store
  const availableHeroes = computed(() => store.superheroes)

  /**
   * Toggle hero selection for the competition
   */
  const toggleHeroSelection = (heroId: string) => {
    const isSelected = isHeroSelected(heroId)

    if (isSelected) {
      // If the hero is already selected, remove it
      selectedHeroes.value = selectedHeroes.value.filter((id) => id !== heroId)
    } else if (selectedHeroes.value.length < REQUIRED_HEROES) {
      // If not selected and limit not reached, add it
      selectedHeroes.value = [...selectedHeroes.value, heroId]
    }
  }

  /**
   * Check if a hero is selected
   * @param heroId The ID of the hero to check
   */
  const isHeroSelected = (heroId: string) => {
    return selectedHeroes.value.includes(heroId)
  }

  /**
   * Clear all selected heroes
   */
  const clearSelection = () => {
    selectedHeroes.value = []
  }

  /**
   * Load heroes if needed
   */
  const loadHeroes = async () => {
    isLoading.value = true
    try {
      if (availableHeroes.value.length === 0) {
        await store.fetchSuperheroes()
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      toastStore.showToast(t('errors.loadingSuperheroes', { error: errorMessage }), 'error')
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Check if selection is complete
   */
  const isSelectionComplete = computed(() => {
    return selectedHeroes.value.length === REQUIRED_HEROES
  })

  /**
   * Get the number of heroes still needed
   */
  const heroesNeeded = computed(() => {
    return Math.max(0, REQUIRED_HEROES - selectedHeroes.value.length)
  })

  /**
   * Message for hero selection status
   */
  const selectionMessage = computed(() => {
    if (selectedHeroes.value.length >= REQUIRED_HEROES) {
      return t('pages.pentathlon.selection.complete')
    } else {
      const count = REQUIRED_HEROES - selectedHeroes.value.length
      return t('pages.pentathlon.selection.selectMoreHeroes', { count })
    }
  })

  /**
   * Check if there are enough heroes available
   */
  const hasEnoughHeroes = computed(() => {
    return availableHeroes.value.length >= REQUIRED_HEROES
  })

  return {
    // State
    selectedHeroes,
    isLoading,
    availableHeroes,

    // Computed
    isSelectionComplete,
    heroesNeeded,
    selectionMessage,
    hasEnoughHeroes,

    // Methods
    toggleHeroSelection,
    isHeroSelected,
    clearSelection,
    loadHeroes
  }
}
