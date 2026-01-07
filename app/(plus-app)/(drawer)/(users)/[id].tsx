import { Text, Button, StyleSheet, FlatList, View, Image, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams,router } from 'expo-router'
import { getUserOpinions, Opinion } from '@/services/dataService'
import ClientSensation from '@/components/ClientSensation'
import { Ionicons } from '@expo/vector-icons'

const VisitsForUser = () => {
  const { id } = useLocalSearchParams()
  const [opinions, setOpinions] = useState<Opinion[] | null>([])
  useEffect(() => {
    const fetchOpinions = async () => {
      const result = await getUserOpinions(Number(id))
      setOpinions(result)
    };
    fetchOpinions();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }} >
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.button}
        >
          <Ionicons
            name={'chevron-back-outline'}
            size={30}
            color={'black'}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Customer satisfaction:</Text>
      </View>
      <ClientSensation data={opinions} />
      {
        opinions?.length !== 0 && (
          <>
            <Text style={styles.title}>Customer opinions:</Text>
            <FlatList
              data={opinions}
              keyExtractor={item => `${item.id}` }
              renderItem={({item}) => {
                if(item.opinion.length == 0)
                  return null
                return (
                  <View style={styles.opinionContainer}>
                    <Text style={styles.opinionText}>{ item.opinion }</Text>
                  </View>)
              }}
            />
          </>
        )
      }
    </SafeAreaView>
  )
}

export default VisitsForUser

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginVertical: 15,
    marginHorizontal: 15,
    borderRadius: 10,
    flex: 1,
    paddingHorizontal: 10},
  title:{
    fontFamily: 'MontserratBold',
    fontSize: 17,
    marginBottom: 15,},
  opinionContainer: {
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15},
  opinionText: {
    fontFamily: 'MontserratLight',
    fontSize: 16},
  button: {
    width: 44,
    height: 44,
  }
})