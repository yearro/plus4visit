import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import Wheel from 'react-native-spin-the-wheel';

const GameScreen = () => {
  const { id } = useLocalSearchParams()
  const [result, setResult] = useState('');

  const segments = [
    { text: 'Segment 1' },
    { text: 'Segment 2' },
    // Add more segments as needed
  ];

  const onFinished = (segment: any) => {
    setResult(segment);
  };
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Wheel
        segments={segments}
        segColors={['red', 'green']} // Example segment colors
        textColors={['black', 'white']} // Example text colors
        onFinished={onFinished}
        pinImage={require('@/assets/images/pin.png')} // Example pin image
        // Add more props as needed
      />
      <Text>Result: {JSON.stringify(result)}</Text>
    </View>
  )
}

export default GameScreen