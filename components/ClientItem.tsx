import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

interface iProps {
  id: number;
  email: string;
  visits: number;
  onPress: (arg:number) => void,
  onRedirect: (arg:number) => void,
}

const ClientItem = ({id, email, visits, onPress, onRedirect}:iProps) => {
  return (
    <View style={styles.clientContainer}>
      <View style={{ flex: 1 }}>
        <Text numberOfLines={1} ellipsizeMode="middle" style={styles.text}>{email}</Text>
        <Text style={styles.visits}>{visits} visits</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => onPress(id)}
          style={styles.button}
        >
          <Ionicons
            name='trash-outline'
            size={30}
            color={'red'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onRedirect(id)}
          style={styles.button}
        >
          <Ionicons
            name='chevron-forward-outline'
            size={30}
            color={'black'}
          />
        </TouchableOpacity>
      </View>
      
    </View>
  )
}

export default ClientItem

const styles = StyleSheet.create({
  clientContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginVertical: 10,
    paddingBottom: 10,
    },
  text: {
    fontSize: 18,
    fontFamily: 'MontserratBold'},
  buttonContainer: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  button: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  visits: {
    fontSize: 18,
    fontFamily: 'MontserratLight'
  }
})