export type AuthStatus = 'authenticated' | 'unauthenticated' | 'checking'

export interface AuthState {
  status: AuthStatus,
  login: (email:string, pass:string) => Promise<boolean>
}
