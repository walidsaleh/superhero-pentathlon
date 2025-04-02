// Vue core
import { ref } from 'vue'
// External libraries
import { defineStore } from 'pinia'
import { useI18n } from 'vue-i18n'
// Internal stores
import { useToastStore } from './toast'
// Internal services
import type { Superhero } from '@/types/superhero'
import { superheroService } from '@/services/superhero'
// Types

export const useSuperheroStore = defineStore('superhero', () => {
  const toastStore = useToastStore()
  const { t } = useI18n()
  const superheroes = ref<Superhero[]>([])
  const loading = ref(false)
  const loadingCreate = ref(false)
  const loadingUpdate = ref(false)
  const loadingDelete = ref<string | null>(null) // Store the ID of the hero being deleted
  const error = ref<string | null>(null)

  const fetchSuperheroes = async () => {
    loading.value = true
    error.value = null
    
    try {
      superheroes.value = await superheroService.getAll()
    } catch (err) {
      const message = err instanceof Error ? err.message : t('errors.superhero.fetch')
      error.value = message
      toastStore.showToast(message, 'error')
    } finally {
      loading.value = false
    }
  }

  const addSuperhero = async (superhero: Omit<Superhero, 'id'>) => {
    loadingCreate.value = true
    error.value = null

    try {
      await superheroService.create(superhero)
      await fetchSuperheroes()
      // Show success message
      toastStore.showToast(t('success.superhero.create'), 'success')
    } catch (err) {
      const message = err instanceof Error ? err.message : t('errors.superhero.create')
      error.value = message
      toastStore.showToast(message, 'error')
      throw err
    } finally {
      loadingCreate.value = false
    }
  }

  const updateSuperhero = async (id: string, superhero: Omit<Superhero, 'id'>) => {
    loadingUpdate.value = true
    error.value = null

    try {
      await superheroService.update(id, superhero)
      await fetchSuperheroes()
      // Show success message
      toastStore.showToast(t('success.superhero.update'), 'success')
    } catch (err) {
      const message = err instanceof Error ? err.message : t('errors.superhero.update')
      error.value = message
      toastStore.showToast(message, 'error')
      throw err
    } finally {
      loadingUpdate.value = false
    }
  }

  const deleteSuperhero = async (id: string) => {
    loadingDelete.value = id
    error.value = null

    try {
      await superheroService.delete(id)
      await fetchSuperheroes()
      // Show success message
      toastStore.showToast(t('success.superhero.delete'), 'success')
    } catch (err) {
      const message = err instanceof Error ? err.message : t('errors.superhero.delete')
      error.value = message
      toastStore.showToast(message, 'error')
      throw err
    } finally {
      loadingDelete.value = null
    }
  }

  const getSuperheroById = (id: string) => {
    return superheroes.value.find((h) => h.id === id)
  }

  return {
    superheroes,
    loading,
    loadingCreate,
    loadingUpdate,
    loadingDelete,
    error,
    fetchSuperheroes,
    addSuperhero,
    updateSuperhero,
    deleteSuperhero,
    getSuperheroById
  }
})
