import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

interface iProps {
  title: string,
  icon: keyof typeof Ionicons.glyphMap,
}

const CustomHeaderTab = ({ title, icon }:iProps) => {
  const insets = useSafeAreaInsets()
    return (
      <View style={{ marginTop: insets.top }}>
        <Ionicons
          name={icon}
          style={styles.icon}
          size={24}
        />
        <Text>{title}</Text>
      </View>
    );
}

export default CustomHeaderTab

const styles = StyleSheet.create({
  icon: {}
})