import { Text, TouchableOpacity } from 'react-native'
import React from 'react'

const AwardListItem = ({ item, onPress }: any) => {
  return (
     <TouchableOpacity onPress={() => onPress(item)} style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc' }}>
        <Text>{item.label} (Custom)</Text>
      </TouchableOpacity>
  )
}

export default AwardListItem