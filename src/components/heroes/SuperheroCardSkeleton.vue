<script setup lang="ts">
import { DEFAULT_ATTRIBUTES } from '@/types/superhero'
import type { SuperheroAttributes } from '@/types/superhero'

// Use DEFAULT_ATTRIBUTES to infer the keys
const SUPERHERO_ATTRIBUTES_COUNT = Object.keys(DEFAULT_ATTRIBUTES) as (keyof SuperheroAttributes)[]
</script>

<template>
  <div
    class="superhero-card-skeleton bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden animate-pulse"
  >
    <div class="relative h-48 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
      <div class="w-32 h-32 rounded-full bg-gray-300 dark:bg-gray-600"></div>
    </div>
    <div class="p-4 space-y-4">
      <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
      <div class="space-y-2">
        <div v-for="i in SUPERHERO_ATTRIBUTES_COUNT" :key="i" class="flex items-center space-x-2">
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded flex-grow"></div>
        </div>
      </div>
    </div>
  </div>
</template>
