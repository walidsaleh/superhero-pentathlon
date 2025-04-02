const API_KEY_STORAGE_KEY = 'superhero_api_key'

export const getStoredApiKey = (): string | null => {
  return localStorage.getItem(API_KEY_STORAGE_KEY)
}

export const setStoredApiKey = (apiKey: string): void => {
  localStorage.setItem(API_KEY_STORAGE_KEY, apiKey)
}

export const removeStoredApiKey = (): void => {
  localStorage.removeItem(API_KEY_STORAGE_KEY)
}
