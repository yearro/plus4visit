import { Ionicons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';

export default function Layout() {
  return (
    <Drawer
      initialRouteName='(users)/index'
      screenOptions={{
        headerShadowVisible: true
      }}
    >
      <Drawer.Screen
        name="(users)/index" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: 'Users',
          title: 'User Management',
          drawerIcon: ({ color, size }) => (
            <Ionicons name='albums-outline' size={size} color={color} />
          )
        }}
      />
      <Drawer.Screen
        name="(settings)/index" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: 'Settings',
          title: 'App settings',
          drawerIcon: ({ color, size }) => (
            <Ionicons name='albums-outline' size={size} color={color} />
          )
        }}
      />
      <Drawer.Screen
        name="(stack)" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: 'Survey',
          title: 'New survey',
          drawerIcon: ({ color, size }) => (
            <Ionicons name='albums-outline' size={size} color={color} />
          )
        }}
      />
      <Drawer.Screen
        name="(reports)/index" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: 'Report',
          title: 'Reports',
          drawerIcon: ({ color, size }) => (
            <Ionicons name='albums-outline' size={size} color={color} />
          )
        }}
      />
    </Drawer>
  );
}