export const AUTH_STORAGE_KEY = 'qride.auth'
export const TOKEN_STORAGE_KEY = 'token'

export type AuthSession = {
  accessToken: string
  refreshToken: string
  userId: number
  email: string
  role: string
}

function getStorage() {
  if (typeof window === 'undefined') {
    return null
  }

  const storageCandidate = window.localStorage
  if (
    !storageCandidate ||
    typeof storageCandidate.getItem !== 'function' ||
    typeof storageCandidate.setItem !== 'function'
  ) {
    return null
  }

  return storageCandidate
}

export function readAuthSession(): AuthSession | null {
  const storage = getStorage()
  const rawValue = storage?.getItem(AUTH_STORAGE_KEY) ?? null
  if (!rawValue) {
    return null
  }

  try {
    return JSON.parse(rawValue) as AuthSession
  } catch {
    return null
  }
}

export function writeAuthSession(session: AuthSession) {
  const storage = getStorage()
  storage?.setItem(AUTH_STORAGE_KEY, JSON.stringify(session))
  storage?.setItem(TOKEN_STORAGE_KEY, session.accessToken)
}

export function clearAuthSession() {
  const storage = getStorage()
  storage?.removeItem(AUTH_STORAGE_KEY)
  storage?.removeItem(TOKEN_STORAGE_KEY)
}
