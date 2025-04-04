<script setup lang="ts">
import { DEFAULT_ATTRIBUTES } from '@/types/superhero'
import type { SuperheroAttributes } from '@/types/superhero'

// Use DEFAULT_ATTRIBUTES to infer the keys
const SUPERHERO_ATTRIBUTES_COUNT = Object.keys(DEFAULT_ATTRIBUTES) as (keyof SuperheroAttributes)[]
</script>

<template>
  <div
    class="superhero-compact-card-skeleton p-4 rounded-lg border border-gray-300 dark:border-gray-700 flex items-start gap-6 relative animate-pulse"
  >
    <!-- Selection circle placeholder -->
    <div
      class="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center z-10 shadow-sm bg-gray-300 dark:bg-gray-600"
      aria-hidden="true"
    >
      <div class="w-3 h-3 rounded-full border border-gray-300 dark:border-gray-600"></div>
    </div>

    <!-- Image placeholder -->
    <div class="w-24 h-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>

    <!-- Content section -->
    <div class="flex-1 space-y-2">
      <!-- Name placeholder -->
      <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>

      <!-- Attributes placeholders -->
      <div class="space-y-2">
        <div
          v-for="i in SUPERHERO_ATTRIBUTES_COUNT"
          :key="i"
          class="superhero-attribute-bar attribute-bar-compact flex items-center gap-2"
        >
          <!-- Icon placeholder -->
          <div class="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded-full flex-shrink-0"></div>
          <!-- Progress bar placeholder -->
          <div class="h-2 bg-gray-200 dark:bg-gray-800 rounded-full flex-grow"></div>
        </div>
      </div>
    </div>
  </div>
</template>
