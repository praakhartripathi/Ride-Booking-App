import { api } from './api'

export type RideStatus =
  | 'REQUESTED'
  | 'ACCEPTED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED'

export type Ride = {
  id: number
  riderId: number
  riderEmail: string
  driverId: number | null
  driverEmail: string | null
  pickupLocation: string
  dropoffLocation: string
  scheduledAt: string | null
  estimatedFare: number
  riderNotes: string | null
  status: RideStatus
  createdAt: string
  updatedAt: string
}

export type CreateRidePayload = {
  pickupLocation: string
  dropoffLocation: string
  scheduledAt: string | null
  estimatedFare: number
  riderNotes: string
}

export async function createRide(payload: CreateRidePayload) {
  const { data } = await api.post<Ride>('/api/rides/create', payload)
  return data
}

export async function getUserRides() {
  const { data } = await api.get<Ride[]>('/api/rides/user')
  return data
}

export async function getCaptainRides() {
  const { data } = await api.get<Ride[]>('/api/rides/captain')
  return data
}

export async function getOpenRides() {
  const { data } = await api.get<Ride[]>('/api/rides/open')
  return data
}

export async function acceptRide(rideId: number) {
  const { data } = await api.patch<Ride>(`/api/rides/${rideId}/accept`)
  return data
}
