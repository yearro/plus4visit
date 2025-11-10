import * as Yup from 'yup';
import { EMAIL_RE } from '@/constants/validations'
export const newClientValidationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .matches(EMAIL_RE, "Invalid email address"),
});