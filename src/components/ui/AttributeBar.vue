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
import type { SuperheroAttributes } from '@/types/superhero'

const { t } = useI18n()

// Define props
const props = defineProps<{
  value: number
  type: keyof SuperheroAttributes
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

// Function to get the icon component based on the type prop
const getIcon = () => {
  const IconComponent = iconMap[props.type]
  return IconComponent
}

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
</script>

<template>
  <div
    :class="[
      'superhero-attribute-bar',
      compact ? 'attribute-bar-compact flex items-center gap-2' : 'space-y-1'
    ]"
  >
    <div v-if="!compact" class="flex justify-between text-sm">
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
    <component
      v-else
      :is="getIcon()"
      class="w-4 h-4 flex-shrink-0 text-gray-600 dark:text-gray-400"
      :title="label"
    />

    <span
      v-if="compact && showLabel"
      class="attribute-bar-compact__label text-xs font-medium dark:text-gray-300 w-16 truncate"
    >
      {{ label }}
    </span>

    <div
      :class="[
        compact
          ? 'attribute-bar-compact__bar-container flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden'
          : 'h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden'
      ]"
    >
      <div
        class="h-full bg-sky-500 dark:bg-sky-600 transition-all duration-300 ease-out"
        :style="{ width: `${(value / 10) * 100}%` }"
      />
    </div>
  </div>
</template>
