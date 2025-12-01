import { View, Text, StyleSheet, Modal, Pressable, Alert, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Wheel from 'react-native-spin-the-wheel';
import { useSettingsStore } from '@/presentation/settings/useGameSettingsStore'
import { colorCodes } from '@/constants/colors';
import ThemedButton from '@/components/ThemedButton';
import { router } from 'expo-router';

type tSegment = {
  text: string;
}
const GameScreen = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const { awards } = useSettingsStore()
  const [result, setResult] = useState<tSegment | ''>('');

  useEffect(() => {
    if(result !== '')
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
      />
      
      <Modal
        animationType="slide"
        visible={modalVisible}
      >
        <View style={styles.awardContainer} >
          <Image
            source={require('@/assets/images/congrats.jpg')}
            style={styles.image}
            resizeMode='cover'
          />
            <Text style={styles.result}>Your award is:</Text>
            <Text style={styles.awardText}>{result && result.text}</Text>
            <ThemedButton
              onPress={() => {
                setModalVisible(!modalVisible)
                router.dismiss(2)
              }}
              icon='newspaper-outline'
              typeButton='Secondary'
            >New survey</ThemedButton>
        </View>
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
  awardText:{
    marginTop: 20,
    fontFamily: 'MontserratBold',
    marginBottom: 20,
    fontSize: 28},
  image: {
    width: 250,
    height: 250},
  awardContainer:{
    marginTop: 20,
    alignItems: 'center',
    flex: 1,},
  result: {
    fontFamily: 'MontserratRegular',}
})