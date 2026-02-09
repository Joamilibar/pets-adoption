import { useState } from 'react';
import { useNavigate, useParams, Link as RouterLink } from 'react-router-dom';
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
import { resetPasswordSchema } from '../../utils/validators';

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(resetPasswordSchema)
    });

    const onSubmit = async (data) => {
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const response = await api.resetPassword(token, data.password);
            setSuccess(response.data.message);

            // Redirect to login after 2 seconds
            setTimeout(() => {
                navigate('/login', {
                    state: { message: '¡Contraseña restablecida! Ahora puedes iniciar sesión.' }
                });
            }, 2000);
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
                    Restablecer Contraseña
                </Typography>

                <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
                    Ingresa tu nueva contraseña para restablecer el acceso a tu cuenta.
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
                        label="Nueva Contraseña"
                        type="password"
                        autoComplete="new-password"
                        autoFocus
                        {...register('password')}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />

                    <TextField
                        margin="normal"
                        fullWidth
                        label="Confirmar Contraseña"
                        type="password"
                        autoComplete="new-password"
                        {...register('confirmPassword')}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={loading || success}
                    >
                        {loading ? 'Restableciendo...' : 'Restablecer Contraseña'}
                    </Button>

                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="body2">
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

export default ResetPassword;
