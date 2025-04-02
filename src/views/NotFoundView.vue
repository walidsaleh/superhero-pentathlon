<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const router = useRouter()

const goBack = () => {
  router.back()
}
</script>

<template>
  <div
    class="not-found-view min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8 text-center">
      <div>
        <h1 class="text-9xl font-extrabold text-primary-600 dark:text-primary-400">404</h1>
        <h2 class="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
          {{ t('errors.notFound.title') }}
        </h2>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {{ t('errors.notFound.description') }}
        </p>
      </div>
      <div class="mt-8 space-y-4">
        <button
          @click="goBack"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:bg-primary-700 dark:hover:bg-primary-800"
        >
          {{ t('errors.notFound.goBack') }}
        </button>
        <router-link
          to="/"
          class="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          {{ t('errors.notFound.goHome') }}
        </router-link>
      </div>
    </div>
  </div>
</template>
