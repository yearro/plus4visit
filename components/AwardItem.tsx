import { View, Text, TouchableOpacity, ViewProps } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'

interface iProps {
  color?: string;
  name?: string;
  ind: number,
  zIndex: number,
  zIndexInverse: number
}

type Item = {
  label?: string
  value?: string
}

const AwardItem = ({ color='white', name='Award', ind=0, zIndex, zIndexInverse}:iProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Apple 🍎', value: 'apple' },
    { label: 'Banana 🍌', value: 'banana' },
    { label: 'Orange 🍊', value: 'orange' },
  ]);

  const CustomListItem = ({ item, onPress }:any) => {
    return (
    <TouchableOpacity onPress={() => onPress(item)} style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc' }}>
      <Text>{item.label} (Custom)</Text>
    </TouchableOpacity>
  );
  }

  return (
    <View style={styles.itemContainer} >
      <View style={styles.counterContainer}>
        <Text style={styles.counter}>{ ind + 1 }</Text>
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
          renderListItem={(props) => (
            <CustomListItem {...props}/>
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
    //justifyContent: 'center'
    //marginTop: 100,
    //paddingHorizontal: 20,
  },
  dropdown: {
    borderColor: '#ccc',
  },
  counterContainer: {
    width: 50,
    alignItems: 'center'
  },
  counter: {
    fontSize: 18,
    fontFamily: 'MontserratBold'
  }
});