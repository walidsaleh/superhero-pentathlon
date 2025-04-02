<script setup lang="ts">
// External libraries
import {
  BoltIcon,
  HandRaisedIcon,
  ScaleIcon,
  ShieldExclamationIcon,
  SparklesIcon
} from '@heroicons/vue/24/solid'
import type { SuperheroAttribute } from '@/types/superhero'

const props = defineProps<{
  label: string
  value: number
  type?: SuperheroAttribute
}>()

// Icon map based on attribute type
const iconMap = {
  agility: BoltIcon,
  strength: HandRaisedIcon,
  weight: ScaleIcon,
  endurance: ShieldExclamationIcon,
  charisma: SparklesIcon
} as const

// Determine the icon to display based on the type or try to infer it from the label
const getIcon = () => {
  if (props.type && iconMap[props.type]) {
    return iconMap[props.type]
  }

  // Try to infer the type from the label (for compatibility with existing code)
  const lowerLabel = props.label.toLowerCase()
  const matchedType = Object.keys(iconMap).find((key) => lowerLabel.includes(key))

  return matchedType ? iconMap[matchedType as SuperheroAttribute] : BoltIcon // Default icon
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
