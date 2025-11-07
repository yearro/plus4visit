import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import ThemedTextInput from '@/components/ThemedTextInput'
import { useThemeColor } from '@/hooks/use-theme-color'
import ThemedView from '@/components/ThemedView'
import ThemedButton from '@/components/ThemedButton'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import AwardList from '@/components/AwardList'
import { Award } from '@/presentation/auth/interfaces'
import { useSettingsStore } from '@/presentation/settings/useGameSettingsStore'
const SettingsScreen = () => {
  const { updateSettings, awards, visitNumber } = useSettingsStore()
  const [visits, setVisits] = useState(visitNumber)
  const [awardList, setAwardList] = useState<Award[]>(awards)
  const insets = useSafeAreaInsets()
  const colorBorder = useThemeColor({}, 'secondary')

  const handleNumericChange = (text:string) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setVisits(numericValue);
  };

  const saveChangess = async() => {
    if(visits == '' )
      setVisits('0')
    const result = await updateSettings(visits, awardList)
    if(result)
      Alert.alert('Configuration changes', 'The changes were saved');
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, marginBottom: insets.bottom }}
    >
      <ThemedView>
        <ScrollView>
          <View style={styles.headerSection}>
            <Text style={ styles.title }>Number of visits</Text>
            <View style={{ width: 200 }}>
              <ThemedTextInput
                keyboardType='numeric'
                icon='ribbon-outline'
                value={visits.toString()}
                onChangeText={handleNumericChange}
              />
            </View>
          </View>
          <Text
            style={styles.description}
          >After this number of visits the client will have the opportunity to participate in a game.</Text>
          <View  style={[styles.section, { borderColor: colorBorder }]} />
          <View>
            <AwardList
              awards={awardList}
              setAwards={setAwardList}
            />
          </View>
          <View>
            <ThemedButton
              onPress={() => saveChangess()}
              icon='save-outline'
              typeButton='Secondary'
            >Save changes</ThemedButton>
          </View>
        </ScrollView>
      </ThemedView>
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
    fontFamily: 'MontserratLight'
  },
  section: {
    borderTopWidth: 1,
    marginVertical: 20
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})