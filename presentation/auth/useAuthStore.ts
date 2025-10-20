import { create } from 'zustand'
import { AuthState } from './interfaces'

export const useAuthStore = create<AuthState>()((set, get) => ({
  status: 'unauthenticated',
  login: async(email:string, pass:string) => {
    return Promise.resolve(true)
  }
}))