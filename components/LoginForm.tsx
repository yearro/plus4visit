import React from 'react'
import { Text, View } from 'react-native'
import { Formik } from 'formik'
import ThemedTextInput from './ThemedTextInput'
import ThemedButton from './ThemedButton'
import { loginValidationSchema } from '@/presentation/auth/SchemaValidationLogin'
import { Ionicons } from '@expo/vector-icons'
import Test from './Test'

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
          { errors.email && touched.email && <Text>{errors.email}</Text> }
          <ThemedTextInput
            icon='lock-closed-outline'
            typeInput='Secondary'
            placeholder='Write your password'
            value={values.pass}
            onChangeText={handleChange('pass')}
          />
          { errors.pass && touched.pass && <Text>{errors.pass}</Text> }


          <Test error='a ver que pasa' />


          
          <View style={{ flexDirection: 'row', flex: 1, backgroundColor: 'white' }}>
            <Ionicons
              name="close-circle-outline"
              size={20}
            />
              <Text> nada</Text>
          </View>
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