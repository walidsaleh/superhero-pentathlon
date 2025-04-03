<script setup lang="ts">
// Vue core
import { ref, onMounted, nextTick } from 'vue'
// External libraries
import { ArrowPathIcon, UserPlusIcon } from '@heroicons/vue/24/solid'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
// Stores
import { useSuperheroStore } from '@/stores/superhero'
// Components
import SuperheroCard from '@/components/heroes/SuperheroCard.vue'
import SuperheroCardSkeleton from '@/components/heroes/SuperheroCardSkeleton.vue'
import SuperheroForm from '@/components/heroes/SuperheroForm.vue'
import DeleteConfirmation from '@/components/ui/DeleteConfirmation.vue'
import ModalDialog from '@/components/ui/ModalDialog.vue'
// Types
import type { Superhero } from '@/types/superhero'
// Config
import { REQUIRED_HEROES } from '@/config/constants'

const store = useSuperheroStore()
const { t } = useI18n()
const showCreateModal = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const selectedHero = ref<Superhero | null>(null)

const reloadSuperheroes = async () => {
  try {
    await store.fetchSuperheroes()
  } catch (error) {
    console.error('Error reloading superheroes:', error)
    // No need to show a toast here since the store already does it
  }
}

// Load superheroes when component is mounted
onMounted(() => {
  store.fetchSuperheroes()
})

const { superheroes, loadingDelete } = storeToRefs(store)

const editHero = (hero: Superhero) => {
  selectedHero.value = hero
  showEditModal.value = true
  setBodyOverflow(true)
}

const confirmDelete = (hero: Superhero) => {
  selectedHero.value = hero
  showDeleteModal.value = true
  setBodyOverflow(true)
}

const setBodyOverflow = (hidden: boolean) => {
  document.body.style.overflow = hidden ? 'hidden' : ''
}

const closeModal = () => {
  // First, update the modal states
  showCreateModal.value = false
  showEditModal.value = false
  // Then restore body overflow
  setBodyOverflow(false)
  // Finally, clear the selected hero after Vue has updated the DOM
  nextTick(() => {
    selectedHero.value = null
  })
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  selectedHero.value = null
  setBodyOverflow(false)
}

const saveHero = async (hero: Omit<Superhero, 'id'>, onError: () => void) => {
  try {
    if (selectedHero.value) {
      await store.updateSuperhero(selectedHero.value.id, hero)
    } else {
      await store.addSuperhero(hero)
    }
    closeModal()
  } catch (error) {
    console.error('Error saving hero:', error)
    // Call the onError function to stop the spinner
    onError()
    // No need to show a toast here since the store already does it
  }
}

const deleteHero = async () => {
  try {
    if (selectedHero.value) {
      await store.deleteSuperhero(selectedHero.value.id)
      closeDeleteModal()
    }
  } catch (error) {
    console.error('Error deleting hero:', error)
    // No need to show a toast here since the store already does it
  }
}
</script>

<template>
  <div class="superhero-list-view container mx-auto px-4 py-8">
    <div class="space-y-4 mb-6">
      <h1 class="text-3xl font-bold dark:text-white font-karla">
        {{ t('pages.heroes.title') }}
      </h1>
      <div class="flex justify-between items-center">
        <p class="text-gray-600 dark:text-gray-400">
          <template v-if="superheroes.length === 0">
            {{ t('pages.heroes.empty.title') }}
          </template>
          <template v-else>
            {{ t('pagination.showing', { count: superheroes.length, total: superheroes.length }) }}
          </template>
        </p>
        <div class="flex space-x-2">
          <button
            @click="reloadSuperheroes"
            class="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 px-4 py-2 rounded flex items-center cursor-pointer"
            :disabled="store.loading"
            :class="{ 'opacity-50 cursor-not-allowed': store.loading }"
          >
            <ArrowPathIcon class="w-5 h-5 mr-2" :class="{ 'animate-spin': store.loading }" />
            <span>{{ t('pages.heroes.actions.tryAgain') }}</span>
          </button>
          <button
            @click="
              () => {
                showCreateModal = true
                setBodyOverflow(true)
              }
            "
            class="bg-sky-500 dark:bg-sky-600 hover:bg-sky-600 dark:hover:bg-sky-700 text-white px-4 py-2 rounded flex items-center cursor-pointer"
          >
            <UserPlusIcon class="w-5 h-5 mr-2" />
            <span>{{ t('pages.heroes.actions.new') }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Loading state -->
    <div
      v-if="store.loading"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <SuperheroCardSkeleton v-for="i in REQUIRED_HEROES" :key="i" />
    </div>

    <!-- Error banner (always visible when there is an error) -->
    <div
      v-if="store.error"
      class="mb-6 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4"
    >
      <div class="text-red-600 dark:text-red-400">{{ store.error }}</div>
    </div>

    <!-- Empty state -->
    <div
      v-if="!store.loading && superheroes.length === 0"
      class="flex flex-col items-center py-8 space-y-4"
    >
      <div
        class="bg-sky-50 dark:bg-sky-900/30 p-4 rounded-lg border border-sky-100 dark:border-sky-800 mb-4"
      >
        <p class="text-sky-700 dark:text-sky-300">
          <span class="font-medium">{{ t('pages.heroes.empty.welcome') }}</span>
        </p>
        <ul class="mt-2 space-y-1 list-disc list-inside">
          <li>{{ t('pages.heroes.empty.features.create') }}</li>
          <li>{{ t('pages.heroes.empty.features.attributes') }}</li>
          <li>{{ t('pages.heroes.empty.features.performance') }}</li>
          <li>{{ t('pages.heroes.empty.features.minimum') }}</li>
        </ul>
      </div>
    </div>

    <!-- Superhero grid -->
    <div v-if="!store.loading && superheroes.length > 0" class="space-y-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <SuperheroCard
          v-for="hero in superheroes"
          :key="hero.id"
          :hero
          :loading-delete="loadingDelete"
          @edit="editHero"
          @delete="confirmDelete"
        />
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <ModalDialog :show="showCreateModal || showEditModal" size="sm" @close="closeModal">
      <SuperheroForm
        v-if="showCreateModal || showEditModal"
        :superhero="selectedHero || undefined"
        @close="closeModal"
        @save="(hero: Omit<Superhero, 'id'>, onError: () => void) => saveHero(hero, onError)"
      />
    </ModalDialog>

    <!-- Delete Confirmation Modal -->
    <ModalDialog :show="showDeleteModal" size="sm" @close="closeDeleteModal">
      <DeleteConfirmation
        v-if="selectedHero"
        :superhero="selectedHero"
        @confirm="deleteHero"
        @cancel="closeDeleteModal"
      />
    </ModalDialog>
  </div>
</template>
