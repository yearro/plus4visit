import { View, Text } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CustomHeaderTab = () => {
  const insets = useSafeAreaInsets()
    return (
      <View style={{ marginTop: insets.top }}>
        <Text>My Custom Header</Text>
      </View>
    );
}

export default CustomHeaderTab