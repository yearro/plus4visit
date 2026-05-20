import React from 'react'
import { Formik } from 'formik'
import ThemedTextInput from './ThemedTextInput'
import ThemedButton from './ThemedButton'
import { addNewUserSchema, baseLoginSchema } from '@/presentation/auth/SchemaValidationLogin'
import { useAuthStore } from '@/presentation/auth/useAuthStore'
import { router } from 'expo-router'
import ErrorMessage from './ErrorMessage'
import { Alert } from 'react-native'

interface iProps {
  isNewUser?: boolean
}

const LoginForm = ({ isNewUser = false }: iProps) => {
  const { login } = useAuthStore()
  const buttonTitle = isNewUser ? 'Create User' : 'Signed in'
  const onSubmitParams = async ({ email = '', pass = '', name = '' }) => {
    const state = await login(email, pass, name, isNewUser)
    if (!state) {
      Alert.alert(
        isNewUser ? 'Sign Up Failed' : 'Authentication Failed',
        'Verify the information',);
    }
    if (state) {
      router.replace('/(plus-app)/(drawer)/(users)')
      return
    }
  }

  return (
    <Formik
      initialValues={{ email: '', pass: '', name: '' }}
      validationSchema={isNewUser ? addNewUserSchema : baseLoginSchema}
      onSubmit={onSubmitParams}
    >
      {({ handleChange, handleSubmit, values, errors, touched }) => (
        <>
          {isNewUser && (
            <>
              <ThemedTextInput
                icon='person-outline'
                typeInput='Secondary'
                placeholder='Write your name'
                value={values.name}
                onChangeText={handleChange('name')}
              />
              {errors.name && touched.name && <ErrorMessage error={errors.name} />}
            </>
          )}

          <ThemedTextInput
            icon='mail-outline'
            typeInput='Secondary'
            placeholder='Example: myemail@email.com'
            value={values.email}
            onChangeText={handleChange('email')}
          />
          {errors.email && touched.email && <ErrorMessage error={errors.email} />}
          <ThemedTextInput
            icon='lock-closed-outline'
            typeInput='Secondary'
            placeholder='Write your password'
            value={values.pass}
            onChangeText={handleChange('pass')}
          />
          {errors.pass && touched.pass && <ErrorMessage error={errors.pass} />}

          <ThemedButton
            onPress={() => handleSubmit()}
            icon='log-in-outline'
            typeButton='Secondary'
          >{buttonTitle}</ThemedButton>
        </>
      )}
    </Formik>
  )
}

export default LoginForm