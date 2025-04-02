<script setup lang="ts">
// Importamos SuperheroAttributes para inferir los atributos
import type { SuperheroAttributes } from '@/types/superhero'
// No props needed

// Get the number of attributes directly from the SuperheroAttributes type
const SUPERHERO_ATTRIBUTES_COUNT = Object.keys({} as SuperheroAttributes).length
</script>

<template>
  <div
    class="superhero-compact-card-skeleton p-4 border rounded-lg dark:border-gray-700 flex items-start gap-6 relative animate-pulse"
  >
    <!-- Selection circle skeleton -->
    <div
      class="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center z-10 shadow-sm"
    ></div>

    <!-- Avatar skeleton -->
    <div class="flex flex-col items-center">
      <div class="relative">
        <div class="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 mt-8 mb-2"></div>
      </div>
    </div>

    <!-- Attribute bars skeleton -->
    <div class="flex-1 space-y-2">
      <!-- Hero name -->
      <div class="w-32 h-5 bg-gray-200 dark:bg-gray-700 rounded mb-2 ml-6"></div>

      <!-- Attribute bars -->
      <div v-for="i in SUPERHERO_ATTRIBUTES_COUNT" :key="i" class="flex items-center gap-2 pl-2">
        <!-- Icon -->
        <div class="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0"></div>

        <!-- Label -->
        <div class="w-16 h-3 bg-gray-200 dark:bg-gray-700 rounded mr-2"></div>

        <!-- Progress bar -->
        <div class="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full"></div>

        <!-- Value -->
        <div class="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded ml-1"></div>
      </div>
    </div>
  </div>
</template>
