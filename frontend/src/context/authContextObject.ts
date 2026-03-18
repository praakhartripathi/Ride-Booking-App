import { createContext } from 'react'
import type { AuthSession } from '../utils/storage'

export type AuthContextValue = {
  session: AuthSession | null
  isAuthenticated: boolean
  login: (nextSession: AuthSession) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined)
