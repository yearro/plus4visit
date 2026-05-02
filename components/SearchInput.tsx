import { StyleSheet, View, TextInput } from 'react-native'
import React, { useRef } from 'react'
import { Ionicons } from '@expo/vector-icons';

interface SearchInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}
const SearchInput = ({ placeholder, value, onChangeText }: SearchInputProps) => {
  const inputRef = useRef<TextInput>(null)
  return (
    <View
      style={styles.container}
      onTouchStart={() => inputRef.current?.focus()}
    >
      <Ionicons
        name='search-outline'
        size={24}
      />
      <TextInput
        ref={inputRef}
        placeholder={placeholder}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  )
}

export default SearchInput

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingVertical: 10,
    marginHorizontal: 15,
    marginBottom: 15,
    backgroundColor: 'white',
  },
  input: {
    fontFamily: 'MontserratLight',
    marginLeft: 10,
    fontSize: 16,
    borderRadius: 10,
    flex: 1
  }
})