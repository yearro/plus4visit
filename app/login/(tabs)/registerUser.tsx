import { useThemeColor } from '@/hooks/use-theme-color'
import { Ionicons } from '@expo/vector-icons'
import React  from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import LoginForm from '@/components/LoginForm'
import { LinearGradient } from 'expo-linear-gradient';

const RegisterUserScreen = () => {
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
          <LoginForm />
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  )
}

export default RegisterUserScreen

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

/*
display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
*/