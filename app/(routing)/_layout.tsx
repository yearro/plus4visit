import { Stack } from 'expo-router'

export default function RoutingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  )
}
