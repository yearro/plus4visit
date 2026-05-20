import { create } from 'zustand'
import { AuthState } from './interfaces'
import { SecureStoreGetItem, SecureStoreSetItem, SecureStoreDeleteItem } from '@/helpers/secure-store.adapter'
import { addNewUser, getLocalUser } from '@/services/dataService'

export const useAuthStore = create<AuthState>()((set, get) => ({
  status: 'unauthenticated',
  user: undefined,
  error: '',
  login: async (email: string, pass: string, name: string, isNewUser: boolean) => {
    try {
      if (isNewUser) {
        await addNewUser(email, name, pass)
      } else {
        const user = await getLocalUser(email, pass)
        if (!user) return false
        name = user?.name || ''
      }
      set({ status: 'authenticated' })
      set({ user: { email, pass, name } })
      await SecureStoreSetItem('user', JSON.stringify({ user: { email, pass, name } }))
      return true
    } catch (error) {
      set({ error: String(error) })
      return false
    }
  },
  checkStatus: async () => {
    const likeUser = await SecureStoreGetItem('user')
    if (likeUser) {
      set({ status: 'authenticated' })
      set({ user: JSON.parse(likeUser) })
    }
    return true
  },
  logOut: async () => {
    await SecureStoreDeleteItem('user')
    set({ status: 'unauthenticated', user: undefined })
    return true
  }
}))