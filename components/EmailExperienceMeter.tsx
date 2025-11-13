import { View } from 'react-native'
import React, { useState } from 'react'
import ThemedTextInput from './ThemedTextInput'
import ErrorMessage from './ErrorMessage'
import ThemedButton from './ThemedButton'
import { newClientValidationSchema } from '@/presentation/settings/SchemaValidationNewClient'

interface iProps {
  email: string,
  onSuccess: (arg0:string) => void;
}

const EmailExperienceMeter = ({ email='', onSuccess }: iProps) => {
  const [clientEmail, setClientEmail] = useState(email)
  const [emailError, setEmailError] = useState('')

  const saveClient = () => {
      newClientValidationSchema
        .validate({ email: clientEmail})
        .then(() => {
          onSuccess(clientEmail)
        })
        .catch((error) => {
          setEmailError(error.message)
        })
    }
  return (
    <>
      <ThemedTextInput
        icon={'mail-outline'}
        value={clientEmail}
        onChangeText={setClientEmail}
        typeInput='Primary'
        placeholder='Example: your_email@email.com'
      />
      <View style={{ alignItems: 'center'}}>
        {
          emailError.length !== 0 &&
          (<ErrorMessage type='Secondary' error={emailError} />)
        }
      </View>
      <ThemedButton
        onPress={() => saveClient()}
        icon='gift-outline'
        typeButton='Secondary'
      >Write your email address:</ThemedButton>
    </>
  )
}

export default EmailExperienceMeter