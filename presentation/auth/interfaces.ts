export type AuthStatus = 'authenticated' | 'unauthenticated' | 'checking'

export interface AuthState {
  status: AuthStatus
}
