import axios from 'axios'
import { TOKEN_STORAGE_KEY } from '../utils/storage'

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080'

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token =
    typeof window !== 'undefined' &&
    window.localStorage &&
    typeof window.localStorage.getItem === 'function'
      ? window.localStorage.getItem(TOKEN_STORAGE_KEY)
      : null

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})
