import { View, Text, KeyboardAvoidingView, ScrollView, StyleSheet, Alert, Image, ImageBackground, ImageBackgroundBase } from 'react-native'
import React, { useState } from 'react'
import ThemedView from '@/components/ThemedView'
import ExperienceMeter from '@/components/ExperienceMeter'
import { useThemeColor } from '@/hooks/use-theme-color'
import EmailExperienceMeter from '@/components/EmailExperienceMeter'
import ThemedTextInput from '@/components/ThemedTextInput'
import ThemedButton from '@/components/ThemedButton'
import { getClient, addClient, addOpinion, updateClientVisits } from '@/services/dataService'
import { useSettingsStore } from '@/presentation/settings/useGameSettingsStore'
import { router } from 'expo-router'

const SurveyScreen = () => {
  const { visitNumber } = useSettingsStore()
  const secondary = useThemeColor({}, 'secondary')
  const [surveyStep, setSurveyStep] = useState(0)
  const [experience, setExperience] = useState(0)
  const [email, setEmail] = useState('cliente@plus4visit.com')
  const [opinion, setOpinion] = useState('')

  const cleanData = () => {
    // Only for testing
    //setEmail('')
    setOpinion('')
    setSurveyStep(0)
    setExperience(0)
  }

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
        await addOpinion(client.id, experience, opinion)
        const newVisits = client.visits + 1
        await updateClientVisits(client.email, newVisits)
        if(newVisits % parseInt(visitNumber) === 0) {
          cleanData()
          router.push(`./${client.email}`)
          return
        }
      } else {
        await addClient(email)
      }
      setSurveyStep((prev) => prev + 1)
    } catch (error) {
      Alert.alert('Error', 'Problems saving the survey')
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
            }{
              surveyStep === 3 && (
                <View style={styles.imageContainer}>
                  <Image
                    source={require('@/assets/images/Thanks.jpg')}
                    style={styles.image}
                    resizeMode='cover'
                  />
                  <Text style={styles.message}>
                    Thank you for taking the survey; your feedback will be very helpful in our improvement efforts.
                  </Text>
                  <ThemedButton
                    onPress={() => cleanData()}
                    typeButton='Secondary'
                    >New survey</ThemedButton>
                </View>)
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
  message: {
    marginVertical: 10,
    fontSize: 18,
    fontFamily: 'MontserratLight'
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    width: 300,
    height: 300
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center'
  }
})