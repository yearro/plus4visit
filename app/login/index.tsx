import { useThemeColor } from '@/hooks/use-theme-color'
import { Ionicons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import LoginForm from '@/components/LoginForm'
import { LinearGradient } from 'expo-linear-gradient';
const LoginScreen = () => {
  const { width } = Dimensions.get('window');
  const insets = useSafeAreaInsets()
  const primary = useThemeColor({}, 'primary')

  const [showImage, setShowImage] = useState(false)

  useEffect(() => {
    setShowImage(width > 600)
  }, [width])


  return (
    <KeyboardAvoidingView
      behavior='padding'
      style={{
        flex: 1,
        paddingTop: insets.top
      }}
    >
      <View style={styles.container}>
        {
          showImage && (
            <View style={styles.sectionLeft}>
              <Image
                source={require('@/assets/images/thegift.png')}
                style={{width: 500, height: 300}}
              />
            </View>
          )
        }
        <LinearGradient
          colors={[primary, '#3B546E', '#256AB0']}
          style={
          [ showImage ? styles.sectionRight  : styles.singleSection,
            { backgroundColor: primary }
          ]}>
         
            <View style={styles.inputContainer}>
              <Ionicons
                style={styles.icon}
                name='person-circle-outline'
              />
              <Text style={styles.projectTitle}>Plus4Visit</Text>
              <LoginForm />
            </View>
          
        </LinearGradient>


      </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    alignItems: 'center',
  },
  singleSection: {
    flex: 1,
    paddingTop: '20%',
    paddingHorizontal: 20
  },
  sectionLeft: {
    width: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  }
})