import { View, Text, StyleSheet, Modal, Pressable, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import Wheel from 'react-native-spin-the-wheel';
import { useSettingsStore } from '@/presentation/settings/useGameSettingsStore'
import { colorCodes } from '@/constants/colors';

type tSegment = {
  text: string;
}
const GameScreen = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const { awards } = useSettingsStore()
  const { id } = useLocalSearchParams()
  const [result, setResult] = useState<tSegment | ''>('');

  useEffect(() => {
    setModalVisible(true)
  }, [result])

  const segments:tSegment[] = []
  awards.map(item => segments.push({ text: item.name }))
  const segmentColors = colorCodes.splice(0, awards.length)

  const onFinished = (segment: any) => {
    setResult(segment);
  };

  return (
    <View style={styles.container}>
      <Wheel
        segments={segments}
        segColors={segmentColors}
        textColors={['black']}
        onFinished={onFinished}
        pinImage={require('@/assets/images/pin.png')}
        // Add more props as needed
      />
      
      <Modal
        animationType="slide"
          
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}
      >
        <View style={styles.resultContainer} >
          <Text style={styles.result}>Result: {result && result.text}</Text>
        </View>
        <Pressable
          onPress={() => setModalVisible(!modalVisible)}>
          <Text>Hide Modal</Text>
        </Pressable>
      </Modal>
    </View>
  )
}

export default GameScreen

const styles = StyleSheet.create({
  container:{
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center'},
  resultContainer:{
    marginTop: 20
  },
  result: {
    fontFamily: 'MontserratBold',
  }
})