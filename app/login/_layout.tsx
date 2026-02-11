import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { useThemeColor } from '@/hooks/use-theme-color'
import CustomHeaderTab from '@/components/CustomHeaderTab'

const AccessNavigation = () => {
  const primary = useThemeColor({}, 'primary')
  const secondary = useThemeColor({}, 'tertiary')
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: primary,
      }}
    >
      <Tabs.Screen
        name='(tabs)/login'
        options={{
          tabBarIcon: ({ color }) => <Ionicons size={28} name='log-in-outline' color={color} />,
          header: () => <CustomHeaderTab title='Signed-in User' icon='enter-sharp' />
        }}
      />
      <Tabs.Screen
        name='(tabs)/registerUser'
        options={{
          tabBarIcon: ({ color }) => <Ionicons size={28} name='person-add-outline' color={color} />,
          header: () => <CustomHeaderTab title='New User' icon='person-add-sharp' />
        }}
      />
    </Tabs>
  )
}

export default AccessNavigation