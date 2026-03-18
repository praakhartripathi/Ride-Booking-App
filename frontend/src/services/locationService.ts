import { api } from './api'

export type LocationSuggestion = {
  city: string
  state: string
  country: string
  label: string
}

export type DistanceTime = {
  origin: string
  destination: string
  distanceKm: number
  durationMinutes: number
  approximated: boolean
}

export async function getLocationSuggestions(query: string) {
  const { data } = await api.get<LocationSuggestion[]>('/api/location/suggestions', {
    params: { q: query, limit: 8 },
  })
  return data
}

export async function getDistanceTime(origin: string, destination: string) {
  const { data } = await api.get<DistanceTime>('/api/location/distance-time', {
    params: { origin, destination },
  })
  return data
}
