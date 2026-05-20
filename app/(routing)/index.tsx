import { View, Text, Alert, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'

import { useAuthStore } from '@/presentation/auth/useAuthStore'
import { useSettingsStore } from '@/presentation/settings/useGameSettingsStore'
import { Redirect } from 'expo-router'

const HomeScreen = () => {
  const { status, checkStatus, error } = useAuthStore()
  const { getSettings } = useSettingsStore()
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    async function checkBasics() {
      try {
        await Promise.all([
          checkStatus(),
          getSettings(),
        ])
      } catch (error) {
        Alert.alert('Error', 'Problems starting the application')
      } finally {
        setIsLoading(false)
      }
    }
    checkBasics()
  }, [])

  if (isLoading)
    return <ActivityIndicator size="large" />

  if (status === 'unauthenticated')
    return <Redirect href='/login/login' />

  if (status === 'authenticated')
    return <Redirect href='/(plus-app)/(drawer)/(users)' />

  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  )
}

export default HomeScreen