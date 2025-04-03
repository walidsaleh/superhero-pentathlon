<script setup lang="ts">
// External libraries
import { StarIcon } from '@heroicons/vue/24/solid'
// Vue ecosystem
import { useI18n } from 'vue-i18n'
// Types
import type { Superhero } from '@/types/superhero'
import type { FinalRanking } from '@/utils/competition'
// Utils
import { getRandomConfettiColor, MAX_CONFETTIS } from '@/utils/animation'

defineProps({
  finalRankings: {
    type: Array as () => FinalRanking[],
    required: true
  },
  showFirstPlace: {
    type: Boolean,
    default: false
  },
  showSecondPlace: {
    type: Boolean,
    default: false
  },
  showThirdPlace: {
    type: Boolean,
    default: false
  },
  getHeroName: {
    type: Function as unknown as () => (id: string) => string,
    required: true
  },
  getHeroById: {
    type: Function as unknown as () => (id: string) => Superhero | undefined,
    required: true
  }
})

const { t } = useI18n()

// Function to get position text
const getPositionText = (position: number): string => {
  return position.toString()
}
</script>

<template>
  <div
    class="podium-display bg-sky-50 dark:bg-sky-900/20 rounded-lg shadow p-6 relative overflow-hidden"
  >
    <!-- Confetti animation -->
    <div class="confetti-container">
      <div
        v-for="n in MAX_CONFETTIS"
        :key="n"
        class="confetti"
        :style="{
          '--fall-delay': `${Math.random() * 5}s`,
          '--fall-duration': `${3 + Math.random() * 5}s`,
          '--left-pos': `${Math.random() * 100}%`,
          '--bg-color': getRandomConfettiColor()
        }"
      ></div>
    </div>

    <h2 class="text-2xl font-bold text-center sr-only font-karla">
      {{ $t('pages.pentathlon.scoring.finalRankings') }}
    </h2>

    <!-- Desktop version -->
    <div class="hidden md:flex justify-center items-end space-x-4 my-8">
      <!-- Second Place -->
      <div
        v-if="finalRankings[1]"
        class="flex flex-col items-center justify-end pb-4 podium-item"
        :class="{ 'animate-podium': showSecondPlace }"
      >
        <div class="relative flex flex-col items-center mb-4">
          <div class="relative">
            <img
              :src="getHeroById(finalRankings[1].superheroId)?.image"
              :alt="getHeroName(finalRankings[1].superheroId)"
              class="w-24 h-24 rounded-full object-cover mb-2 border-4 border-pink-300 dark:border-pink-700"
            />
            <div
              class="absolute top-0 right-0 bg-pink-300 dark:bg-pink-700 rounded-full p-1 shadow-md"
              style="
                width: 32px;
                height: 32px;
                display: flex;
                align-items: center;
                justify-content: center;
              "
            >
              <StarIcon class="h-5 w-5 text-pink-600 dark:text-white" />
            </div>
          </div>
          <p class="font-medium font-karla text-lg mb-1 max-w-[180px] truncate text-center">
            {{ getHeroName(finalRankings[1].superheroId) }}
          </p>
          <p class="text-base font-bold max-w-[180px] truncate text-center">
            {{ t('pages.pentathlon.scoring.silver') }} • {{ finalRankings[1].totalPoints }}
            {{ t('pages.pentathlon.scoring.points') }}
          </p>
        </div>
        <div
          class="w-64 h-32 bg-pink-300 dark:bg-pink-700 rounded-t-lg flex flex-col justify-end items-center text-pink-800 dark:text-white relative overflow-hidden"
        >
          <p class="text-4xl font-bold pb-4" v-html="getPositionText(2)"></p>
        </div>
      </div>

      <!-- First Place -->
      <div
        v-if="finalRankings[0]"
        class="flex flex-col items-center justify-end pb-4 podium-item"
        :class="{ 'animate-podium': showFirstPlace }"
      >
        <div class="relative flex flex-col items-center mb-4">
          <div class="relative">
            <img
              :src="getHeroById(finalRankings[0].superheroId)?.image"
              :alt="getHeroName(finalRankings[0].superheroId)"
              class="w-24 h-24 rounded-full object-cover mb-2 border-4 border-purple-200 dark:border-purple-600"
            />
            <div
              class="absolute top-0 right-0 bg-purple-200 dark:bg-purple-600 rounded-full p-1 shadow-md"
              style="
                width: 32px;
                height: 32px;
                display: flex;
                align-items: center;
                justify-content: center;
              "
            >
              <StarIcon class="h-5 w-5 text-purple-600 dark:text-white" />
            </div>
          </div>
          <p class="font-medium font-karla text-lg mb-1 max-w-[180px] truncate text-center">
            {{ getHeroName(finalRankings[0].superheroId) }}
          </p>
          <p class="text-base font-bold max-w-[180px] truncate text-center">
            {{ t('pages.pentathlon.scoring.gold') }} • {{ finalRankings[0].totalPoints }}
            {{ t('pages.pentathlon.scoring.points') }}
          </p>
        </div>
        <div
          class="w-64 h-44 bg-purple-200 dark:bg-purple-600 rounded-t-lg flex flex-col justify-end items-center text-purple-700 dark:text-white relative overflow-hidden"
        >
          <p class="text-4xl font-bold pb-4" v-html="getPositionText(1)"></p>
        </div>
      </div>

      <!-- Third Place -->
      <div
        v-if="finalRankings[2]"
        class="flex flex-col items-center justify-end pb-4 podium-item"
        :class="{ 'animate-podium': showThirdPlace }"
      >
        <div class="relative flex flex-col items-center mb-4">
          <div class="relative">
            <img
              :src="getHeroById(finalRankings[2].superheroId)?.image"
              :alt="getHeroName(finalRankings[2].superheroId)"
              class="w-24 h-24 rounded-full object-cover mb-2 border-4 border-lime-300 dark:border-lime-700"
            />
            <div
              class="absolute top-0 right-0 bg-lime-300 dark:bg-lime-700 rounded-full p-1 shadow-md"
              style="
                width: 32px;
                height: 32px;
                display: flex;
                align-items: center;
                justify-content: center;
              "
            >
              <StarIcon class="h-5 w-5 text-lime-600 dark:text-white" />
            </div>
          </div>
          <p class="font-medium font-karla text-lg mb-1 max-w-[180px] truncate text-center">
            {{ getHeroName(finalRankings[2].superheroId) }}
          </p>
          <p class="text-base font-bold max-w-[180px] truncate text-center">
            {{ t('pages.pentathlon.scoring.bronze') }} • {{ finalRankings[2].totalPoints }}
            {{ t('pages.pentathlon.scoring.points') }}
          </p>
        </div>
        <div
          class="w-64 h-24 bg-lime-300 dark:bg-lime-700 rounded-t-lg flex flex-col justify-end items-center text-lime-700 dark:text-white relative overflow-hidden"
        >
          <p class="text-4xl font-bold pb-4" v-html="getPositionText(3)"></p>
        </div>
      </div>
    </div>

    <!-- Mobile version -->
    <div class="md:hidden flex flex-col items-center space-y-8 my-8">
      <!-- First Place (mobile) -->
      <div
        v-if="finalRankings[0]"
        class="flex flex-col items-center pb-4 podium-item w-full max-w-xs"
        :class="{ 'animate-podium': showFirstPlace }"
      >
        <div class="relative flex flex-col items-center mb-4">
          <div class="relative">
            <img
              :src="getHeroById(finalRankings[0].superheroId)?.image"
              :alt="getHeroName(finalRankings[0].superheroId)"
              class="w-24 h-24 rounded-full object-cover mb-2 border-4 border-purple-200 dark:border-purple-600"
            />
            <div
              class="absolute top-0 right-0 bg-purple-200 dark:bg-purple-600 rounded-full p-1 shadow-md"
              style="
                width: 32px;
                height: 32px;
                display: flex;
                align-items: center;
                justify-content: center;
              "
            >
              <StarIcon class="h-5 w-5 text-purple-600 dark:text-white" />
            </div>
          </div>
          <p class="font-medium font-karla text-lg mb-1 max-w-[180px] truncate text-center">
            {{ getHeroName(finalRankings[0].superheroId) }}
          </p>
          <p class="text-base font-bold max-w-[180px] truncate text-center">
            {{ t('pages.pentathlon.scoring.gold') }} • {{ finalRankings[0].totalPoints }}
            {{ t('pages.pentathlon.scoring.points') }}
          </p>
        </div>
        <div
          class="w-full h-16 bg-purple-200 dark:bg-purple-600 rounded-t-lg flex items-center justify-center text-purple-700 dark:text-white relative overflow-hidden"
        >
          <span class="text-xl font-bold"
            >{{ t('pages.pentathlon.scoring.gold') }}
            <span v-html="`(${getPositionText(1)})`"></span
          ></span>
        </div>
      </div>

      <!-- Second Place (mobile) -->
      <div
        v-if="finalRankings[1]"
        class="flex flex-col items-center pb-4 podium-item w-full max-w-xs"
        :class="{ 'animate-podium': showSecondPlace }"
      >
        <div class="relative flex flex-col items-center mb-4">
          <div class="relative">
            <img
              :src="getHeroById(finalRankings[1].superheroId)?.image"
              :alt="getHeroName(finalRankings[1].superheroId)"
              class="w-24 h-24 rounded-full object-cover mb-2 border-4 border-pink-300 dark:border-pink-700"
            />
            <div
              class="absolute top-0 right-0 bg-pink-300 dark:bg-pink-700 rounded-full p-1 shadow-md"
              style="
                width: 32px;
                height: 32px;
                display: flex;
                align-items: center;
                justify-content: center;
              "
            >
              <StarIcon class="h-5 w-5 text-pink-600 dark:text-white" />
            </div>
          </div>
          <p class="font-medium font-karla text-lg mb-1 max-w-[180px] truncate text-center">
            {{ getHeroName(finalRankings[1].superheroId) }}
          </p>
          <p class="text-base font-bold max-w-[180px] truncate text-center">
            {{ t('pages.pentathlon.scoring.silver') }} • {{ finalRankings[1].totalPoints }}
            {{ t('pages.pentathlon.scoring.points') }}
          </p>
        </div>
        <div
          class="w-full h-16 bg-pink-300 dark:bg-pink-700 rounded-t-lg flex items-center justify-center text-pink-800 dark:text-white relative overflow-hidden"
        >
          <span class="text-xl font-bold"
            >{{ t('pages.pentathlon.scoring.silver') }}
            <span v-html="`(${getPositionText(2)})`"></span
          ></span>
        </div>
      </div>

      <!-- Third Place (mobile) -->
      <div
        v-if="finalRankings[2]"
        class="flex flex-col items-center pb-4 podium-item w-full max-w-xs"
        :class="{ 'animate-podium': showThirdPlace }"
      >
        <div class="relative flex flex-col items-center mb-4">
          <div class="relative">
            <img
              :src="getHeroById(finalRankings[2].superheroId)?.image"
              :alt="getHeroName(finalRankings[2].superheroId)"
              class="w-24 h-24 rounded-full object-cover mb-2 border-4 border-lime-300 dark:border-lime-700"
            />
            <div
              class="absolute top-0 right-0 bg-lime-300 dark:bg-lime-700 rounded-full p-1 shadow-md"
              style="
                width: 32px;
                height: 32px;
                display: flex;
                align-items: center;
                justify-content: center;
              "
            >
              <StarIcon class="h-5 w-5 text-lime-600 dark:text-white" />
            </div>
          </div>
          <p class="font-medium font-karla text-lg mb-1 max-w-[180px] truncate text-center">
            {{ getHeroName(finalRankings[2].superheroId) }}
          </p>
          <p class="text-base font-bold max-w-[180px] truncate text-center">
            {{ t('pages.pentathlon.scoring.bronze') }} • {{ finalRankings[2].totalPoints }}
            {{ t('pages.pentathlon.scoring.points') }}
          </p>
        </div>
        <div
          class="w-full h-16 bg-lime-300 dark:bg-lime-700 rounded-t-lg flex items-center justify-center text-lime-700 dark:text-white relative overflow-hidden"
        >
          <span class="text-xl font-bold"
            >{{ t('pages.pentathlon.scoring.bronze') }}
            <span v-html="`(${getPositionText(3)})`"></span
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Podium animation */
.podium-item {
  opacity: 0;
  transform: translateY(50px);
  transition:
    opacity 0.5s ease-out,
    transform 0.5s ease-out;
}

.animate-podium {
  opacity: 1;
  transform: translateY(0);
}

/* Confetti animation */
.confetti-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

.confetti {
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: var(--bg-color);
  top: -10px;
  left: var(--left-pos);
  opacity: 0;
  animation: fall var(--fall-duration) ease-in var(--fall-delay) infinite;
}

@keyframes fall {
  0% {
    opacity: 0;
    transform: translateY(0) rotate(0deg);
  }
  10% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(100vh) rotate(360deg);
  }
}
</style>
