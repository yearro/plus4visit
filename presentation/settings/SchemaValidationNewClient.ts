import * as Yup from 'yup';
import { NAME_RE } from '@/constants/validations'
export const newClientValidationSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters')
    .max(256, 'Name must be at most 256 characters')
    .matches(NAME_RE, "Invalid name format, only letters are allowed"),
});