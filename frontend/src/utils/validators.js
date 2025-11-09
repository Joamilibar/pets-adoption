import * as yup from 'yup';

/**
 * Registration form validation schema
 */
export const registerSchema = yup.object({
  first_name: yup
    .string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters'),
  last_name: yup
    .string()
    .required('Last name is required')
    .min(2, 'Last name must be at least 2 characters'),
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email format'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match')
}).required();

/**
 * Login form validation schema
 */
export const loginSchema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email format'),
  password: yup
    .string()
    .required('Password is required')
}).required();

/**
 * Pet form validation schema
 */
export const petSchema = yup.object({
  name: yup
    .string()
    .required('Pet name is required')
    .min(2, 'Name must be at least 2 characters'),
  specie: yup
    .string()
    .required('Species is required'),
  birthDate: yup
    .date()
    .required('Birth date is required')
    .max(new Date(), 'Birth date cannot be in the future')
}).required();

/**
 * User profile update validation schema
 */
export const profileSchema = yup.object({
  first_name: yup
    .string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters'),
  last_name: yup
    .string()
    .required('Last name is required')
    .min(2, 'Last name must be at least 2 characters'),
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email format')
}).required();
