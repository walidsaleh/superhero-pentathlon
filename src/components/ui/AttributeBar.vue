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
// Types
import type { SuperheroAttribute } from '@/types/superhero'
import { STAT_LIMITS } from '@/types/superhero'

const { t } = useI18n()

// Define props
const props = defineProps<{
  value: number
  type: SuperheroAttribute
  compact?: boolean // Optional prop to toggle compact mode
}>()

// Icon map based on attribute type
const iconMap = {
  agility: BoltIcon,
  strength: HandRaisedIcon,
  weight: ScaleIcon,
  endurance: ShieldExclamationIcon,
  charisma: SparklesIcon
} as const

// Computed icon component based on the type prop
const iconComponent = computed(() => {
  return iconMap[props.type]
})

// Computed label based on the type prop
const label = computed(() => {
  return t(`form.attributes.stats.${props.type}`)
})

// Define min and max values for the attribute bar
const MIN_VALUE = STAT_LIMITS.MIN
const MAX_VALUE = STAT_LIMITS.MAX
</script>

<template>
  <div
    :class="{
      'superhero-attribute-bar': true,
      'attribute-bar-compact flex items-center gap-2': compact,
      'flex flex-col gap-1 w-full': !compact
    }"
  >
    <template v-if="compact">
      <component
        :is="iconComponent"
        class="w-4 h-4 flex-shrink-0 text-gray-600 dark:text-gray-400"
      />
      <span class="sr-only">{{ label }}</span>
    </template>
    <div v-else class="flex justify-between text-sm">
      <div class="flex items-center gap-2">
        <component :is="iconComponent" class="w-4 h-4 text-gray-600 dark:text-gray-400" />
        <span class="font-medium dark:text-gray-300">{{ label }}</span>
      </div>
      <span class="text-sky-600 dark:text-sky-400 font-bold">{{ value }}/{{ MAX_VALUE }}</span>
    </div>

    <progress
      :value="value"
      :min="MIN_VALUE"
      :max="MAX_VALUE"
      :aria-label="`${label}: ${value}/${MAX_VALUE}`"
      class="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden appearance-none [&::-webkit-progress-bar]:bg-gray-200 dark:[&::-webkit-progress-bar]:bg-gray-800 [&::-webkit-progress-value]:bg-sky-500 [&::-moz-progress-bar]:bg-sky-500"
    />
  </div>
</template>
