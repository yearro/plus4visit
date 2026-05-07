import { View } from 'react-native'
import React, { useState } from 'react'
import ThemedTextInput from './ThemedTextInput'
import ErrorMessage from './ErrorMessage'
import ThemedButton from './ThemedButton'
import { newClientValidationSchema } from '@/presentation/settings/SchemaValidationNewClient'

interface iProps {
  name: string,
  onSuccess: (arg0: string) => void;
}

const NameExperienceMeter = ({ name = '', onSuccess }: iProps) => {
  const [clientName, setClientName] = useState(name)
  const [nameError, setNameError] = useState('')

  const saveClient = () => {
    newClientValidationSchema
      .validate({ name: clientName })
      .then(() => {
        onSuccess(clientName)
      })
      .catch((error) => {
        setNameError(error.message)
      })
  }
  return (
    <>
      <ThemedTextInput
        icon={'person-outline'}
        value={clientName}
        onChangeText={setClientName}
        typeInput='Primary'
        placeholder='Example: John Doe'
      />
      <View style={{ alignItems: 'center' }}>
        {
          nameError.length !== 0 &&
          (<ErrorMessage type='Secondary' error={nameError} />)
        }
      </View>
      <ThemedButton
        onPress={() => saveClient()}
        icon='gift-outline'
        typeButton='Secondary'
      >Write your name:</ThemedButton>
    </>
  )
}

export default NameExperienceMeter