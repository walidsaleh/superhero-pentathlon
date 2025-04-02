<script setup lang="ts">
// Vue core
import { onMounted } from 'vue'
// External libraries
import {
  ArrowUturnLeftIcon,
  ChartBarIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/vue/24/solid'
// Vue ecosystem
import { useI18n } from 'vue-i18n'
// Components
import SuperheroCompactCard from '@/components/heroes/SuperheroCompactCard.vue'
import SuperheroCompactCardSkeleton from '@/components/heroes/SuperheroCompactCardSkeleton.vue'
import PodiumDisplay from '@/components/podium/PodiumDisplay.vue'
import EventResultsDialog from '@/components/results/EventResultsDialog.vue'
// Composables
import { useCompetition, useAnimation } from '@/composables'

// Use composables
const { t } = useI18n()

// Competition composable
const {
  selectedHeroes,
  competitionStarted,
  showEventResults,
  isLoading,
  availableHeroes,
  events,
  eventResults,
  finalRankings,
  selectionMessage,
  REQUIRED_HEROES,
  toggleHeroSelection,
  startCompetition,
  resetCompetition,
  getHeroName,
  getHeroById,
  loadHeroes
} = useCompetition()

// Animation composable
const { showThirdPlace, showSecondPlace, showFirstPlace, resetAnimations, animatePodium } =
  useAnimation()

// Load heroes when component is mounted
onMounted(async () => {
  await loadHeroes()
})

// Handle reset button click
const handleReset = () => {
  resetCompetition()
  resetAnimations()
}

// Start competition and trigger animations
const handleStartCompetition = () => {
  startCompetition()
  animatePodium()
}
</script>

<template>
  <div class="pentathlon-view container mx-auto py-8 px-4">
    <h1 class="text-3xl font-bold mb-8">{{ t('pages.pentathlon.title') }}</h1>

    <!-- Hero Selection Section -->
    <div v-if="!competitionStarted" class="mb-8">
      <div
        v-if="availableHeroes.length < REQUIRED_HEROES"
        class="flex justify-between items-center mb-4"
      >
        <p class="mt-1">
          {{ t('pages.pentathlon.selection.notEnoughHeroes', { required: REQUIRED_HEROES }) }}
        </p>
        <!-- Go to heroes page button -->
        <router-link
          :to="{ name: 'heroes' }"
          class="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700 flex items-center gap-2"
        >
          {{ t('pages.pentathlon.actions.goToHeroesPage') }}
          <ArrowTopRightOnSquareIcon class="h-5 w-5" />
        </router-link>
      </div>

      <div v-else class="flex justify-between items-center mb-4">
        <p class="mt-1">{{ selectionMessage }}</p>
        <!-- Start competition button -->
        <button
          @click="handleStartCompetition"
          class="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          :disabled="selectedHeroes.length !== REQUIRED_HEROES"
        >
          {{ t('pages.pentathlon.actions.start') }}
        </button>
      </div>

      <!-- Loading state -->
      <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SuperheroCompactCardSkeleton v-for="n in REQUIRED_HEROES" :key="n" />
      </div>

      <!-- Hero selection grid when there are enough heroes -->
      <div
        v-else-if="availableHeroes.length >= REQUIRED_HEROES"
        class="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <SuperheroCompactCard
          v-for="hero in availableHeroes"
          :key="hero.id"
          :hero
          :selected-heroes="selectedHeroes"
          :max-selections="REQUIRED_HEROES"
          :enough-heroes="true"
          @toggle="toggleHeroSelection"
        />
      </div>

      <!-- Hero selection grid when there are not enough heroes -->
      <div v-else-if="availableHeroes.length > 0" class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SuperheroCompactCard
          v-for="hero in availableHeroes"
          :key="hero.id"
          :hero
          :selected-heroes="selectedHeroes"
          :max-selections="REQUIRED_HEROES"
          :enough-heroes="false"
          :disabled="true"
          @toggle="toggleHeroSelection"
        />
      </div>
    </div>

    <!-- Competition Results Section -->
    <div v-else class="mb-8">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-semibold">{{ t('pages.pentathlon.results.title') }}</h2>
        <div class="flex space-x-2">
          <button
            @click="handleReset"
            class="flex items-center px-3 py-1.5 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            <ArrowUturnLeftIcon class="w-5 h-5 mr-2" />
            {{ t('pages.pentathlon.actions.reset') }}
          </button>
          <button
            @click="() => (showEventResults = true)"
            class="flex items-center px-3 py-1.5 bg-sky-600 text-white rounded hover:bg-sky-700"
          >
            <ChartBarIcon class="w-5 h-5 mr-2" />
            {{ t('pages.pentathlon.actions.viewDetails') }}
          </button>
        </div>
      </div>

      <!-- Podium Display -->
      <PodiumDisplay
        :final-rankings="finalRankings"
        :show-first-place="showFirstPlace"
        :show-second-place="showSecondPlace"
        :show-third-place="showThirdPlace"
        :get-hero-name="getHeroName"
        :get-hero-by-id="getHeroById"
      />

      <!-- Event Results Dialog -->
      <EventResultsDialog
        :show="showEventResults"
        :event-results="eventResults"
        :events="events"
        :get-hero-name="getHeroName"
        :get-hero-by-id="getHeroById"
        :on-close="() => (showEventResults = false)"
      />
    </div>
  </div>
</template>
