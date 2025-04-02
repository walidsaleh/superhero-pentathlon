<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { i18n, setLocale } from '@/i18n'

const { t, locale } = useI18n()
const isOpen = ref(false)

type LocaleCode = (typeof i18n.global.availableLocales)[number]

const currentLocale = computed(() => locale.value as LocaleCode)
const availableLocales = i18n.global.availableLocales as LocaleCode[]

const getLocaleName = (locale: LocaleCode) => {
  return new Intl.DisplayNames([locale], { type: 'language' }).of(locale) || locale
}

const localeNames = availableLocales.reduce(
  (acc, locale) => {
    acc[locale] = getLocaleName(locale)
    return acc
  },
  {} as Record<LocaleCode, string>
)

const changeLocale = (newLocale: LocaleCode) => {
  setLocale(newLocale)
  isOpen.value = false
}

// Close menu when clicking outside
const closeOnClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.closest('.relative')) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeOnClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', closeOnClickOutside)
})
</script>

<template>
  <div class="language-selector relative">
    <button
      type="button"
      class="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-800 dark:text-white hover:bg-sky-200 dark:hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
      :aria-label="t('language.label')"
      :aria-expanded="isOpen"
      @click="isOpen = !isOpen"
    >
      <span class="text-sm uppercase">{{ currentLocale }}</span>
      <svg
        class="w-4 h-4"
        :class="{ 'rotate-180': isOpen }"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <div
      v-if="isOpen"
      class="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-sky-50 dark:bg-sky-950 ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
      role="menu"
      :aria-label="t('language.label')"
    >
      <div class="py-1" role="none">
        <button
          v-for="locale in availableLocales"
          :key="locale"
          type="button"
          class="w-full text-left px-4 py-2 text-sm text-gray-800 dark:text-white hover:bg-sky-200 dark:hover:bg-sky-800 focus:outline-none focus:bg-sky-200 dark:focus:bg-sky-800"
          role="menuitem"
          :aria-current="currentLocale === locale"
          @click="changeLocale(locale)"
        >
          <span class="capitalize">{{ localeNames[locale] }}</span>
        </button>
      </div>
    </div>
  </div>
</template>
