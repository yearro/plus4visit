import React from 'react'
import { Stack } from 'expo-router'

const StackLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen
        name='(survey)/index'
        options={{
          headerLargeTitle: true,
          headerTitle: 'Dashboard',
          headerTransparent: true,
          headerBlurEffect: 'light'
        }}
      />
      <Stack.Screen
        name='(survey)/[id]'
      />
    </Stack>
  )
}

export default StackLayout