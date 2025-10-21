export type AuthStatus = 'authenticated' | 'unauthenticated' | 'checking'
export type User = {
  email: string,
  name: string,
  pass:string
}

export interface AuthState {
  status: AuthStatus,
  user?: User,
  login: (email:string, pass:string, name:string) => Promise<boolean>,
  checkStatus: () => void
}
