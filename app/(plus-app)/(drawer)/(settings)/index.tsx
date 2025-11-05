import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import ThemedTextInput from '@/components/ThemedTextInput'
import { useThemeColor } from '@/hooks/use-theme-color'
import AwardItem from '@/components/AwardItem'
import ThemedView from '@/components/ThemedView'
import ThemedButton from '@/components/ThemedButton'
import { MAX_NUMBER_PRIZES } from '@/constants/awards'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type newAward = {
  ind: number,
  name: string
}

const SettingsScreen = () => {
  const insets = useSafeAreaInsets()
  const colorBorder = useThemeColor({}, 'secondary')
  const [visits, setVisits] = useState('')
  const [totalAwards, setTotalAwards] = useState(0)
  const [awards, setAwards] = useState<newAward[]>([])

  const handleNumericChange = (text:string) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setVisits(numericValue);
  };

  const saveChanges = () => {
    console.log('Save changes')
  }

  const addNewAward = () => {
    if(totalAwards < MAX_NUMBER_PRIZES ) {
      setTotalAwards(state => state + 1)
      setAwards([...awards, { ind: totalAwards, name: '' } ])
    }
  }

  const removeAward = (ind: number) => {
    console.log('remove ', ind)
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
          <View style={styles.headerSection}>
            <Text style={ styles.title }>Awards : { totalAwards }</Text>
            <ThemedButton
              onPress={() => addNewAward()}
              icon='add-circle-outline'
            >New Award</ThemedButton>
          </View>
          <View>
            <Text
              style={[styles.description, { marginVertical: 15 }]}
            >You can define a maximum of {MAX_NUMBER_PRIZES} different prizes.</Text>
            <View>
              {
                awards.map((award) => (
                  <AwardItem key={award.ind} ind={award.ind} name={award.name} />
                ))
              }
            </View>
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