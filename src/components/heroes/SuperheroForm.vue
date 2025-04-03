<script setup lang="ts">
// Vue core
import { ref, computed } from 'vue'
import type { FunctionalComponent, SVGAttributes } from 'vue'
// External libraries
import { PhotoIcon, PencilIcon } from '@heroicons/vue/24/outline'
import {
  BoltIcon,
  ScaleIcon,
  SparklesIcon,
  ShieldExclamationIcon,
  ArrowPathIcon,
  HandRaisedIcon
} from '@heroicons/vue/24/solid'
import { useI18n } from 'vue-i18n'
// Components
import ImageCropper from '@/components/ui/ImageCropper.vue'
// Types
import type { Superhero } from '@/types/superhero'
import { STAT_LIMITS, DEFAULT_ATTRIBUTES } from '@/types/superhero'

const { t } = useI18n()

const props = defineProps<{
  superhero?: Superhero
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save', form: Omit<Superhero, 'id'>, onError: () => void): void
}>()

const fileInput = ref<HTMLInputElement | null>(null)
const loading = ref(false)
const showErrors = ref(false)
const touchedFields = ref(new Set<string>())
const isDragging = ref(false)
const showCropper = ref(false)
const tempImageUrl = ref('')

const form = ref<Omit<Superhero, 'id'>>({
  name: props.superhero?.name ?? '',
  image: props.superhero?.image ?? '',
  attributes: {
    agility: props.superhero?.attributes?.agility ?? DEFAULT_ATTRIBUTES.agility,
    strength: props.superhero?.attributes?.strength ?? DEFAULT_ATTRIBUTES.strength,
    weight: props.superhero?.attributes?.weight ?? DEFAULT_ATTRIBUTES.weight,
    endurance: props.superhero?.attributes?.endurance ?? DEFAULT_ATTRIBUTES.endurance,
    charisma: props.superhero?.attributes?.charisma ?? DEFAULT_ATTRIBUTES.charisma
  }
})

type AttributeName = 'agility' | 'strength' | 'weight' | 'endurance' | 'charisma'

const stats = ref<
  Array<{ key: AttributeName; label: string; icon: FunctionalComponent<SVGAttributes> }>
>([
  {
    key: 'agility',
    label: t('form.attributes.stats.agility'),
    icon: BoltIcon
  },
  {
    key: 'strength',
    label: t('form.attributes.stats.strength'),
    icon: HandRaisedIcon
  },
  {
    key: 'weight',
    label: t('form.attributes.stats.weight'),
    icon: ScaleIcon
  },
  {
    key: 'endurance',
    label: t('form.attributes.stats.endurance'),
    icon: ShieldExclamationIcon
  },
  {
    key: 'charisma',
    label: t('form.attributes.stats.charisma'),
    icon: SparklesIcon
  }
])

const validateField = (field: string) => {
  touchedFields.value.add(field)
  if (field === 'name') {
    return !!form.value.name.trim()
  }
  if (field === 'image') {
    return !!form.value.image
  }
  if (field in form.value.attributes) {
    const value = form.value.attributes[field as AttributeName]
    return typeof value === 'number' && value >= STAT_LIMITS.MIN && value <= STAT_LIMITS.MAX
  }
  return true
}

const shouldShowError = (field: string) => {
  return (showErrors.value || touchedFields.value.has(field)) && !validateField(field)
}

const validateForm = () => {
  showErrors.value = true
  if (!validateField('name') || !validateField('image')) {
    return false
  }

  return stats.value.every((stat) => {
    const value = form.value.attributes[stat.key]
    return typeof value === 'number' && value >= STAT_LIMITS.MIN && value <= STAT_LIMITS.MAX
  })
}

const handleCropperClose = () => {
  showCropper.value = false
  URL.revokeObjectURL(tempImageUrl.value)
  tempImageUrl.value = ''
}

const handleCropperSave = (croppedImage: string) => {
  form.value.image = croppedImage
  showCropper.value = false
  tempImageUrl.value = ''
  validateField('image')
}

const handleClick = () => {
  fileInput.value?.click()
}

const handleFileSelect = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file || !file.type.startsWith('image/')) return

  tempImageUrl.value = URL.createObjectURL(file)
  showCropper.value = true
}

const handleDrop = (event: DragEvent) => {
  event.preventDefault()
  isDragging.value = false

  if (!event.dataTransfer?.files.length) return

  const file = event.dataTransfer.files[0]
  if (!file.type.startsWith('image/')) return

  tempImageUrl.value = URL.createObjectURL(file)
  showCropper.value = true
}

