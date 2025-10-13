import { View, Text, PressableProps, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useThemeColor } from '@/hooks/use-theme-color'

interface iProps extends PressableProps {
  children: string,
  icon?: keyof typeof Ionicons.glyphMap,
  typeButton?: 'Primary' | 'Secondary'
}

const ThemedButton = ({ children, icon, typeButton='Primary', ...rest }: iProps) => {
  const mainColor = ( typeButton === 'Primary' ) ? useThemeColor({}, 'primary') : useThemeColor({}, 'secondary')
  return (
    <Pressable
      style={({ pressed }) => [
        { backgroundColor: pressed ? mainColor + 80 : mainColor },
        styles.container]
      }
      { ... rest }
    >
      <Text style={styles.text} >{children}</Text>
      {
        icon && (
          <Ionicons
            name={icon}
            style={styles.icon}
            size={24}
          />)
      }
    </Pressable>
  )
}

export default ThemedButton

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'MontserratBold',
    color: 'white'
  },
  icon: {
    color: 'white',
    marginLeft: 10
  }
})