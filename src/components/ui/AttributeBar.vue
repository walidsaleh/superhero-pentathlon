<script setup lang="ts">
// External libraries
import { computed } from 'vue'
import {
  BoltIcon,
  HandRaisedIcon,
  ScaleIcon,
  ShieldExclamationIcon,
  SparklesIcon
} from '@heroicons/vue/24/solid'
import { useI18n } from 'vue-i18n'
// Import the SuperheroAttributes type
import type { SuperheroAttributes } from '@/types/superhero'

const { t } = useI18n()

// Define props
const props = defineProps<{
  value: number
  type: keyof SuperheroAttributes // Infer the type keys dynamically
}>()

// Labels map
const labels = {
  agility: t('form.attributes.stats.agility'),
  strength: t('form.attributes.stats.strength'),
  weight: t('form.attributes.stats.weight'),
  endurance: t('form.attributes.stats.endurance'),
  charisma: t('form.attributes.stats.charisma')
}

// Computed label based on the type prop
const label = computed(() => labels[props.type])

// Icon map based on attribute type
const iconMap = {
  agility: BoltIcon,
  strength: HandRaisedIcon,
  weight: ScaleIcon,
  endurance: ShieldExclamationIcon,
  charisma: SparklesIcon
} as const

// Determine the icon to display based on the type
const getIcon = () => {
  return iconMap[props.type]
}
</script>

<template>
  <div class="superhero-attribute-bar space-y-1">
    <div class="flex justify-between text-sm">
      <div class="flex items-center gap-2">
        <component
          :is="getIcon()"
          class="w-4 h-4 text-gray-600 dark:text-gray-400"
          :title="label"
        />
        <span class="font-medium dark:text-gray-300">{{ label }}</span>
      </div>
      <span class="text-sky-600 dark:text-sky-400 font-bold">{{ value }}/10</span>
    </div>
    <div class="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
      <div
        class="h-full bg-sky-500 dark:bg-sky-600 transition-all duration-300 ease-out"
        :style="{ width: `${(value / 10) * 100}%` }"
      />
    </div>
  </div>
</template>