const decreaseStat = (statKey: AttributeName) => {
  form.value.attributes[statKey] = Math.max(form.value.attributes[statKey] - 1, STAT_LIMITS.MIN)
  validateField(statKey)
}

const increaseStat = (statKey: AttributeName) => {
  form.value.attributes[statKey] = Math.min(form.value.attributes[statKey] + 1, STAT_LIMITS.MAX)
  validateField(statKey)
}

const submitForm = () => {
  if (!validateForm()) {
    return
  }

  loading.value = true

  // Function to handle errors and stop the spinner
  const handleError = () => {
    loading.value = false
  }

  emit(
    'save',
    {
      name: form.value.name,
      image: form.value.image,
      attributes: {
        agility: form.value.attributes.agility,
        strength: form.value.attributes.strength,
        weight: form.value.attributes.weight,
        endurance: form.value.attributes.endurance,
        charisma: form.value.attributes.charisma
      }
    },
    handleError
  )
}

const submitButtonAriaLabel = computed(() => {
  if (loading.value) {
    return t('form.aria.loading')
  }
  return props.superhero ? t('form.aria.saveChanges') : t('form.aria.createHero')
})
</script>

<template>
  <div class="superhero-form">
    <div
      class="superhero-form-header flex justify-between items-center p-6 border-b dark:border-gray-700"
    >
      <h1 class="text-xl font-bold dark:text-white">
        {{ t(`form.title.${superhero ? 'edit' : 'create'}`) }}
      </h1>
      <button
        @click="$emit('close')"
        class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl leading-none"
        :aria-label="t('form.aria.closeForm')"
      >
        ×
      </button>
    </div>
    <div class="superhero-form-content p-6">
      <form @submit.prevent="submitForm" class="space-y-6" novalidate>
        <div class="space-y-6" role="group" :aria-label="t('form.aria.heroInfo')">
          <div class="flex gap-6">
            <div class="shrink-0">
              <div
                class="relative h-32 w-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 border-2 border-dashed"
                :class="{
                  'border-gray-300 dark:border-gray-600': !shouldShowError('image'),
                  'border-red-500 dark:border-red-400': shouldShowError('image')
                }"
                @dragenter.prevent="isDragging = true"
                @dragleave.prevent="isDragging = false"
                @dragover.prevent
                @drop.prevent="handleDrop"
                @click="handleClick"
                role="button"
                tabindex="0"
                :aria-label="form.image ? t('form.image.change') : t('form.image.upload')"
                :aria-invalid="shouldShowError('image')"
                :aria-describedby="shouldShowError('image') ? 'image-error' : undefined"
                @keydown.space.prevent="handleClick"
                @keydown.enter.prevent="handleClick"
              >
                <img
                  v-if="form.image"
                  :src="form.image"
                  class="w-full h-full object-cover"
                  :alt="t('form.image.alt.preview')"
                />
                <div
                  v-else
                  class="absolute inset-0 flex flex-col items-center justify-center text-gray-400 dark:text-gray-600"
                >
                  <PhotoIcon class="w-12 h-12 mb-2" :aria-label="t('form.image.alt.placeholder')" />
                  <span class="text-sm">{{ t('form.image.placeholder') }}</span>
                </div>
                <div
                  v-if="isDragging || form.image"
                  class="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center"
                >
                  <button
                    class="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors duration-200"
                    title="Change image"
                  >
                    <PencilIcon class="w-5 h-5" />
                  </button>
                </div>
                <input
                  ref="fileInput"
                  type="file"
                  accept="image/*"
                  class="hidden"
                  @change="handleFileSelect"
                />
              </div>
              <p
                v-if="shouldShowError('image')"
                id="image-error"
                class="text-red-500 dark:text-red-400 text-sm mt-2 text-center"
                role="alert"
              >
                {{ t('form.image.error') }}
              </p>
            </div>

            <div class="flex-1 space-y-4">
              <div>
                <label
                  for="heroName"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  {{ t('form.name.label') }}
                </label>
                <input
                  id="heroName"
                  v-model="form.name"
                  type="text"
                  :placeholder="t('form.name.placeholder')"
                  class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400 focus:border-transparent outline-none transition-shadow duration-200"
                  :class="{ 'border-red-500 dark:border-red-400': shouldShowError('name') }"
                  :aria-invalid="shouldShowError('name')"
                  @blur="validateField('name')"
                  :aria-describedby="shouldShowError('name') ? 'heroName-error' : undefined"
                  required
                />
                <p
                  v-if="shouldShowError('name')"
                  id="heroName-error"
                  class="text-red-500 dark:text-red-400 text-sm mt-2"
                  role="alert"
                >
                  {{ t('form.name.error') }}
                </p>
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <label class="block text-lg font-medium dark:text-gray-200">{{
              t('form.attributes.title')
            }}</label>
            <div role="group" :aria-label="t('form.attributes.groupLabel')" class="space-y-3">
              <div v-for="stat in stats" :key="stat.key" class="space-y-1">
                <div class="flex items-center justify-between">
                  <label
                    :for="stat.key"
                    class="text-sm font-medium flex items-center gap-2 text-gray-700 dark:text-gray-200"
                  >
                    <component
                      :is="stat.icon"
                      class="w-5 h-5 dark:text-gray-300 text-gray-700"
                      :aria-label="stat.label"
                      :title="stat.label"
                    />
                    <span>{{ stat.label }}</span>
                  </label>
                  <div class="flex items-center gap-1">
                    <button
                      type="button"
                      class="w-6 h-6 flex items-center justify-center rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none disabled:opacity-50"
                      :disabled="form.attributes[stat.key] <= STAT_LIMITS.MIN"
                      @click="decreaseStat(stat.key)"
                      :aria-label="
                        t('form.attributes.controls.decrease', {
                          stat: t(`form.attributes.stats.${stat.key}`)
                        })
                      "
                    >
                      -
                    </button>
                    <input
                      :id="`${stat.key}-number`"
                      v-model.number="form.attributes[stat.key]"
                      type="number"
                      :min="STAT_LIMITS.MIN"
                      :max="STAT_LIMITS.MAX"
                      class="w-12 text-center px-1 py-0.5 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400 focus:border-transparent"
                      :class="{ 'border-red-500 dark:border-red-400': shouldShowError(stat.key) }"
                      :aria-label="
                        t('form.attributes.controls.value', {
                          stat: t(`form.attributes.stats.${stat.key}`)
                        })
                      "
                      @blur="validateField(stat.key)"
                      :aria-invalid="shouldShowError(stat.key)"
                      :aria-describedby="
                        shouldShowError(stat.key) ? `${stat.key}-error` : undefined
                      "
                    />
                    <button
                      type="button"
                      class="w-6 h-6 flex items-center justify-center rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none disabled:opacity-50"
                      :disabled="form.attributes[stat.key] >= STAT_LIMITS.MAX"
                      @click="increaseStat(stat.key)"
                      :aria-label="
                        t('form.attributes.controls.increase', {
                          stat: t(`form.attributes.stats.${stat.key}`)
                        })
                      "
                    >
                      +
                    </button>
                  </div>
                </div>
                <p
                  v-if="shouldShowError(stat.key)"
                  :id="`${stat.key}-error`"
                  class="text-red-500 dark:text-red-400 text-sm"
                  role="alert"
                >
                  {{ t('form.attributes.error', { min: STAT_LIMITS.MIN, max: STAT_LIMITS.MAX }) }}
                </p>
              </div>
            </div>
          </div>

          <div
            class="border-t border-gray-300 dark:border-gray-700 mt-6 pt-4 flex justify-end space-x-4"
          >
            <button
              type="button"
              class="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400 transition-colors duration-200"
              @click="emit('close')"
              :aria-label="t('form.aria.close')"
            >
              {{ t('form.buttons.cancel') }}
            </button>
            <button
              type="submit"
              class="px-4 py-2 rounded-lg bg-sky-500 dark:bg-sky-400 text-white hover:bg-sky-600 dark:hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              :disabled="loading"
              :aria-label="submitButtonAriaLabel"
              :aria-busy="loading"
            >
              <ArrowPathIcon
                v-if="loading"
                class="w-5 h-5 animate-spin"
                :aria-label="t('form.aria.loading')"
              />
              <span v-else>{{ t(`form.buttons.${superhero ? 'save' : 'create'}`) }}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
  <Teleport to="body">
    <ImageCropper
      v-if="showCropper"
      :image-url="tempImageUrl"
      @crop="handleCropperSave"
      @cancel="handleCropperClose"
    />
  </Teleport>
</template>

<style>
/* Hide number input spinners */
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number'] {
  -moz-appearance: textfield;
  appearance: textfield;
}

/* Asegurar colores correctos en modo oscuro */
.dark input[type='number'] {
  color: #e5e7eb !important; /* gray-200 */
}

.dark label {
  color: #e5e7eb !important;
}
</style>
