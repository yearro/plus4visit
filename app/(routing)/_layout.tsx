import { View, Text } from 'react-native'
import React from 'react'

import { useAuthStore } from '@/presentation/auth/useAuthStore'
import { Redirect, router } from 'expo-router'

const HomeScreen = () => {
  const { status, checkStatus } = useAuthStore()
  checkStatus()
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