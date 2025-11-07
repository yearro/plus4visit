import { create } from 'zustand'

import { SecureStoreGetItem, SecureStoreSetItem } from '@/helpers/secure-store.adapter'
import { Award, Settings } from './interfaces'

export const useSettingsStore = create<Settings>()((set, get) => ({
  visitNumber: '',
  awards: [],
  updateVisitNumber: async(visits:string) => {
    set({ visitNumber: visits })
    await SecureStoreSetItem('Visits', visits)
    return true
  },
  updateAwardsList: async(awardList:Award[]) => {
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