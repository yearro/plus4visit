import { useThemeColor } from '@/hooks/use-theme-color';
import { Ionicons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';

export default function Layout() {
  const drawerActiveColor = useThemeColor({}, 'secondary')
  return (
    <Drawer
      initialRouteName='(users)/index'
      screenOptions={{
        headerShadowVisible: true,
        drawerActiveTintColor: drawerActiveColor,
        drawerHideStatusBarOnOpen: true,
      }}
    >
      <Drawer.Screen
        name="(users)/index"
        options={{
          drawerLabel: 'Users',
          title: 'User Management',
          drawerIcon: ({ color, size }) => (
            <Ionicons name='albums-outline' size={size} color={color} />
          )
        }}
      />
      <Drawer.Screen
        name="(settings)/index"
        options={{
          drawerLabel: 'Settings',
          title: 'App settings',
          drawerIcon: ({ color, size }) => (
            <Ionicons name='albums-outline' size={size} color={color} />
          )
        }}
      />
      <Drawer.Screen
        name="(stack)"
        options={{
          drawerLabel: 'Survey',
          title: 'New survey',
          drawerIcon: ({ color, size }) => (
            <Ionicons name='albums-outline' size={size} color={color} />
          )
        }}
      />
      <Drawer.Screen
        name="(reports)/index"
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