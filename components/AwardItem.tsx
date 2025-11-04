import { View, Text } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import AwardListItem from './AwardListItem';
import { useThemeColor } from '@/hooks/use-theme-color';

interface iProps {
  color?: string;
  name?: string;
  ind: number,
  zIndex: number,
  zIndexInverse: number
}

const AwardItem = ({ color='white', name='Award', ind=0, zIndex, zIndexInverse}:iProps) => {
  const secondary = useThemeColor({}, 'secondary')
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Apple 🍎', value: 'apple' },
    { label: 'Banana 🍌', value: 'banana' },
    { label: 'Orange 🍊', value: 'orange' },
  ]);

  return (
    <View style={styles.itemContainer} >
      <View style={[styles.counterContainer, { borderRightColor: secondary }]}>
        <Text style={[styles.counter, { color: secondary }]}>{ ind + 1 }</Text>
      </View>
      <View>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder="Select a fruit"
          listMode="SCROLLVIEW"
          zIndex={zIndex}
          zIndexInverse={zIndexInverse}
          style={styles.dropdown}
          containerStyle={{
            width: 100
          }}
          renderListItem={(props) => (
            <AwardListItem {...props}/>
          )}
        />
      </View>
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
  dropdown: {
    borderColor: '#ccc',
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
  }
});