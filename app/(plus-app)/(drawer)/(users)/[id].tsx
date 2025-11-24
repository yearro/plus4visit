import { View, Text, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams,router } from 'expo-router'
import { getUserOpinions, Opinion } from '@/services/dataService'


const VisitsForUser = () => {
  const { id } = useLocalSearchParams()
  const [opinions, setOpinions] = useState<Opinion[] | null>([])

  useEffect(() => {
    const fetchOpinions = async () => {
      const result = await getUserOpinions(Number(id))
      console.log(result)
      setOpinions(result)
    };
    fetchOpinions();
  }, []);

  return (
    <View>
      <Text>VisitsForUser {id}</Text>
      <Button
      title="Go Back"
      onPress={() => router.back()}
    />
    </View>
  )
}

export default VisitsForUser