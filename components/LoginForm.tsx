import React from 'react'
import { Text, View } from 'react-native'
import { Formik } from 'formik'
import ThemedTextInput from './ThemedTextInput'
import ThemedButton from './ThemedButton'
import { loginValidationSchema } from '@/presentation/auth/SchemaValidationLogin'
import { Ionicons } from '@expo/vector-icons'

const ErrorMessage = ({error=''}) => (
  <View style={{ flexDirection: 'row', marginBottom: 10 }}>
    <Ionicons
      name="close-circle-outline"
      size={20}
      color={'red'}
    />
      <Text style={{ color: 'red' }}> {error} </Text>
  </View>
)
const LoginForm = () => {
  return (
    <Formik
      initialValues={{ email: '', pass: '' }}
      validationSchema={ loginValidationSchema }
      onSubmit={values => console.log(values)}
    >
      {({ handleChange, handleSubmit, values, errors, touched }) => (
        <>
          <ThemedTextInput
            icon='mail-outline'
            typeInput='Secondary'
            placeholder='Example: myEmail@email.com'
            value={values.email}
            onChangeText={handleChange('email')}
          />
          { errors.email && touched.email &&  <ErrorMessage error={errors.email} /> }
          <ThemedTextInput
            icon='lock-closed-outline'
            typeInput='Secondary'
            placeholder='Write your password'
            value={values.pass}
            onChangeText={handleChange('pass')}
          />
          { errors.pass && touched.pass && <ErrorMessage error={errors.pass} /> }
          
          <ThemedButton
            onPress={() => handleSubmit()}
            icon='log-in-outline'
            typeButton='Secondary'
          >Login</ThemedButton>
        </>
      )}
    </Formik>
  )
}

export default LoginForm