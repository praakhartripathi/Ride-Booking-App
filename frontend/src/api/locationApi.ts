export type LocationSuggestion = {
  city: string
  state: string
  country: string
  label: string
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080'

export async function searchLocations(query: string): Promise<LocationSuggestion[]> {
  if (!query.trim()) {
    return []
  }

  const response = await fetch(
    `${API_BASE_URL}/api/locations/search?q=${encodeURIComponent(query)}&limit=8`,
  )

  if (!response.ok) {
    throw new Error('Failed to load location suggestions')
  }

  return (await response.json()) as LocationSuggestion[]
}
