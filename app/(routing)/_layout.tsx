import { View, Text } from 'react-native'
import React from 'react'

import { useAuthStore } from '@/presentation/auth/useAuthStore'
import { useSettingsStore } from '@/presentation/settings/useGameSettingsStore' 
import { Redirect } from 'expo-router'
import { createAppTables } from '@/lib/schema'

const HomeScreen = () => {
  const { status, checkStatus } = useAuthStore()
  const { getSettings } = useSettingsStore()
  checkStatus()
  getSettings()
  createAppTables()
  if( status === 'unauthenticated')
    return <Redirect href='../login'/>
  
  if ( status === 'authenticated')
    return <Redirect href='../(plus-app)/(drawer)/(users)' />

  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  )
}

export default HomeScreen