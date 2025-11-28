import { FlatList, StyleSheet, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Client, getAllClients } from '@/services/dataService'
import ClientItem from '@/components/ClientItem'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'

const UsersScreen = () => {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [clients, setClients] = useState<Client[] | null>([])

  useEffect(() => {
    onPullToRefresh()
    return () => {
      setIsRefreshing(false)
      setClients([])
    }
  },[])

  const onPullToRefresh = async() => {
    setIsRefreshing(true)
    const result = await getAllClients()
    setClients(result)
    setIsRefreshing(false)
  }

  const deleteClient = (id:number) => {
    console.log('delete ', id)
  }
  const checkVisits = (id:number) => {
    router.push(`./${id}`)
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={clients}
        keyExtractor={(item) => item.email}
        renderItem={({ item }) => (
          <ClientItem
            key={item.email}
            id={item.id}
            email={item.email}
            visits={item.visits}
            onPress={deleteClient}
            onRedirect={checkVisits}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onPullToRefresh} />
        }
      />
    </SafeAreaView>
  )
}

export default UsersScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginVertical: 15,
    marginHorizontal: 15,
    borderRadius: 10,
    paddingHorizontal: 10},
  headerContainer: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    alignItems: 'center'},
  headerText: {
    fontFamily: 'MontserratBold',
    fontSize: 20},
})