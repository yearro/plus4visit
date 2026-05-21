import { View, TextInputProps, TextInput, StyleSheet, Text, Pressable } from 'react-native'
import React, { useRef, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useThemeColor } from '@/hooks/use-theme-color'

type TypeInput = 'Primary' | 'Secondary'

interface iProps extends TextInputProps {
  icon?: keyof typeof Ionicons.glyphMap,
  typeInput?: TypeInput,
  secureTextEntry?: boolean
}

const ThemedTextInput = ({ icon, typeInput = 'Primary', secureTextEntry = false, ...rest }: iProps) => {
  const mainColor = (typeInput === 'Primary') ? useThemeColor({}, 'primary') : useThemeColor({}, 'secondary')
  const textColor = (typeInput === 'Primary') ? 'black' : 'white'
  const colorPlaceHolder = (typeInput === 'Primary') ? '#8f99a2ff' : '#FFFFFF80'
  const inputRef = useRef<TextInput>(null)
  const [showPass, setShowPass] = useState(false)
  return (
    <View style={{ width: '100%', position: 'relative' }}>
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
          secureTextEntry={secureTextEntry && !showPass}
          {...rest}
          placeholderTextColor={colorPlaceHolder}
          style={[styles.input, {
            borderColor: mainColor, color: textColor,
            fontSize: 16
          }]}
        />

      </View>
      {secureTextEntry && (
        <Pressable
          style={styles.passIcon}
          onPress={() => setShowPass(!showPass)}>
          {showPass ? (
            <Ionicons
              name={'eye-outline'}
              size={24}
              style={{ color: mainColor }}
            />
          ) : (
            <Ionicons
              name={'eye-off-outline'}
              size={24}
              style={{ color: mainColor }}
            />
          )}
        </Pressable>
      )}
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
  },
  passIcon: {
    zIndex: 100,
    position: 'absolute',
    right: 10,
    top: 15,
  }
})