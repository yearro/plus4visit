import { create } from 'zustand'
import { AuthState } from './interfaces'
import { SecureStoreGetItem, SecureStoreSetItem, SecureStoreDeleteItem } from '@/helpers/secure-store.adapter'
import { addNewUser, getLocalUser } from '@/services/dataService'

export const useAuthStore = create<AuthState>()((set, get) => ({
  status: 'unauthenticated',
  user: undefined,
  login: async(email:string, pass:string, name:string, isNewUser:boolean) => { 
    try {
      if(isNewUser){
        await addNewUser(email, name, pass)
      } else {
        const user = await getLocalUser(email, pass)
        name = user?.name || ''
      }
      set({ status: 'authenticated' })
      set({ user:  { email, pass, name } })
      await SecureStoreSetItem('user', JSON.stringify({ user: { email, pass, name }}))
      return true
    } catch (error) {
      return false
    }
  },
  checkStatus: async() => {
    const likeUser = await SecureStoreGetItem('user')
    if(likeUser) {
      set({ status: 'authenticated' })
      set({ user: JSON.parse(likeUser) })
    }
    return true
  },
  logOut: async() => {
    await SecureStoreDeleteItem('user')
    return true
  }
}))