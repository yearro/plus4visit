import { Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { satisfactionLevel } from '@/helpers/imagestList';

interface iProps {
  onPress: (arg0:number) => void;
}

const ExperienceMeter = ({ onPress }: iProps) => {
  return (
    <ScrollView style={styles.container}>
      {
        satisfactionLevel.map((item) => (
          <TouchableOpacity
            key={`img-${item.id}`}
            style={[styles.button, { borderColor: item.borderColor }]}
            onPress={() => onPress(item.id)}
          >
            <Image
              source={item.src}
              style={styles.image}
            /><Text style={styles.title}>{item.title}</Text>
          </TouchableOpacity>
        ))
      }
    </ScrollView>
  )
}

export default ExperienceMeter

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 3,
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: 'white'
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 10
  },
  title: {
    fontFamily: 'MontserratBold',
    fontSize: 17
  }
})