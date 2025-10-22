import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const GameScreen = () => {
  const { id } = useLocalSearchParams()
  return (
    <View>
      <Text>GameScreen { id }</Text>
    </View>
  )
}

export default GameScreen