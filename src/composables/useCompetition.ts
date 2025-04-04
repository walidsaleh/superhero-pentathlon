import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSuperheroStore } from '@/stores/superhero'
import { useToastStore } from '@/stores/toast'
import type { Superhero } from '@/types/superhero'
import { useHeroSelection } from '@/composables/useHeroSelection'
import { REQUIRED_HEROES } from '@/config/constants'
import {
  type EventResults,
  type FinalRanking,
  type EventType,
  calculateEventScore as computeEventScore,
  calculateFinalRankings
} from '@/utils/competition'

/**
 * Composable for handling the pentathlon competition logic
 */
export function useCompetition() {
  const store = useSuperheroStore()
  const toastStore = useToastStore()
  const { t } = useI18n()

  // Reuse hero selection logic
  const { selectedHeroes, toggleHeroSelection, isHeroSelected } = useHeroSelection()

  // Competition state
  const competitionStarted = ref(false)
  const showEventResults = ref(false)
  const isLoading = ref(true)

  // Available heroes from the store
  const availableHeroes = computed(() => store.superheroes)

  // Events in the pentathlon
  const events: { id: EventType }[] = [
    { id: 'wallClimbing' },
    { id: 'jokeTelling' },
    { id: 'villainShot' },
    { id: 'race' },
    { id: 'catRescue' }
  ]

  // Results for each event
  const eventResults = ref<EventResults>({
    wallClimbing: [],
    jokeTelling: [],
    villainShot: [],
    race: [],
    catRescue: []
  })

  // Final rankings after all events
  const finalRankings = ref<FinalRanking[]>([])

  /**
   * Calculate the score for a specific event and hero
   */
  const calculateEventScore = (
    event: EventType,
    hero: Superhero,
    currentRanking: number,
    previousWinner?: string
  ) => {
    return computeEventScore(
      event,
      hero,
      currentRanking,
      selectedHeroes.value,
      store.getSuperheroById,
      previousWinner
    )
  }

  /**
   * Start the competition with selected heroes
   */
  const startCompetition = () => {
    competitionStarted.value = true
    let previousWinner: string | undefined

    // Initialize eventResults with a new object
    const newEventResults: EventResults = {
      wallClimbing: [],
      jokeTelling: [],
      villainShot: [],
      race: [],
      catRescue: []
    }

    events.forEach((event) => {
      const scores = selectedHeroes.value.map((heroId) => {
        const hero = store.getSuperheroById(heroId)
        if (!hero) return { superheroId: heroId, score: 0 }

        const currentRanking = finalRankings.value.findIndex((r) => r.superheroId === heroId)
        const score = calculateEventScore(event.id, hero, currentRanking, previousWinner)
        return { superheroId: heroId, score }
      })

      // Sort by score and assign points
      const sortedScores = [...scores].sort((a, b) => b.score - a.score)
      const results = sortedScores.map((score, index) => ({
        ...score,
        points: index === 0 ? 5 : index === 1 ? 3 : 1
      }))

      // Assign the results to the new object
      newEventResults[event.id] = results
      previousWinner = results[0].superheroId
    })

    // Update the reactive references
    eventResults.value = newEventResults
    finalRankings.value = calculateFinalRankings(newEventResults, selectedHeroes.value)
  }

  /**
   * Reset the competition to initial state
   */
  const resetCompetition = () => {
    competitionStarted.value = false
    showEventResults.value = false
    selectedHeroes.value = []
    eventResults.value = {
      wallClimbing: [],
      jokeTelling: [],
      villainShot: [],
      race: [],
      catRescue: []
    }
    finalRankings.value = []
  }

  /**
   * Get hero name by ID
   */
  const getHeroName = (id: string) => {
    return store.getSuperheroById(id)?.name || 'Unknown Hero'
  }

  /**
   * Get hero by ID
   */
  const getHeroById = (id: string) => {
    return store.getSuperheroById(id)
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

  // Message for hero selection
  const selectionMessage = computed(() => {
    if (selectedHeroes.value.length >= REQUIRED_HEROES) {
      return t('pages.pentathlon.selection.complete')
    } else {
      const count = REQUIRED_HEROES - selectedHeroes.value.length
      return t('pages.pentathlon.selection.more', { 0: count })
    }
  })

  return {
    // State
    selectedHeroes,
    competitionStarted,
    showEventResults,
    isLoading,
    availableHeroes,
    events,
    eventResults,
    finalRankings,
    selectionMessage,

    // Constants
    REQUIRED_HEROES,

    // Methods
    toggleHeroSelection,
    isHeroSelected,
    calculateEventScore,
    startCompetition,
    resetCompetition,
    getHeroName,
    getHeroById,
    loadHeroes
  }
}
