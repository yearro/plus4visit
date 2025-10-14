import { View, Text } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

interface iProps {
  error: string
}
const Test = ({ error = '' }:iProps) => {
  console.log('porque nose ve esta madre ')
  return (
    <View style={{ flexDirection: 'row', flex: 1, backgroundColor: 'white' }}>
      <Ionicons
        name="close-circle-outline"
        size={20}
      />
      <Text>{ error }das d asd ad asd a da da sd</Text>
    </View>
  )
}

export default Test