import * as SecureStore from 'expo-secure-store'
import { Alert } from 'react-native'

export const SecureStoreSetItem = async( key:string, value:string ) => {
  try {
    return await SecureStore.setItemAsync(key, value)
  } catch (error) {
    Alert.alert(`Problems saving ${value}`)
  }
}

export const SecureStoreGetItem = async( key:string ) => {
  try {
    return await SecureStore.getItemAsync(key)
  } catch (error) {
     Alert.alert(`Problems getting ${key}`)
  }
}

export const SecureStoreDeleteItem = async ( key:string ) => {
  try {
    return await SecureStore.deleteItemAsync(key)
  } catch (error) {
    Alert.alert(`Problems deleting ${key}`)
  }
}