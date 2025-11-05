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
  checkStatus: () => void
}

type Segment = {
  label:string,
  color:string
}

export interface Settings {
  visitNumber: number,
  segments: Segment[],
  updateVisitNumber: (visit:number) => Promise<boolean>,
  addSegment: (label:string, color:string) => Promise<boolean>,
  deleteSegment: (label:string) => Promise<boolean>
}
