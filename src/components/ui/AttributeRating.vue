<!-- AttributeRating.vue -->
<script setup lang="ts">
defineProps<{
  label: string
  modelValue: number
}>()

defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()
</script>

<template>
  <div class="attribute-rating space-y-2">
    <div class="flex justify-between items-center">
      <label class="text-sm font-medium dark:text-gray-300">{{ label }}</label>
      <span class="text-lg font-bold text-primary-500 dark:text-primary-400">{{ modelValue }}</span>
    </div>
    <div class="flex gap-1">
      <button
        v-for="n in 11"
        :key="n"
        type="button"
        @click="$emit('update:modelValue', n - 1)"
        class="w-6 h-6 rounded-full transition-all duration-200 flex items-center justify-center"
        :class="[
          n - 1 <= modelValue
            ? 'bg-primary-500 text-white hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700'
            : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600'
        ]"
      >
        <span class="text-xs">{{ n - 1 }}</span>
      </button>
    </div>
  </div>
</template>
