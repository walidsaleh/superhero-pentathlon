<script setup lang="ts">
import { computed } from 'vue'
import { CheckIcon } from '@heroicons/vue/24/solid'
import { useI18n } from 'vue-i18n'
import AttributeBarCompact from '@/components/ui/AttributeBarCompact.vue'
import type { Superhero } from '@/types/superhero'

const { t } = useI18n()

const props = defineProps<{
  hero: Superhero
  selectedHeroes: string[]
  maxSelections: number
  enoughHeroes?: boolean
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'toggle', id: string): void
}>()

const isSelected = computed(() => props.selectedHeroes.includes(props.hero.id))
const canBeSelected = computed(() => {
  // Cannot be selected if disabled
  if (props.disabled) return false

  // Cannot be selected if maximum selections reached
  if (props.selectedHeroes.length >= props.maxSelections) return false

  // Cannot be selected if not enough heroes available
  if (props.enoughHeroes === false) return false

  // In any other case, it can be selected
  return true
})

// Handle click on the card
const handleClick = () => {
  console.log(
    'Card clicked:',
    props.hero.id,
    'Can be selected:',
    canBeSelected.value,
    'Is selected:',
    isSelected.value
  )

  // Only emit the event if the card can be selected or is already selected
  if (canBeSelected.value || isSelected.value) {
    console.log('Emitting toggle event for hero:', props.hero.id)
    emit('toggle', props.hero.id)
  }
}
</script>

<template>
  <div
    class="superhero-compact-card p-4 border rounded-lg border-gray-300 dark:border-gray-700 flex items-start gap-6 relative"
    :class="{
      'border-sky-500 dark:border-sky-400 bg-sky-50 dark:bg-sky-900/20 cursor-pointer hover:border-sky-600 dark:hover:border-sky-500':
        isSelected,
      'hover:border-sky-300 dark:hover:border-sky-600 cursor-pointer': !isSelected && canBeSelected,
      'opacity-60 bg-gray-50 dark:bg-gray-800/50': !isSelected && !canBeSelected
    }"
    @click="handleClick"
    :title="!canBeSelected && !isSelected ? t('pages.pentathlon.selection.notEnoughHeroes') : ''"
  >
    <!-- Selection circle with check icon or empty (only if selected or can be selected) -->
    <div
      v-if="isSelected || canBeSelected"
      class="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center z-10 shadow-sm"
      :class="{
        'bg-sky-500 dark:bg-sky-400': isSelected,
        'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600':
          !isSelected && canBeSelected
      }"
      aria-hidden="true"
    >
      <CheckIcon v-if="isSelected" class="h-4 w-4 text-white" />
      <div
        v-else-if="canBeSelected"
        class="w-3 h-3 rounded-full border border-gray-300 dark:border-gray-600"
      ></div>
    </div>

    <img
      :src="hero.image"
      :alt="hero.name"
      class="w-24 h-24 rounded-full object-cover mt-8 mb-2 border-2 border-gray-300 dark:border-gray-600"
    />
    <div class="flex-1 space-y-2">
      <h3 class="text-base font-semibold dark:text-white font-karla pl-6">
        {{ hero.name }}
      </h3>
      <AttributeBarCompact
        :label="t('form.attributes.stats.agility')"
        :value="hero.attributes.agility"
        type="agility"
      />
      <AttributeBarCompact
        :label="t('form.attributes.stats.strength')"
        :value="hero.attributes.strength"
        type="strength"
      />
      <AttributeBarCompact
        :label="t('form.attributes.stats.weight')"
        :value="hero.attributes.weight"
        type="weight"
      />
      <AttributeBarCompact
        :label="t('form.attributes.stats.endurance')"
        :value="hero.attributes.endurance"
        type="endurance"
      />
      <AttributeBarCompact
        :label="t('form.attributes.stats.charisma')"
        :value="hero.attributes.charisma"
        type="charisma"
      />
    </div>
  </div>
</template>
