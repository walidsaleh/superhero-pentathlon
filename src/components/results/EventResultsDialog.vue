<script setup lang="ts">
import { computed } from 'vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { StarIcon } from '@heroicons/vue/24/solid'
import { useI18n } from 'vue-i18n'
import type { Superhero } from '@/types/superhero'

const { t } = useI18n()

const props = defineProps<{
  show: boolean
  events: Array<{ id: string }>
  eventResults: Record<string, Array<{ superheroId: string; score: number; points: number }>>
  getHeroName: (id: string) => string
  getHeroById: (id: string) => Superhero | undefined
  onClose: () => void
}>()

const sortedResults = computed(() => {
  const sorted: Record<string, Array<{ superheroId: string; score: number; points: number }>> = {}

  for (const eventId in props.eventResults) {
    sorted[eventId] = [...props.eventResults[eventId]].sort((a, b) => {
      const nameA = props.getHeroName(a.superheroId).toLowerCase()
      const nameB = props.getHeroName(b.superheroId).toLowerCase()
      return nameA.localeCompare(nameB)
    })
  }

  return sorted
})
</script>

<template>
  <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto">
    <div
      class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity" @click="onClose">
        <div class="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
      </div>

      <div
        class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full"
      >
        <div class="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
              <div class="flex justify-between items-center mb-6">
                <h3 class="text-2xl leading-6 font-bold">
                  {{ t('pages.pentathlon.scoring.eventResults') }}
                </h3>
                <button
                  type="button"
                  class="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:text-gray-500 dark:hover:text-gray-400"
                  @click="onClose"
                >
                  <span class="sr-only">{{ t('pages.pentathlon.scoring.close') }}</span>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div class="space-y-6">
                <div v-for="(event, index) in events" :key="event.id" class="">
                  <h4 class="text-xl font-semibold mb-4">
                    {{ index + 1 }}. {{ t(`pages.pentathlon.events.${event.id}.name`) }}
                  </h4>
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div
                      v-for="result in sortedResults[event.id]"
                      :key="result.superheroId"
                      class="rounded-lg p-3 flex items-center bg-white dark:bg-gray-700 shadow-sm border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-white"
                    >
                      <!-- Hero image on the left -->
                      <div class="flex-shrink-0 mr-3">
                        <img
                          :src="getHeroById(result.superheroId)?.image"
                          :alt="getHeroName(result.superheroId)"
                          class="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-gray-800"
                        />
                      </div>
                      <!-- Hero data on the right -->
                      <div class="flex-1">
                        <p class="font-semibold text-left font-karla">
                          {{ getHeroName(result.superheroId) }}
                        </p>
                        <div class="flex justify-between items-center mt-1">
                          <p class="opacity-90 text-sm">Score: {{ result.score }}</p>
                          <div class="flex items-center">
                            <template
                              v-for="n in result.points === 5 ? 5 : result.points === 3 ? 3 : 1"
                              :key="n"
                            >
                              <StarIcon class="h-4 w-4 text-yellow-300" />
                            </template>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="border-t border-gray-200 dark:border-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
        >
          <button
            type="button"
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-sky-500 text-base font-medium text-white hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:ml-3 sm:w-auto sm:text-sm dark:bg-sky-600 dark:hover:bg-sky-700 cursor-pointer"
            @click="onClose"
          >
            {{ t('pages.pentathlon.scoring.close') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
