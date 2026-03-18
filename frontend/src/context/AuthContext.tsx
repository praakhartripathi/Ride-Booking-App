import {
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  clearAuthSession,
  readAuthSession,
  writeAuthSession,
  type AuthSession,
} from '../utils/storage'
import { AuthContext, type AuthContextValue } from './authContextObject'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(() => readAuthSession())

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      isAuthenticated: Boolean(session?.accessToken),
      login: (nextSession) => {
        writeAuthSession(nextSession)
        setSession(nextSession)
      },
      logout: () => {
        clearAuthSession()
        setSession(null)
      },
    }),
    [session],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
