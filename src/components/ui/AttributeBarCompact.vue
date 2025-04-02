<!-- AttributeBarCompact.vue -->
<script setup lang="ts">
// External libraries
import {
  BoltIcon,
  HandRaisedIcon,
  ScaleIcon,
  ShieldExclamationIcon,
  SparklesIcon
} from '@heroicons/vue/24/solid'
// Types
import type { SuperheroAttribute } from '@/types/superhero'

const props = defineProps<{
  label: string
  value: number
  type?: SuperheroAttribute
  showLabel?: boolean
}>()

// Icon map based on attribute type
const iconMap = {
  agility: BoltIcon,
  strength: HandRaisedIcon,
  weight: ScaleIcon,
  endurance: ShieldExclamationIcon,
  charisma: SparklesIcon
} as const

// Determine which icon to show based on type or try to infer it from the label
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
  <div class="attribute-bar-compact flex items-center gap-2">
    <!-- Attribute icon -->
    <component
      :is="getIcon()"
      class="attribute-bar-compact__icon w-4 h-4 flex-shrink-0 text-gray-600 dark:text-gray-400"
      :title="label"
    />

    <!-- Label (optional) -->
    <span
      v-if="showLabel"
      class="attribute-bar-compact__label text-xs font-medium dark:text-gray-300 w-16 truncate"
      >{{ label }}</span
    >

    <!-- Progress bar and value -->
    <div
      class="attribute-bar-compact__bar-container flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
    >
      <div
        class="attribute-bar-compact__bar h-full bg-sky-500 dark:bg-sky-600 transition-all duration-300 ease-out"
        :style="{ width: `${(value / 10) * 100}%` }"
      />
    </div>
  </div>
</template>
