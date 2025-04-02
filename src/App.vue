<script setup lang="ts">
// Vue core
import { watch } from 'vue'
// External libraries
import { useI18n } from 'vue-i18n'
import { RouterView } from 'vue-router'
// Components
import MainNavigation from '@/components/layout/MainNavigation.vue'
import ToastContainer from '@/components/ui/ToastContainer.vue'
// Composables
import { useTheme } from '@/composables/useTheme'

const { t, locale } = useI18n()

// Initialize theme
useTheme()

// Update the title when language changes
watch(
  locale,
  () => {
    document.title = t('app.title')
  },
  { immediate: true }
)
</script>

<template>
  <div
    class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200 font-inconsolata"
  >
    <MainNavigation />
    <main class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <RouterView />
    </main>
    <ToastContainer />
  </div>
</template>
