import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Opinion } from '@/services/dataService';
import { satisfactionLevel } from '@/helpers/imagestList';

interface iProps {
  data: Opinion[] | null;
}

interface sensations {
  Excellent: number;
  Good: number;
  Acceptable: number;
  Fair: number;
  Poor: number;
}

type sensationsKeys = keyof sensations

const ClientSensation = ({ data }:iProps) => {
  const [clientSensation, setClientSensation] = useState({
      Excellent: 0,
      Good: 0,
      Acceptable: 0,
      Fair: 0,
      Poor: 0 })
  useEffect(() => {
    setClientSensation(prev => ({
        ...prev,
        Excellent: data?.filter((item) => item.satisfaction === 1).length as number,
        Good: data?.filter((item) => item.satisfaction === 2).length as number,
        Acceptable: data?.filter((item) => item.satisfaction === 3).length as number,
        Fair: data?.filter((item) => item.satisfaction === 4).length as number,
        Poor: data?.filter((item) => item.satisfaction === 5).length as number,
    }))
    }, [data])
  
  return (
    <View style={styles.container}>
      {
        satisfactionLevel.map((item) => {
          const title = item.title as sensationsKeys
          return(
            <View style={{ alignItems: 'center' }} key={item.title}>
            <Image
              source={item.src}
              style={styles.image}
            />
            <Text style={styles.text}>{clientSensation[title]}</Text>
          </View>
          )
        })
      }
    </View>
  )
}

export default ClientSensation

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    marginBottom: 15,
    flexDirection: 'row'},
  image: {
    marginBottom: 10,
    width: 30,
    height: 30},
  text: {
    fontFamily: 'MontserratBold',
    fontSize: 16,
  }
})