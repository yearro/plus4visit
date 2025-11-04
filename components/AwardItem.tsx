import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { useThemeColor } from '@/hooks/use-theme-color';
import { colorCodes } from '@/constants/colors'

interface iProps {
  name?: string;
  ind: number,
}

const AwardItem = ({ name='Award', ind=0 }:iProps) => {
  const secondary = useThemeColor({}, 'secondary')
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  
  return (
    <View style={styles.itemContainer} >
      <View style={[styles.counterContainer, { borderRightColor: secondary }]}>
        <Text style={[styles.counter, { color: secondary }]}>{ ind + 1 }</Text>
      </View>
      <View style={[ styles.boxColor, { backgroundColor: colorCodes[ind] }]} />
      <Text>AwardItem</Text>
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
    width: 40,
    height: 40,
    marginRight: 10
  }
});