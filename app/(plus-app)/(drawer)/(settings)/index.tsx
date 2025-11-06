import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native'
import React, { useState } from 'react'
import ThemedTextInput from '@/components/ThemedTextInput'
import { useThemeColor } from '@/hooks/use-theme-color'
import ThemedView from '@/components/ThemedView'
import ThemedButton from '@/components/ThemedButton'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import AwardList from '@/components/AwardList'
import { Award } from '@/presentation/auth/interfaces'

const SettingsScreen = () => {
  const insets = useSafeAreaInsets()
  const colorBorder = useThemeColor({}, 'secondary')
  const [visits, setVisits] = useState('')
  
  const [awards, setAwards] = useState<Award[]>([])

  const handleNumericChange = (text:string) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setVisits(numericValue);
  };

  const saveChanges = () => {
    console.log('Save changes', awards)
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
                placeholder='#'
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
              awards={awards}
              setAwards={setAwards}
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