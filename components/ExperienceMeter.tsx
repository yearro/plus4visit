import { Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'

interface iProps {
  onPress: (arg0:number) => void;
}

const ExperienceMeter = ({ onPress }: iProps) => {
  const satisfactionLevel = [
    {
      id: 1,
      title: 'Excellent',
      src: require('@/assets/images/5nivel.png'),
      borderColor: '#5f9869'
    }, {
      id: 2,
      title: 'Good',
      src: require('@/assets/images/4nivel.png'),
      borderColor: '#77c17a'
    }, {
      id: 3,
      title: 'Acceptable',
      src: require('@/assets/images/3nivel.png'),
      borderColor: '#ebaf36'
    }, {
      id: 4,
      title: 'Fair',
      src: require('@/assets/images/2nivel.png'),
      borderColor: '#e3701d'
    }, {
      id: 5,
      title: 'Poor',
      src: require('@/assets/images/1nivel.png'),
      borderColor: '#de493d'
    }
  ]

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