<!-- MainNavigation.vue -->
<script setup lang="ts">
// Vue core
import { ref, computed } from 'vue'
// External libraries
import { StarIcon } from '@heroicons/vue/24/solid'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
// Components
import LanguageSelector from './LanguageSelector.vue'
import ThemeToggler from './ThemeToggler.vue'

const { t } = useI18n()
const router = useRouter()
const isMenuOpen = ref(false)

// Automatically get navigation items from router routes
const navigationItems = computed(() => {
  // Filter routes that should appear in the navigation
  return router.options.routes
    .filter(route => {
      // Include only routes that have a name and are not the home or notFound route
      return route.name && route.name !== 'home' && route.name !== 'notFound'
    })
    .map(route => ({
      key: String(route.name), // Use the route name as the key for translations
      name: String(route.name) // Use the route name for navigation
    }))
})
</script>

<template>
  <nav class="main-navigation bg-sky-100 dark:bg-sky-900 shadow-lg">
    <div class="main-navigation__container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="main-navigation__content flex items-center justify-between h-16">
        <!-- Logo and links -->
        <div class="main-navigation__left flex items-center">
          <div class="main-navigation__logo flex-shrink-0">
            <router-link
              :to="{ name: 'home' }"
              class="flex items-center gap-2 text-xl font-bold text-gray-800 dark:text-white"
            >
              <div class="relative">
                <StarIcon
                  class="h-12 w-12 text-sky-500 dark:text-white opacity-30 rotating-star"
                />
              </div>
              <span class="hidden sm:inline">{{ t('navigation.brand') }}</span>
            </router-link>
          </div>
          <div class="main-navigation__menu hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <router-link
                v-for="item in navigationItems"
                :key="item.name"
                :to="{ name: item.name }"
                class="px-3 py-2 rounded-md text-sm font-medium"
                :class="[
                  $route.name === item.name
                    ? 'bg-sky-500 text-white'
                    : 'text-gray-800 dark:text-white hover:bg-sky-200 dark:hover:bg-sky-800'
                ]"
                :aria-current="$route.name === item.name ? 'page' : undefined"
              >
                {{ t(`navigation.menu.${item.key}`) }}
              </router-link>
            </div>
          </div>
        </div>

        <!-- Controls (Theme and Language) -->
        <div class="main-navigation__right flex items-center gap-4">
          <ThemeToggler />
          <LanguageSelector />

          <!-- Mobile menu -->
          <div class="main-navigation__mobile-toggle md:hidden">
            <button
              type="button"
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-800 dark:text-white hover:bg-sky-200 dark:hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
              :aria-expanded="isMenuOpen"
              @click="isMenuOpen = !isMenuOpen"
              :aria-label="t('navigation.aria.toggleMenu')"
            >
              <svg
                class="h-6 w-6"
                :class="{ hidden: isMenuOpen, block: !isMenuOpen }"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                class="h-6 w-6"
                :class="{ block: isMenuOpen, hidden: !isMenuOpen }"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Expanded mobile menu -->
      <div
        class="main-navigation__mobile-menu md:hidden"
        :class="{ block: isMenuOpen, hidden: !isMenuOpen }"
        role="dialog"
        :aria-modal="isMenuOpen"
        :aria-label="t('navigation.aria.mobileMenu')"
      >
        <div class="main-navigation__mobile-links px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <router-link
            v-for="item in navigationItems"
            :key="item.name"
            :to="{ name: item.name }"
            class="block px-3 py-2 rounded-md text-base font-medium"
            :class="[
              $route.name === item.name
                ? 'bg-sky-500 text-white'
                : 'text-gray-800 dark:text-white hover:bg-sky-200 dark:hover:bg-sky-800'
            ]"
            :aria-current="$route.name === item.name ? 'page' : undefined"
            @click="isMenuOpen = false"
          >
            {{ t(`navigation.menu.${item.key}`) }}
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.rotating-star {
  animation: rotate 20s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
