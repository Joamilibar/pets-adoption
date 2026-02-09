import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Link,
  Grid
} from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { registerSchema } from '../../utils/validators';

const Register = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(registerSchema)
  });

  const onSubmit = async (data) => {
    setError('');
    setLoading(true);

    try {
      // Remove confirmPassword before sending to API
      const { confirmPassword, ...userData } = data;

      const result = await registerUser(userData);

      if (result.success) {
        navigate('/login', {
          state: { message: '¡Registro exitoso! Por favor inicia sesión.' }
        });
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Ocurrió un error inesperado');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Registrarse
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nombre"
                autoFocus
                {...register('first_name')}
                error={!!errors.first_name}
                helperText={errors.first_name?.message}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Apellido"
                {...register('last_name')}
                error={!!errors.last_name}
                helperText={errors.last_name?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Correo Electrónico"
                autoComplete="email"
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Contraseña"
                type="password"
                autoComplete="new-password"
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Confirmar Contraseña"
                type="password"
                autoComplete="new-password"
                {...register('confirmPassword')}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? 'Registrando...' : 'Registrarse'}
          </Button>

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2">
              ¿Ya tienes una cuenta?{' '}
              <Link component={RouterLink} to="/login">
                Inicia sesión aquí
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
