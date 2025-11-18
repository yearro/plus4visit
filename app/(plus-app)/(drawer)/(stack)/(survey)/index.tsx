import { View, Text, KeyboardAvoidingView, ScrollView, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import ThemedView from '@/components/ThemedView'
import ExperienceMeter from '@/components/ExperienceMeter'
import { useThemeColor } from '@/hooks/use-theme-color'
import EmailExperienceMeter from '@/components/EmailExperienceMeter'
import ThemedTextInput from '@/components/ThemedTextInput'
import ThemedButton from '@/components/ThemedButton'
import { getClient, addClient } from '@/services/dataService'

const SurveyScreen = () => {
  const secondary = useThemeColor({}, 'secondary')
  const [surveyStep, setSurveyStep] = useState(0)
  const [experience, setExperience] = useState(0)
  const [email, setEmail] = useState('cliente@plus4visit.com')
  const [opinion, setOpinion] = useState('')

  const successEmail = (email:string) => {
    setEmail(email)
    setSurveyStep((prev) => prev + 1)
  }

  const selectExperience = (id:number) => {
    setExperience(id)
    setSurveyStep((prev) => prev + 1)
  }

  const sendSurvey = async() => {
    try {
      const client = await getClient(email)
      if(client) {
        console.log('client ', client.visits)

      } else {
        console.log('New client')
        // await addClient(email)
      }
      
    } catch (error) {
      Alert.alert('Error', 'Problems with data insertion')
    }
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
                email={email}
                onSuccess={successEmail}
             />)
            }{ surveyStep === 1 && (
              <ExperienceMeter
                onPress={selectExperience}
              />)
            }{
              surveyStep === 2 && (
                <>
                  <ThemedTextInput
                    icon={'megaphone-outline'}
                    multiline={true}
                    value={opinion}
                    onChangeText={setOpinion}
                    typeInput='Primary'
                    placeholder='Share your opinion about our service'
                  />
                  <ThemedButton
                    onPress={() => sendSurvey()}
                    typeButton='Secondary'
                    >Send survey</ThemedButton>
                </>
              )
            }
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