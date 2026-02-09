import * as yup from 'yup';

/**
 * Esquema de validación para formulario de registro
 */
export const registerSchema = yup.object({
  first_name: yup
    .string()
    .required('El nombre es obligatorio')
    .min(2, 'El nombre debe tener al menos 2 caracteres'),
  last_name: yup
    .string()
    .required('El apellido es obligatorio')
    .min(2, 'El apellido debe tener al menos 2 caracteres'),
  email: yup
    .string()
    .required('El correo electrónico es obligatorio')
    .email('Formato de correo electrónico inválido'),
  password: yup
    .string()
    .required('La contraseña es obligatoria')
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),
  confirmPassword: yup
    .string()
    .required('Por favor confirma tu contraseña')
    .oneOf([yup.ref('password')], 'Las contraseñas deben coincidir')
}).required();

/**
 * Esquema de validación para formulario de inicio de sesión
 */
export const loginSchema = yup.object({
  email: yup
    .string()
    .required('El correo electrónico es obligatorio')
    .email('Formato de correo electrónico inválido'),
  password: yup
    .string()
    .required('La contraseña es obligatoria')
}).required();

/**
 * Esquema de validación para formulario de mascota
 */
export const petSchema = yup.object({
  name: yup
    .string()
    .required('El nombre de la mascota es obligatorio')
    .min(2, 'El nombre debe tener al menos 2 caracteres'),
  specie: yup
    .string()
    .required('La especie es obligatoria'),
  birthDate: yup
    .date()
    .required('La fecha de nacimiento es obligatoria')
    .max(new Date(), 'La fecha de nacimiento no puede ser en el futuro')
}).required();

/**
 * Esquema de validación para actualización de perfil de usuario
 */
export const profileSchema = yup.object({
  first_name: yup
    .string()
    .required('El nombre es obligatorio')
    .min(2, 'El nombre debe tener al menos 2 caracteres'),
  last_name: yup
    .string()
    .required('El apellido es obligatorio')
    .min(2, 'El apellido debe tener al menos 2 caracteres'),
  email: yup
    .string()
    .required('El correo electrónico es obligatorio')
    .email('Formato de correo electrónico inválido')
}).required();

/**
 * Esquema de validación para formulario de recuperar contraseña
 */
export const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .required('El correo electrónico es obligatorio')
    .email('Formato de correo electrónico inválido')
}).required();

/**
 * Esquema de validación para formulario de restablecer contraseña
 */
export const resetPasswordSchema = yup.object({
  password: yup
    .string()
    .required('La contraseña es obligatoria')
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),
  confirmPassword: yup
    .string()
    .required('Por favor confirma tu contraseña')
    .oneOf([yup.ref('password')], 'Las contraseñas deben coincidir')
}).required();
