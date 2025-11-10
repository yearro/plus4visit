import { View, Text, Alert, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'

import { useAuthStore } from '@/presentation/auth/useAuthStore'
import { useSettingsStore } from '@/presentation/settings/useGameSettingsStore' 
import { Redirect } from 'expo-router'
import { createAppTables } from '@/lib/schema'

const HomeScreen = () => {
  const { status, checkStatus } = useAuthStore()
  const { getSettings } = useSettingsStore()
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    async function checkBasics() {
      try {
        await Promise.all([
          checkStatus(),
          getSettings(),
          createAppTables()
        ])
        setIsLoading(false)
      } catch (error) {
        Alert.alert('Error', 'Problems starting the application')
      }
    }
    checkBasics()
  }, [])

  if(isLoading)
    return <ActivityIndicator size="large" />

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