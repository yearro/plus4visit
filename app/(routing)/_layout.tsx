import { View, Text } from 'react-native'
import React, { useEffect } from 'react'

import { useAuthStore } from '@/presentation/auth/useAuthStore'
import { Redirect, router } from 'expo-router'

const HomeScreen = () => {
  const { status, checkStatus } = useAuthStore()

  useEffect(() => {
    checkStatus()
  }, [])

  if( status === 'unauthenticated')
    return <Redirect href='../login'/>
  
  if ( status === 'authenticated')
    return <Redirect href='../tabs' />

  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  )
}

export default HomeScreen