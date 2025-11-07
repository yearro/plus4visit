export type AuthStatus = 'authenticated' | 'unauthenticated' | 'checking'

export type Award = {
  ind: number,
  name: string
}

export type User = {
  email: string,
  name: string,
  pass:string
}

export interface AuthState {
  status: AuthStatus,
  user?: User,
  login: (email:string, pass:string, name:string) => Promise<boolean>,
  checkStatus: () => void,
  logOut: () => Promise<boolean>,
}

export interface Settings {
  visitNumber: string,
  awards: Award[],
  updateSettings: (arg0:string, arg1:Award[]) => Promise<boolean>,
  getSettings: () => Promise<boolean>,
}
