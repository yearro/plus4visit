import { KeyboardAvoidingView, View, StyleSheet, Text } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import { useThemeColor } from '@/hooks/use-theme-color'

type iProps = {
  children: React.ReactNode
}

const AccessView = ({ children }: iProps) => {
  const primary = useThemeColor({}, 'primary')
  return (
    <KeyboardAvoidingView
      behavior='padding'
      style={{ flex: 1 }}
    >
      <LinearGradient
        colors={[primary, '#3B546E', '#256AB0']}
        style={[ styles.container, { backgroundColor: primary }]}>
        <View style={styles.formContainer}>
          <Ionicons
            style={styles.icon}
            name='person-circle-outline'
          />
          <Text style={styles.projectTitle}>Plus4Visit</Text>
          { children }
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  )
}

export default AccessView

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  icon: {
    color: 'white',
    fontSize: 80,
  },
  projectTitle: {
    fontFamily: 'MontserratRegular',
    color: 'white',
    fontSize: 50
  },
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    maxWidth: 500
  }
})