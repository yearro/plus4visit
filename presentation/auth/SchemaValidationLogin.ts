import * as Yup from 'yup';
import { EMAIL_RE } from '@/constants/validations'

export const baseLoginSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .matches(EMAIL_RE, "Invalid email address"),
  pass: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required')
    .matches(/[0-9]/, 'Password requires a number')
    .matches(/[a-z]/, 'Password requires a lowercase letter')
    .matches(/[A-Z]/, 'Password requires an uppercase letter')
    .matches(/[^\w]/, 'Password requires a symbol'),
});

export const additionalNewUserSchema = Yup.object().shape({
  name: Yup.string()
    .min(6, 'Name must be at least 6 characters')
    .max(80, 'Name must be maximum of 80 characters')
    .required('Name is required'),
})

export const addNewUserSchema = baseLoginSchema.concat(additionalNewUserSchema)