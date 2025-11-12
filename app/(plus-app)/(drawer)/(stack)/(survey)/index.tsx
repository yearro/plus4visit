import { View, Text, KeyboardAvoidingView, ScrollView, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import ThemedView from '@/components/ThemedView'
import ThemedTextInput from '@/components/ThemedTextInput'
import ThemedButton from '@/components/ThemedButton'
import { newClientValidationSchema } from '@/presentation/settings/SchemaValidationNewClient'
import ErrorMessage from '@/components/ErrorMessage'
import ExperienceMeter from '@/components/ExperienceMeter'

const SurveyScreen = () => {
  const [clientEmail, setClientEmail] = useState('ejemplo@email.com')
  const [emailError, setEmailError] = useState('')
  const [surveyStep, setSurveyStep] = useState(0)

  const saveClient = () => {
    newClientValidationSchema
      .validate({ email: clientEmail})
      .then(() => {
        setSurveyStep((prev) => prev + 1)
      })
      .catch((error) => {
        setEmailError(error.message)
      })
  }

  const selectExperience = (id:number) => {
    console.log('id ', id)
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
    >
      <ThemedView>
        <ScrollView>
          <View>
            { surveyStep === 0 && (
              <>
                <Text style={styles.title}>Write your email address: </Text>
                <ThemedTextInput
                  icon={'mail-outline'}
                  value={clientEmail}
                  onChangeText={setClientEmail}
                />
                <View style={{ alignItems: 'center'}}>
                  {
                    emailError.length !== 0 && (<ErrorMessage type='Secondary' error={emailError} />)
                  }
                </View>
              </>
            ) }
            { surveyStep === 1 && (
              <ExperienceMeter
                onPress={selectExperience}
              />
            )}
            
            <ThemedButton
              onPress={() => saveClient()}
              icon='gift-outline'
              typeButton='Secondary'
            >Start survey</ThemedButton>
          </View>
        </ScrollView>
      </ThemedView>
    </KeyboardAvoidingView>
  )
}

export default SurveyScreen

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontFamily: 'MontserratBold'
  }
})