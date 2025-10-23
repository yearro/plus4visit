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
        name='(survery)/index'
      />
      <Stack.Screen
        name='(survery)/[id]'
      />
    </Stack>
  )
}

export default StackLayout