import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

interface iProps {
  id: number;
  email: string;
  visits: number;
  onPress: (arg:number) => void
}

const ClientItem = ({id, email, visits, onPress}:iProps) => {
  return (
    <View style={styles.clientContainer}>
      <View>
        <Text style={styles.text}>{email}</Text>
        <Text style={styles.visits}>{visits} visits</Text>
      </View>
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
    marginHorizontal: 10,
    marginVertical: 10,
    paddingBottom: 10,
    justifyContent: 'space-between'},
  text: {
    fontSize: 18,
    fontFamily: 'MontserratBold'},
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