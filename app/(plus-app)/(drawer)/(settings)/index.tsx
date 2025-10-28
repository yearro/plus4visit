import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import ThemedView from '@/components/ThemedView'
import ThemedTextInput from '@/components/ThemedTextInput'
import { useThemeColor } from '@/hooks/use-theme-color'

const SettingsScreen = () => {
  const colorBorder = useThemeColor({}, 'secondary')
  const [visits, setVisits] = useState('')
  const [numberPrices, setNumberPrices] = useState(4)

  const handleNumericChange = (text:string) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setVisits(numericValue);
  };

  return (
    <ThemedView>
      <View style={{ flexDirection: 'row',  alignItems:'center' }}>
        <Text style={ styles.title }>Number of visits</Text>
        <View style={{ width: 200 }}>
          <ThemedTextInput
            keyboardType='numeric'
            icon='ribbon-outline'
            placeholder=''
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
        <Text style={ styles.title }>Awards : </Text>

      </View>

    </ThemedView>
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
  }
})