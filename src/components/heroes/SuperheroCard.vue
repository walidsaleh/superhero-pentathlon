<script setup lang="ts">
import { PencilIcon, TrashIcon, ArrowPathIcon } from '@heroicons/vue/24/outline'
import { useI18n } from 'vue-i18n'
import AttributeBar from '@/components/ui/AttributeBar.vue'
import type { Superhero } from '@/types/superhero'

const { t } = useI18n()

defineProps<{
  hero: Superhero
  loadingDelete: string | null
}>()

defineEmits<{
  (e: 'edit', hero: Superhero): void
  (e: 'delete', hero: Superhero): void
}>()
</script>

<template>
  <div
    class="superhero-card group relative bg-white dark:bg-gray-900 rounded-lg border border-gray-300 dark:border-gray-700"
  >
    <div class="h-48 flex items-center justify-center bg-gray-50 dark:bg-gray-800 relative">
      <img
        :src="hero.image"
        :alt="hero.name"
        class="w-32 h-32 rounded-full object-cover shadow-md border-4 border-gray-300 dark:border-gray-700"
      />
      <div class="ml-auto mt-2 mr-2 absolute inset-0 flex items-start justify-end space-x-4">
        <button
          @click="$emit('delete', hero)"
          class="mr-2 opacity-50 hover:opacity-100 rounded-full transition-opacity duration-200 cursor-pointer"
          :title="t('pages.heroes.actions.delete')"
        >
          <ArrowPathIcon
            v-if="loadingDelete === hero.id"
            class="w-5 h-5 animate-spin text-gray-600 dark:text-gray-400"
          />
          <TrashIcon v-else class="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
        <button
          @click="$emit('edit', hero)"
          class="opacity-50 hover:opacity-100 rounded-full transition-opacity duration-200 cursor-pointer"
          :title="t('pages.heroes.actions.edit')"
        >
          <PencilIcon class="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
      </div>
    </div>
    <div class="p-4 space-y-4">
      <h3 class="text-lg font-bold dark:text-white font-karla">{{ hero.name }}</h3>
      <div class="space-y-2">
        <AttributeBar :value="hero.attributes.agility" type="agility" />
        <AttributeBar :value="hero.attributes.strength" type="strength" />
        <AttributeBar :value="hero.attributes.weight" type="weight" />
        <AttributeBar :value="hero.attributes.endurance" type="endurance" />
        <AttributeBar :value="hero.attributes.charisma" type="charisma" />
      </div>
    </div>
  </div>
</template>
