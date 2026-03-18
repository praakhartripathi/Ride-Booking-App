import { getLocationSuggestions } from '../services/locationService'

export type LocationSuggestion = {
  city: string
  state: string
  country: string
  label: string
}

export async function searchLocations(query: string): Promise<LocationSuggestion[]> {
  const trimmedQuery = query.trim()
  if (!trimmedQuery) {
    return []
  }

  return getLocationSuggestions(trimmedQuery)
}
