import { View, Text, KeyboardAvoidingView, ScrollView, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import ThemedView from '@/components/ThemedView'
import ExperienceMeter from '@/components/ExperienceMeter'
import { useThemeColor } from '@/hooks/use-theme-color'
import EmailExperienceMeter from '@/components/EmailExperienceMeter'

const SurveyScreen = () => {
  const secondary = useThemeColor({}, 'secondary')
  const [surveyStep, setSurveyStep] = useState(0)
  const [experience, setExperience] = useState(0)

  const successEmail = (email:string) => {
    console.log('email', email)
    setSurveyStep((prev) => prev + 1)
  }

  const selectExperience = (id:number) => {
    setExperience(id)
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
    >
      <ThemedView>
        <ScrollView>
          <View>
            <View style={styles.header}>
              <Text style={[styles.headerTitle, { color: secondary}]}>Step {surveyStep + 1 }</Text>
            </View>
            { surveyStep === 0 && (
             <EmailExperienceMeter
                email=''
                onSuccess={successEmail}
             />
            ) }
            { surveyStep === 1 && (
              <ExperienceMeter
                onPress={selectExperience}
              />
            )}
          </View>
        </ScrollView>
      </ThemedView>
    </KeyboardAvoidingView>
  )
}

export default SurveyScreen

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: 'MontserratBold'
  },
  title: {
    fontSize: 18,
    fontFamily: 'MontserratBold'
  }
})