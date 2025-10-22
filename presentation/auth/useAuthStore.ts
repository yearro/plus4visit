import { create } from 'zustand'
import { AuthState } from './interfaces'
import { SecureStoreGetItem, SecureStoreSetItem } from '@/helpers/secure-store.adapter'

export const useAuthStore = create<AuthState>()((set, get) => ({
  status: 'unauthenticated',
  user: undefined,
  login: async(email:string, pass:string, name:string) => {
    set({ status: 'authenticated' })
    set({ user:  { email, pass, name } })
    await SecureStoreSetItem('user', JSON.stringify({ user: { email, pass, name }}))
    return true
  },
  checkStatus: async() => {
    const likeUser = await SecureStoreGetItem('user')
    console.log(likeUser)
  }
}))