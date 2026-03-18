import { api } from './api'
import type { AuthSession } from '../utils/storage'

export type AuthMode = 'login' | 'signup'

export type LoginPayload = {
  identifier: string
  password: string
}

export type SignupPayload = {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  password: string
  role: 'RIDER' | 'DRIVER'
}

export async function loginUser(payload: LoginPayload) {
  const { data } = await api.post<AuthSession>('/api/auth/login', payload)
  return data
}

export async function registerUser(payload: SignupPayload) {
  const { data } = await api.post<AuthSession>('/api/auth/register', payload)
  return data
}

export async function loginCaptain(payload: LoginPayload) {
  const { data } = await api.post<AuthSession>('/api/captain/login', payload)
  return data
}

export async function registerCaptain(payload: SignupPayload) {
  const { data } = await api.post<AuthSession>('/api/captain/register', {
    ...payload,
    role: 'DRIVER',
  })
  return data
}
