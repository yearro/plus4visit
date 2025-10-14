import * as Yup from 'yup';
export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  pass: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});