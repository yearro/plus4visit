import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

interface iProps {
  id: number;
  name: string;
  visits: number;
  onPress: (arg: number) => void,
  onRedirect: (arg: number) => void,
  deleteView?: boolean;
}

const ClientItem = ({ id, name, visits, onPress, onRedirect, deleteView = false }: iProps) => {
  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        onPress={() => onRedirect(id)}
        style={styles.itemInformation}
      >
        <Text numberOfLines={1} ellipsizeMode="middle" style={styles.text}>{name}</Text>
        <View style={styles.visitsContainer}>
          <Text style={styles.totalVisits}>{visits}</Text>
          <Text style={styles.visits}>visits</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        {deleteView && (
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
        )}
      </View>
    </View>
  )
}

export default ClientItem

const styles = StyleSheet.create({
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginVertical: 7,
  },
  itemInformation: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontFamily: 'MontserratBold',
    marginLeft: 10,
    textTransform: 'capitalize',

  },
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
  visitsContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  visits: {
    fontSize: 18,
    fontFamily: 'MontserratLight'
  },
  totalVisits: {
    fontSize: 24,
    fontFamily: 'MontserratBold'
  }
})