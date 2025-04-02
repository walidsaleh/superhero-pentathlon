<script setup lang="ts">
import { TrashIcon } from '@heroicons/vue/24/outline'
import { useI18n } from 'vue-i18n'
import type { Superhero } from '@/types/superhero'

defineProps<{
  superhero: Superhero
}>()

defineEmits<{
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()

const { t } = useI18n()
</script>

<template>
  <div>
    <div
      class="delete-confirmation flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700"
    >
      <h2 class="text-2xl font-karla dark:text-white">{{ t('common.confirmDeletion') }}</h2>
      <button
        @click="$emit('cancel')"
        class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl leading-none cursor-pointer"
      >
        ×
      </button>
    </div>
    <div class="p-6">
      <div class="flex gap-6">
        <div class="w-24 h-24 flex-shrink-0">
          <img
            :src="superhero.image"
            :alt="superhero.name"
            class="w-full h-full object-cover rounded-full shadow-md"
          />
        </div>
        <div class="flex-1">
          <div class="space-y-2">
            <h3 class="text-lg font-semibold dark:text-white">{{ superhero.name }}</h3>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
              {{ t('dialog.delete.confirmation', { name: superhero.name }) }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="border-t border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-end space-x-4">
      <button
        @click="$emit('cancel')"
        class="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors duration-200 cursor-pointer"
      >
        {{ t('common.cancel') }}
      </button>
      <button
        @click="$emit('confirm')"
        class="px-6 py-2.5 bg-pink-500 hover:bg-pink-600 text-white rounded-lg dark:bg-pink-700 dark:hover:bg-pink-800 transition-colors duration-200 flex items-center gap-2 cursor-pointer"
      >
        <TrashIcon class="h-5 w-5" />
        <span>{{ t('common.delete') }}</span>
      </button>
    </div>
  </div>
</template>
