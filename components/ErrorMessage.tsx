import { useThemeColor } from '@/hooks/use-theme-color'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { View, Text } from 'react-native'

const ErrorMessage = ({error='', type = 'Primary' }) => {
  const errorColor = useThemeColor({}, 'error')
  return(
    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
    <Ionicons
      name="close-circle-outline"
      size={20}
      color={errorColor}
    />
      <Text style={[
        type === 'Primary' ? { color: 'white' } : { color: errorColor },
        { fontFamily: 'MontserratBold', marginLeft: 5 }]}> {error} </Text>
  </View>
  )
}

export default ErrorMessage