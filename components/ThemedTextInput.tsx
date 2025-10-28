import { View, TextInputProps, TextInput, StyleSheet } from 'react-native'
import React, { useRef } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useThemeColor } from '@/hooks/use-theme-color'

type TypeInput = 'Primary' | 'Secondary'

interface iProps extends TextInputProps {
  icon?: keyof typeof Ionicons.glyphMap,
  typeInput?: TypeInput
}

const ThemedTextInput = ({ icon, typeInput = 'Primary', ...rest }: iProps) => {
  const mainColor = ( typeInput === 'Primary' ) ? useThemeColor({}, 'primary') : useThemeColor({}, 'secondary')
  const textColor = ( typeInput === 'Primary' ) ? 'black' : 'white'
  const colorPlaceHolder = '#FFFFFF80'
  const inputRef = useRef<TextInput>(null)
  return (
    <View
      style={styles.container}
       onTouchStart={() => inputRef.current?.focus()}
    >
      {
        icon && (
          <Ionicons
            name={icon}
            size={24}
            style={{ color: mainColor }}
          />
        )
      }
      <TextInput
        ref={inputRef}
        {...rest}
        placeholderTextColor={colorPlaceHolder}
        style={[ styles.input, { borderColor: mainColor, color: textColor,
          fontSize: 16
         }]}
      />
    </View>
  )
}

export default ThemedTextInput

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderBottomWidth: 2,
    marginLeft: 10,
    marginRight: 10,
    fontFamily: 'MontserratRegular'
  }
})