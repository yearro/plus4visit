import { useThemeColor } from '@/hooks/use-theme-color';
import { Ionicons } from '@expo/vector-icons';
import { DrawerItemList } from '@react-navigation/drawer';
import { Drawer } from 'expo-router/drawer';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function Layout() {
  const drawerActiveColor = useThemeColor({}, 'secondary')
  const textColor = useThemeColor({}, 'primary')
  return (
    <Drawer
      initialRouteName="(users)/index"
      screenOptions={{
        headerShadowVisible: true,
        drawerActiveTintColor: drawerActiveColor,
        drawerHideStatusBarOnOpen: true,
      }}
      drawerContent={
        (props) => (
          <View style={{ flex: 1 }}>
            <View style={styles.drawerHeader}>
              
              <Image source={require('@/assets/images/plus4visitlogo.png')} style={styles.logo} />
              <Text style={[styles.text, { color: textColor }]}>Plus4Visit</Text>
            </View>
            <DrawerItemList {...props} />
            <Text>Acá es otra cosa</Text>
          </View>
        )
      }
    >
      <Drawer.Screen
        name="(users)/index"
        options={{
          drawerLabel: 'Users',
          title: 'User Management',
          drawerIcon: ({ color, size }) => (
            <Ionicons name='person-circle-outline' size={size} color={color} />
          )
        }}
      />
      <Drawer.Screen
        name="(settings)/index"
        options={{
          drawerLabel: 'Settings',
          title: 'App settings',
          drawerIcon: ({ color, size }) => (
            <Ionicons name='cog-outline' size={size} color={color} />
          )
        }}
      />
      <Drawer.Screen
        name="(stack)"
        options={{
          drawerLabel: 'Survey',
          title: 'New survey',
          drawerIcon: ({ color, size }) => (
            <Ionicons name='thumbs-up-outline' size={size} color={color} />
          )
        }}
      />
      <Drawer.Screen
        name="(reports)/index"
        options={{
          drawerLabel: 'Report',
          title: 'Reports',
          drawerIcon: ({ color, size }) => (
            <Ionicons name='bar-chart-outline' size={size} color={color} />
          )
        }}
      />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  drawerHeader: {
    paddingTop: 20,
    width: '100%',
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    
    backgroundColor: 'white'
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    resizeMode: 'center',
    marginBottom: 10
  },
  text: {
    fontFamily: 'MontserratRegular',
    fontSize: 50
  }
})