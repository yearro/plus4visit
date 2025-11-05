import { View, Text, StyleSheet } from 'react-native'
import React, { Dispatch, SetStateAction, useState } from 'react'
import ThemedButton from './ThemedButton'
import { Award } from '@/presentation/auth/interfaces'
import AwardItem from './AwardItem'
import { MAX_NUMBER_AWARDS } from '@/constants/awards'

interface iProps {
  setAwards: Dispatch<SetStateAction<Award[]>>,
  awards: Award[]
}

const AwardList = ({setAwards, awards}:iProps) => {
  const [totalAwards, setTotalAwards] = useState(0)

  const addNewAward = () => {
    if(totalAwards < MAX_NUMBER_AWARDS ) {
      setTotalAwards(state => state + 1)
      setAwards([...awards, { ind: totalAwards, name: '' } ])
    }
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
            <AwardItem key={award.ind} ind={award.ind} name={award.name} />
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