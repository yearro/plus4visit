import ThemedButton from '@/components/ThemedButton'
import ThemedTextInput from '@/components/ThemedTextInput'
import { useThemeColor } from '@/hooks/use-theme-color'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View, Image } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const LoginScreen = () => {
  const insets = useSafeAreaInsets()
  const primary = useThemeColor({}, 'primary')
  return (
    <KeyboardAvoidingView
      behavior='padding'
      style={{
        flex: 1,
        paddingTop: insets.top
      }}
    >
      <View style={styles.container}>
        <View style={styles.sectionLeft}>
          <Image
            source={require('@/assets/images/thegift.png')}
            style={{width: 500, height: 300}}
          />
        </View>
        <View style={[styles.sectionRight, { backgroundColor: primary }]}>
          <View style={styles.inputContainer}>
            <Ionicons
              style={styles.icon}
              name='person-circle-outline'
            />
            <Text style={styles.projectTitle}>Plus4Visit</Text>
            <ThemedTextInput
              icon='mail-outline'
              typeInput='Secondary'
              placeholder='Example: myEmail@email.com'
            />
            <ThemedTextInput
              icon='lock-closed-outline'
              typeInput='Secondary'
              placeholder='Write your password'
            />
            <ThemedButton
              icon='log-in-outline'
              typeButton='Secondary'
            >Login</ThemedButton>
          </View>
        </View>
       
      </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row'
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
  sectionRight: {
    width: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  sectionLeft: {
    width: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 50,
    width: 400
  }
})