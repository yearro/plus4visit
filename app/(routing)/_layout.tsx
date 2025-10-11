import { View, Text } from 'react-native'
import React from 'react'

import { useAuthStore } from '@/presentation/auth/useAuthStore'
import { Redirect, router } from 'expo-router'

const HomeScreen = () => {
  const { status } = useAuthStore()

  if( status === 'unauthenticated')
    return <Redirect href='../login'/>

  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  )
}

export default HomeScreen