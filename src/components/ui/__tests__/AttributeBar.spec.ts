import { BoltIcon } from '@heroicons/vue/24/solid' // import at least one icon
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import { createI18n } from 'vue-i18n'
import AttributeBar from '../AttributeBar.vue'
import type { SuperheroAttribute } from '@/types/superhero'

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: {
      form: {
        attributes: {
          stats: {
            agility: 'Agility',
            strength: 'Strength',
            weight: 'Weight',
            endurance: 'Endurance',
            charisma: 'Charisma'
          }
        }
      }
    }
  },
  legacy: false
})

describe('AttributeBar', () => {
  const mountComponent = (
    props = { value: 5, type: 'agility' as SuperheroAttribute, compact: false }
  ) => {
    return mount(AttributeBar, {
      props,
      global: {
        plugins: [i18n]
      }
    })
  }

  it('should render correctly', () => {
    const wrapper = mountComponent()
    expect(wrapper.exists()).toBe(true)
  })

  it('should display the correct label based on the type prop', () => {
    const wrapper = mountComponent({ value: 8, type: 'strength', compact: false })
    expect(wrapper.text()).toContain('Strength')
  })

  it('should display the correct value and max value', () => {
    const wrapper = mountComponent({ value: 3, type: 'endurance', compact: false })
    expect(wrapper.text()).toContain('3/10')
  })

  it('should render a progress bar with the correct value, min, and max attributes', () => {
    const wrapper = mountComponent({ value: 7, type: 'charisma', compact: false })
    const progressBar = wrapper.find('progress')
    expect(progressBar.exists()).toBe(true)
    expect(progressBar.attributes('value')).toBe('7')
    expect(progressBar.attributes('min')).toBe('0')
    expect(progressBar.attributes('max')).toBe('10')
    expect(progressBar.attributes('aria-label')).toBe('Charisma: 7/10')
  })

  describe('compact prop', () => {
    it('should render the compact template when compact is true', async () => {
      const wrapper = mountComponent({ value: 2, type: 'agility', compact: true })

      expect(wrapper.html()).toMatchInlineSnapshot(`
        "<div class="superhero-attribute-bar flex superhero-attribute-bar--compact items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon" class="w-4 h-4 flex-shrink-0 text-gray-600 dark:text-gray-400">
            <path fill-rule="evenodd" d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z" clip-rule="evenodd"></path>
          </svg><span class="sr-only">Agility</span><progress min="0" max="10" aria-label="Agility: 2/10" class="w-full h-1 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden appearance-none [&amp;::-webkit-progress-bar]:bg-gray-200 dark:[&amp;::-webkit-progress-bar]:bg-gray-800 [&amp;::-webkit-progress-value]:bg-sky-500 [&amp;::-moz-progress-bar]:bg-sky-500" value="2"></progress></div>"
      `)

      expect(wrapper.find('.sr-only').text()).toMatchInlineSnapshot('"Agility"')
      expect(wrapper.find('progress').exists()).toBe(true)
      expect(wrapper.findComponent(BoltIcon).exists()).toBe(true)
    })

    it('should render the non-compact template when compact is false or undefined', () => {
      const wrapperCompactFalse = mountComponent({ value: 9, type: 'strength', compact: false })
      expect(wrapperCompactFalse.text()).toContain('Strength')
      expect(wrapperCompactFalse.text()).toContain('9/10')
      expect(wrapperCompactFalse.find('progress').exists()).toBe(true)
      expect(wrapperCompactFalse.find('progress').attributes('aria-label')).toBe('Strength: 9/10')
      expect(wrapperCompactFalse.findComponent(BoltIcon).exists()).toBe(true)

      const wrapperCompactUndefined = mountComponent({ value: 4, type: 'weight' })
      expect(wrapperCompactUndefined.text()).toContain('Weight')
      expect(wrapperCompactUndefined.text()).toContain('4/10')
      expect(wrapperCompactUndefined.find('progress').exists()).toBe(true)
      expect(wrapperCompactUndefined.find('progress').attributes('aria-label')).toBe('Weight: 4/10')
      expect(wrapperCompactUndefined.findComponent(BoltIcon).exists()).toBe(true)
    })
  })
})
