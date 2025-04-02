<script setup lang="ts">
import { ArrowRightIcon } from '@heroicons/vue/24/outline'
import { useI18n } from 'vue-i18n'
import theHeroSvg from '@/assets/images/undraw_be-the-hero_bce0.svg'
import superWomanSvg from '@/assets/images/undraw_super-woman_6nx2.svg'

const { t } = useI18n()
</script>

<template>
  <main class="home-view max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
    <h1 class="text-4xl font-karla mb-6 text-primary-600 dark:text-primary-400">
      {{ t('home.title') }}
    </h1>
    <p class="text-xl mb-8 text-gray-600 dark:text-gray-300">
      {{ t('home.subtitle') }}
    </p>

    <div class="grid md:grid-cols-2 gap-8 mb-12">
      <div
        class="welcome-item__heroes bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4"
      >
        <h2 class="text-2xl font-karla text-primary-600 dark:text-primary-400">
          {{ t('home.heroes.title') }}
        </h2>
        <p class="text-gray-600 dark:text-gray-300">
          {{ t('home.heroes.description') }}
        </p>
        <div class="flex justify-center py-4">
          <img :src="superWomanSvg" class="w-48 h-48" :alt="t('home.heroes.title')" />
        </div>
        <div class="flex justify-center">
          <router-link
            :to="{ name: 'heroes' }"
            class="inline-flex items-center gap-2 bg-sky-500 text-white px-6 py-2 rounded-lg hover:bg-sky-600 transition-colors"
          >
            {{ t('home.heroes.action') }}
            <ArrowRightIcon class="w-4 h-4" />
          </router-link>
        </div>
      </div>

      <div
        class="welcome-item__pentathlon bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4"
      >
        <h2 class="text-2xl font-karla text-primary-600 dark:text-primary-400">
          {{ t('home.pentathlon.title') }}
        </h2>
        <p class="text-gray-600 dark:text-gray-300">
          {{ t('home.pentathlon.description') }}
        </p>
        <div class="flex justify-center py-4">
          <img :src="theHeroSvg" class="w-48 h-48" :alt="t('home.pentathlon.title')" />
        </div>
        <div class="flex justify-center">
          <router-link
            :to="{ name: 'pentathlon' }"
            class="inline-flex items-center gap-2 bg-sky-500 text-white px-6 py-2 rounded-lg hover:bg-sky-600 transition-colors"
          >
            {{ t('home.pentathlon.action') }}
            <ArrowRightIcon class="w-4 h-4" />
          </router-link>
        </div>
      </div>
    </div>
  </main>
</template>
