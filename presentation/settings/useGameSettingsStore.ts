import { create } from 'zustand'

import { SecureStoreGetItem, SecureStoreSetItem } from '@/helpers/secure-store.adapter'
import { Award, Settings } from '../auth/interfaces'

export const useSettingsStore = create<Settings>()((set, get) => ({
  visitNumber: '0',
  awards: [],
  updateSettings: async(visits:string, awardList:Award[]) => {
    set({ visitNumber: visits })
    await SecureStoreSetItem('Visits', visits)
    set({ awards: awardList })
    await SecureStoreSetItem('AwardList', JSON.stringify(awardList))
    return true
  },
  getSettings: async() => {
    const visits = await SecureStoreGetItem('Visits')
    if(visits)
      set({ visitNumber: visits })
    const awards = await SecureStoreGetItem('AwardList')
    if(awards)
      set({ awards: JSON.parse(awards) })
    return true
  },
}))