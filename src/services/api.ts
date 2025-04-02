import { API_BASE_URL, API_ENDPOINTS } from '@/config/api'
import { getStoredApiKey, setStoredApiKey, removeStoredApiKey } from '@/utils/storage'

interface ApiKeyResponse {
  id: string
  updatedAt: string
  createdAt: string
}

class ApiService {
  private apiKey: string | null = getStoredApiKey()

  async initialize(): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.API_KEYS}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      })

      if (!response.ok) {
        throw new Error(`Failed to get API key: ${response.statusText}`)
      }

      const data: ApiKeyResponse = await response.json()
      this.apiKey = data.id
      setStoredApiKey(data.id)
    } catch (error) {
      this.apiKey = null
      removeStoredApiKey()
      throw error
    }
  }

  private getHeaders(): HeadersInit {
    if (!this.apiKey) {
      throw new Error('API not initialized')
    }

    return {
      'Authorization': this.apiKey,
      'Content-Type': 'application/json'
    }
  }

  async fetch(endpoint: string, options: RequestInit = {}): Promise<Response> {
    try {
      if (!this.apiKey) {
        await this.initialize()
      }

      const url = `${API_BASE_URL}${endpoint}`
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.getHeaders(),
          ...options.headers
        }
      })

      if (response.status === 401 || response.status === 403) {
        this.apiKey = null
        removeStoredApiKey()
        await this.initialize()

        return await fetch(url, {
          ...options,
          headers: {
            ...this.getHeaders(),
            ...options.headers
          }
        })
      }

      return response
    } catch (error) {
      this.apiKey = null
      removeStoredApiKey()
      throw error
    }
  }
}

export const apiService = new ApiService()
