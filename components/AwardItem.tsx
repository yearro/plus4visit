import { View, Text, TextInput, Touchable, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import { StyleSheet } from 'react-native'
import { useThemeColor } from '@/hooks/use-theme-color';
import { colorCodes } from '@/constants/colors'
import { Ionicons } from '@expo/vector-icons';

interface iProps {
  name?: string;
  ind: number,
  remove: (arg0:number) => void,
  onChangeText: (arg0:number, arg1:string) => void,
}

const AwardItem = ({ name='', ind=0, remove, onChangeText}:iProps) => {
  const secondary = useThemeColor({}, 'secondary')
  
  const inputRef = useRef<TextInput>(null)
  
  return (
  <View style={styles.itemContainer}>
    <View
      style={styles.awardContainer}
      onTouchStart={() => inputRef.current?.focus()}
    >
      <View style={[styles.counterContainer, { borderRightColor: secondary }]}>
        <Text style={[styles.counter, { color: secondary }]}>{ ind + 1 }</Text>
      </View>
      <View style={[ styles.boxColor, { backgroundColor: colorCodes[ind] }]} />
      <TextInput
        ref={inputRef}
        style={styles.input}
        onChangeText={(value) => onChangeText(ind, value)}
        value={name}
        placeholder="Award name"
      />
    </View>
    <TouchableOpacity
      style={styles.deleteBtn}
      onPress={() => remove(ind)}
    >
      <Ionicons
        size={25}
        name='trash-outline'
        color={'red'}
      />
    </TouchableOpacity>
  </View>
  )
}

export default AwardItem

const styles = StyleSheet.create({
  itemContainer: {
   flexDirection: 'row',
   alignItems: 'center',
  },
  awardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 5,
    marginBottom: 10,
    flex: 1
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
    fontSize: 16,
    
    flex:1
  },
  deleteBtn: {
    marginLeft: 5,
    paddingBottom: 5
  }
});