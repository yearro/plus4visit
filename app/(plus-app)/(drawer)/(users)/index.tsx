import { FlatList, StyleSheet, RefreshControl, Text, View, TextInput } from 'react-native'
import React, { useCallback, useState } from 'react'
import { Client, getAllClients } from '@/services/dataService'
import ClientItem from '@/components/ClientItem'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router, useFocusEffect } from 'expo-router'
import GeneralContentView from '@/components/GeneralContentView'

const UsersScreen = () => {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [clients, setClients] = useState<Client[] | null>(null)
  const [deleteView, setDeleteView] = useState(false)

  const loadData = useCallback(() => {
    onPullToRefresh()
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData])
  );

  const onPullToRefresh = async () => {
    setIsRefreshing(true)
    const result = await getAllClients()
    setClients(result)
    setIsRefreshing(false)
  }

  const deleteClient = (id: number) => {
    console.log('delete ', id)
  }
  const checkVisits = (id: number) => {
    router.push(`./${id}`)
  }

  return (
    <GeneralContentView>
      <SafeAreaView >
        {
          clients?.length === 0 && (<View style={styles.container}>
            <Text style={styles.headerText}>You do not have any registered clients.</Text>
          </View>)
        }
        <View>
          <TextInput
            placeholder='Search client'
          />
        </View>
        <FlatList
          data={clients}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <ClientItem
              key={item.name}
              id={item.id}
              name={item.name}
              visits={item.visits}
              onPress={deleteClient}
              onRedirect={checkVisits}
              deleteView={deleteView}
            />
          )}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onPullToRefresh} />
          }
        />
      </SafeAreaView>
    </GeneralContentView>
  )
}

export default UsersScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginVertical: 15,
    marginHorizontal: 15,
    borderRadius: 10,
    paddingHorizontal: 10
  },
  headerContainer: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    alignItems: 'center'
  },
  headerText: {
    fontFamily: 'MontserratBold',
    fontSize: 20
  },
})