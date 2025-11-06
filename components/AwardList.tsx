import { View, Text, StyleSheet } from 'react-native'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import ThemedButton from './ThemedButton'
import { Award } from '@/presentation/auth/interfaces'
import AwardItem from './AwardItem'
import { MAX_NUMBER_AWARDS } from '@/constants/awards'

interface iProps {
  awards: Award[],
  setAwards: Dispatch<SetStateAction<Award[]>>
}

const AwardList = ({ awards, setAwards }:iProps) => {
  const [totalAwards, setTotalAwards] = useState(0)

  const addNewAward = () => {
    if(totalAwards < MAX_NUMBER_AWARDS ) {
      setTotalAwards(state => state + 1)
      setAwards([...awards, { ind: totalAwards, name: '' } ])
    }
  }

  const updateValue = (ind:number, value:string) => {
    const rest = awards.filter((item) => item.ind !== ind)
    setAwards([...rest, { ind: ind, name: value }].sort((a, b) => a.ind - b.ind))
  }

  const removeAward = (ind: number) => {
    console.log('remove ', ind)
  }

  return (
    <>
      <View style={styles.headerSection}>
        <Text style={ styles.title }>Awards : { totalAwards }</Text>
        <ThemedButton
          onPress={() => addNewAward()}
          icon='add-circle-outline'
        >New Award</ThemedButton>
      </View>
      <Text
        style={styles.description}
      >You can define a maximum of {MAX_NUMBER_AWARDS} different prizes.</Text>
      <View>
        { awards.map((award) => (
            <AwardItem
              key={award.ind}
              ind={award.ind}
              name={award.name}
              remove={removeAward}
              onChangeText={updateValue}
            />
        )) }
      </View>
    </>
  )
}

export default AwardList

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontFamily: 'MontserratBold'
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  description: {
    fontSize: 16,
    fontFamily: 'MontserratLight',
    marginVertical: 15
  },
})