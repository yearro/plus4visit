import { View, Text, TextInput } from 'react-native'
import React, { useRef, useState } from 'react'
import { StyleSheet } from 'react-native'
import { useThemeColor } from '@/hooks/use-theme-color';
import { colorCodes } from '@/constants/colors'

interface iProps {
  name?: string;
  ind: number,
}

const AwardItem = ({ name='', ind=0 }:iProps) => {
  const secondary = useThemeColor({}, 'secondary')
  const [value, setValue] = useState(name);
  const inputRef = useRef<TextInput>(null)
  
  return (
    <View
      style={styles.itemContainer}
       onTouchStart={() => inputRef.current?.focus()}
    >
      <View style={[styles.counterContainer, { borderRightColor: secondary }]}>
        <Text style={[styles.counter, { color: secondary }]}>{ ind + 1 }</Text>
      </View>
      <View style={[ styles.boxColor, { backgroundColor: colorCodes[ind] }]} />
      <TextInput
        ref={inputRef}
        style={styles.input}
        onChangeText={setValue}
        value={value}
        placeholder="Award name"
      />
    </View>
  )
}

export default AwardItem

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 5,
    marginBottom: 10
  },
  counterContainer: {
    width: 50,
    alignItems: 'center',
    borderRightWidth: 1,
    marginRight: 10
  },
  counter: {
    fontSize: 18,
    fontFamily: 'MontserratBold'
  },
  boxColor: {
    width: 30,
    height: 40,
    marginRight: 10
  },
  input: {
    fontSize: 16
  }
});