import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
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
    Link
} from '@mui/material';
import { api } from '../../api/client';
import { forgotPasswordSchema } from '../../utils/validators';

const ForgotPassword = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(forgotPasswordSchema)
    });

    const onSubmit = async (data) => {
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const response = await api.forgotPassword(data.email);
            setSuccess(response.data.message);
        } catch (err) {
            setError(err.response?.data?.error || 'Ocurrió un error inesperado');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 8 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom align="center">
                    Recuperar Contraseña
                </Typography>

                <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
                    Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                {success && (
                    <Alert severity="success" sx={{ mb: 2 }}>
                        {success}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Correo Electrónico"
                        autoComplete="email"
                        autoFocus
                        {...register('email')}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={loading}
                    >
                        {loading ? 'Enviando...' : 'Enviar Enlace de Recuperación'}
                    </Button>

                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="body2">
                            ¿Recordaste tu contraseña?{' '}
                            <Link component={RouterLink} to="/login">
                                Volver a iniciar sesión
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default ForgotPassword;
