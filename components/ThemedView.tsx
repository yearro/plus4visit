import { StyleSheet, View, ViewProps } from 'react-native'
import React from 'react'
import { useThemeColor } from '@/hooks/use-theme-color'

type iProps = ViewProps

const ThemedView = ({ style, ...props }: iProps) => {
  const bgColor = useThemeColor({}, 'tertiary')
  return (
    <View style={[ style, styles.containerSection, { backgroundColor: bgColor } ]} { ...props }/>
  )
}

export default ThemedView

const styles = StyleSheet.create({
  containerSection:{
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 10
  }
})