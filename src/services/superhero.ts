// Internal services
import { apiService } from './api'
import type { Superhero, SuperheroAttributes } from '@/types/superhero'
import { API_ENDPOINTS } from '@/config/api'
import { i18n } from '@/i18n'

interface SuperheroItem {
  id: string
  name: string
  picture: string
  attributes: SuperheroAttributes
  updatedAt: Record<string, never>
  createdAt: Record<string, never>
}

interface CreateSuperheroResponse {
  id: string
  name: string
  picture: string
  attributes: SuperheroAttributes
  updatedAt: Record<string, never>
  createdAt: Record<string, never>
}

export const superheroService = {
  async getAll(): Promise<Superhero[]> {
    try {
      const response = await apiService.fetch(API_ENDPOINTS.SUPERHEROES)

      if (!response.ok) {
        // Para errores HTTP, intentamos leer el cuerpo JSON primero
        const errorBody = await response
          .clone()
          .json()
          .catch(() => null)
        const errorMessage = errorBody?.message || i18n.global.t('errors.superhero.fetchFailed')
        throw new Error(errorMessage)
      }

      const data: SuperheroItem[] = await response.json()
      return data.map((item: SuperheroItem) => ({
        id: item.id,
        name: item.name,
        image: item.picture,
        attributes: item.attributes
      }))
    } catch (error) {
      // Simplemente propagamos el error, ya que ya lo hemos formateado adecuadamente
      throw error
    }
  },

  async create(superhero: Omit<Superhero, 'id'>): Promise<Superhero> {
    try {
      const response = await apiService.fetch(API_ENDPOINTS.SUPERHEROES, {
        method: 'POST',
        body: JSON.stringify({
          name: superhero.name,
          picture: superhero.image,
          attributes: superhero.attributes
        })
      })

      if (!response.ok) {
        // Para errores HTTP, intentamos leer el cuerpo JSON primero
        const errorBody = await response
          .clone()
          .json()
          .catch(() => null)
        const errorMessage = errorBody?.message || i18n.global.t('errors.superhero.createFailed')
        throw new Error(errorMessage)
      }

      const data: CreateSuperheroResponse = await response.json()
      return {
        id: data.id,
        name: data.name,
        image: data.picture,
        attributes: data.attributes
      }
    } catch (error) {
      // Simplemente propagamos el error, ya que ya lo hemos formateado adecuadamente
      throw error
    }
  },

  async update(id: string, superhero: Omit<Superhero, 'id'>): Promise<Superhero> {
    try {
      const response = await apiService.fetch(`${API_ENDPOINTS.SUPERHEROES}/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          name: superhero.name,
          picture: superhero.image,
          attributes: superhero.attributes
        })
      })

      if (!response.ok) {
        // Para errores HTTP, intentamos leer el cuerpo JSON primero
        const errorBody = await response
          .clone()
          .json()
          .catch(() => null)
        const errorMessage = errorBody?.message || i18n.global.t('errors.superhero.updateFailed')
        throw new Error(errorMessage)
      }

      const data: CreateSuperheroResponse = await response.json()
      return {
        id: data.id,
        name: data.name,
        image: data.picture,
        attributes: data.attributes
      }
    } catch (error) {
      // Simplemente propagamos el error, ya que ya lo hemos formateado adecuadamente
      throw error
    }
  },

  async delete(id: string): Promise<void> {
    try {
      const response = await apiService.fetch(`${API_ENDPOINTS.SUPERHEROES}/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        // Para errores HTTP, intentamos leer el cuerpo JSON primero
        const errorBody = await response
          .clone()
          .json()
          .catch(() => null)
        const errorMessage = errorBody?.message || i18n.global.t('errors.superhero.deleteFailed')
        throw new Error(errorMessage)
      }
    } catch (error) {
      // Simplemente propagamos el error, ya que ya lo hemos formateado adecuadamente
      throw error
    }
  }
}
