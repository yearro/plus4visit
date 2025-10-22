import React from 'react'
import Drawer from 'expo-router/drawer'

const StackLayout = () => {
  return (
    <Drawer
      screenOptions={{
        headerShown: false
      }}
    >
      <Drawer.Screen
        name='(survery)/index'
      />
      <Drawer.Screen
        name='(survery)/[id]'
      />
    </Drawer>
  )
}

export default StackLayout