import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import ThemedTextInput from '@/components/ThemedTextInput'
import { useThemeColor } from '@/hooks/use-theme-color'
import ThemedButton from '@/components/ThemedButton'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import AwardList from '@/components/AwardList'
import { Award } from '@/presentation/auth/interfaces'
import { useSettingsStore } from '@/presentation/settings/useGameSettingsStore'
import GeneralContentView from '@/components/GeneralContentView'
const SettingsScreen = () => {
  const { updateSettings, awards, visitNumber } = useSettingsStore()
  const [visits, setVisits] = useState(visitNumber)
  const [awardList, setAwardList] = useState<Award[]>(awards)
  const insets = useSafeAreaInsets()
  const colorBorder = useThemeColor({}, 'secondary')

  const handleNumericChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setVisits(numericValue);
  };

  const saveChanges = async () => {
    if (visits == '')
      setVisits('0')
    const result = await updateSettings(visits, awardList)
    if (result)
      Alert.alert('Configuration changes', 'The changes were saved');
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, marginBottom: insets.bottom }}
    >
      <GeneralContentView>
        <ScrollView style={{ paddingHorizontal: 20 }}>
          <View style={styles.settingSection}>
            <Text style={styles.title}>Number of visits</Text>
            <Text style={styles.description}>After this number of visits the client will have the opportunity to participate in a game.</Text>
            <ThemedTextInput
              keyboardType='numeric'
              icon='ribbon-outline'
              value={visits.toString()}
              onChangeText={handleNumericChange}
            />
          </View>
          <View>
            <AwardList
              awards={awardList}
              setAwards={setAwardList}
            />
          </View>
          <View>
            <ThemedButton
              onPress={() => saveChanges()}
              icon='save-outline'
              typeButton='Secondary'
            >Save changes</ThemedButton>
          </View>
        </ScrollView>
      </GeneralContentView>
    </KeyboardAvoidingView>
  )
}

export default SettingsScreen

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontFamily: 'MontserratBold'
  },
  description: {
    fontSize: 16,
    fontFamily: 'MontserratLight',
    marginTop: 15
  },
  settingSection: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 15,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
})