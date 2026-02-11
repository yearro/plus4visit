import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/use-theme-color';

interface iProps {
  title: string,
  icon: keyof typeof Ionicons.glyphMap,
}

const CustomHeaderTab = ({ title, icon }:iProps) => {
  const primary = useThemeColor({}, 'primary')
  const secondary = useThemeColor({}, 'secondary')
  const tertiary = useThemeColor({}, 'tertiary')

  const insets = useSafeAreaInsets()
    return (
      <View style={[ styles.container, { marginTop: insets.top, backgroundColor: tertiary }]}>
        <Ionicons
          name={icon}
          style={styles.icon}
          size={24}
          color={secondary}
        />
        <Text style={[styles.title, { color: primary }]}>{title}</Text>
      </View>
    );
}

export default CustomHeaderTab

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center'
  },
  icon: {},
  title: {
    fontFamily: 'MontserratBold',
    fontSize: 17,
    marginLeft: 10
  }
})