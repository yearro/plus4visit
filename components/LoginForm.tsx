import React from 'react'
import { Formik } from 'formik'
import ThemedTextInput from './ThemedTextInput'
import ThemedButton from './ThemedButton'
import { loginValidationSchema } from '@/presentation/auth/SchemaValidationLogin'
import { useAuthStore } from '@/presentation/auth/useAuthStore'
import { router } from 'expo-router'
import ErrorMessage from './ErrorMessage'

const LoginForm = () => {
  const { login } = useAuthStore()

  const onSubmitParams = async({ email = '', pass = '', name = ''}) => {
    const state = await login(email, pass, name)
    if(state) {
      router.replace('/(plus-app)/(drawer)/(users)')
    }
  }
  
  return (
    <Formik
      initialValues={{ email: 'nada@nada.com', pass: 'Abc1234', name: 'Yeri Armenta' }}
      validationSchema={ loginValidationSchema }
      onSubmit={onSubmitParams}
    >
      {({ handleChange, handleSubmit, values, errors, touched }) => (
        <>
          <ThemedTextInput
            icon='person-outline'
            typeInput='Secondary'
            placeholder='Write your name'
            value={values.name}
            onChangeText={handleChange('name')}
          />
          { errors.name && touched.name &&  <ErrorMessage error={errors.name} /> }
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
          >Create User</ThemedButton>
        </>
      )}
    </Formik>
  )
}

export default LoginForm