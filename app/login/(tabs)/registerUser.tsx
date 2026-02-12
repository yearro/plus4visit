import React  from 'react'
import LoginForm from '@/components/LoginForm'
import AccessView from '@/components/AccessView'

const RegisterUserScreen = () => {
  return (
    <AccessView>
      <LoginForm isNewUser />
    </AccessView>
  )
}

export default RegisterUserScreen