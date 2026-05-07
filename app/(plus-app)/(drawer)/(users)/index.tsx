import { FlatList, StyleSheet, RefreshControl, Text, View, NativeSyntheticEvent, NativeScrollEvent, ActivityIndicator } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Client, getAllClients } from '@/services/dataService'
import ClientItem from '@/components/ClientItem'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router, useFocusEffect } from 'expo-router'
import GeneralContentView from '@/components/GeneralContentView'
import SearchInput from '@/components/SearchInput'
import debounce from '@/helpers/utils'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const UsersScreen = () => {
  const insets = useSafeAreaInsets()
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [clients, setClients] = useState<Client[] | null>(null)
  const [deleteView, setDeleteView] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0)

  const loadData = useCallback(() => {
    onPullToRefresh()
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData])
  );

  useEffect(() => {
    handleSearch(searchQuery)
  }, [searchQuery])

  const handleSearch = useCallback(debounce(async (query: string) => {
    setIsLoading(true)
    const result = await getAllClients(query)
    setClients(result)
    setIsLoading(false)
  }, 500), [])

  const onPullToRefresh = async () => {
    setIsRefreshing(true)
    const result = await getAllClients('', 0)
    setClients(result)
    setIsRefreshing(false)
    setPage(0)
  }

  const deleteClient = (id: number) => {
    console.log('delete ', id)
  }

  const checkVisits = (id: number) => {
    router.push(`./${id}`)
  }

  async function handleLoadMore(info: { distanceFromEnd: number }): Promise<void> {
    if (info.distanceFromEnd < 0) return;
    const nextOffSet = page + 1
    const result = await getAllClients('', nextOffSet)
    if (!result) return
    setClients(prevClients => prevClients === null ? result : [...prevClients, ...result])
    setPage(nextOffSet)
  }

  return (
    <GeneralContentView>
      <SafeAreaView style={{ flex: 1, marginBottom: insets.bottom }}>
        {
          clients?.length === 0 && (<View style={styles.container}>
            <Text style={styles.headerText}>You do not have any registered clients.</Text>
          </View>)
        }
        {clients && clients.length > 0 && (
          <SearchInput
            placeholder='Search client'
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
        )}
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
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
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
  loader: {
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center'
  }
})