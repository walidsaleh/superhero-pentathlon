// External libraries
import { createI18n } from 'vue-i18n'
// Translations
import en from './en.json'
import es from './es.json'

// Detectar el idioma del navegador
const getBrowserLocale = (): string => {
  const navigatorLocale = navigator.languages !== undefined 
    ? navigator.languages[0] 
    : navigator.language

  if (!navigatorLocale) return 'en'

  // Get the base language code (e.g.: 'es' from 'es-ES')
  const locale = navigatorLocale.trim().split(/-|_/)[0]
  return ['en', 'es'].includes(locale) ? locale : 'en'
}

// Obtener el idioma guardado o el del navegador
const getInitialLocale = (): string => {
  const savedLocale = localStorage.getItem('locale')
  return savedLocale || getBrowserLocale()
}

export const i18n = createI18n({
  legacy: false,
  locale: getInitialLocale(),
  fallbackLocale: 'en',
  messages: {
    en,
    es
  }
})

// Function to change the language
export const setLocale = (locale: 'en' | 'es') => {
  i18n.global.locale.value = locale
  localStorage.setItem('locale', locale)
  document.querySelector('html')?.setAttribute('lang', locale)
}
