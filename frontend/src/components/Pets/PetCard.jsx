import { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
  Alert,
  Snackbar
} from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useAuth } from '../../contexts/AuthContext';
import { api } from '../../api/client';

const PetCard = ({ pet, onAdoptSuccess }) => {
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleAdopt = async () => {
    if (!isAuthenticated) {
      setSnackbar({
        open: true,
        message: 'Por favor inicia sesión para adoptar una mascota',
        severity: 'warning'
      });
      return;
    }

    setLoading(true);
    try {
      await api.createAdoption(user.id, pet._id);
      setSnackbar({
        open: true,
        message: `¡Has adoptado a ${pet.name} exitosamente!`,
        severity: 'success'
      });
      if (onAdoptSuccess) {
        onAdoptSuccess();
      }
    } catch (error) {
      const message = error.response?.data?.error || 'Error al adoptar la mascota';
      setSnackbar({
        open: true,
        message,
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateAge = (birthDate) => {
    const birth = new Date(birthDate);
    const today = new Date();
    const ageInMonths = (today.getFullYear() - birth.getFullYear()) * 12 +
      (today.getMonth() - birth.getMonth());

    if (ageInMonths < 12) {
      return `${ageInMonths} ${ageInMonths !== 1 ? 'meses' : 'mes'}`;
    }
    const years = Math.floor(ageInMonths / 12);
    return `${years} ${years !== 1 ? 'años' : 'año'}`;
  };

  return (
    <>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardMedia
          component="img"
          height="200"
          image={pet.image || 'https://via.placeholder.com/300x200?text=Sin+Imagen'}
          alt={pet.name}
          sx={{ objectFit: 'cover' }}
        />

        <CardContent sx={{ flexGrow: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="h5" component="h2">
              {pet.name}
            </Typography>
            {pet.adopted && (
              <Chip
                label="Adoptado"
                color="success"
                size="small"
                icon={<FavoriteIcon />}
              />
            )}
          </Box>

          <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap' }}>
            <Chip
              icon={<PetsIcon />}
              label={pet.specie}
              size="small"
              variant="outlined"
            />
            {pet.breed && (
              <Chip
                label={pet.breed}
                size="small"
                variant="outlined"
                color="secondary"
              />
            )}
            <Chip
              label={calculateAge(pet.birthDate)}
              size="small"
              variant="outlined"
            />
            {pet.location && (
              <Chip
                label={pet.location}
                size="small"
                variant="outlined"
                color="info"
              />
            )}
          </Box>

          {pet.owner && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Dueño: {pet.owner.first_name} {pet.owner.last_name}
            </Typography>
          )}
        </CardContent>

        <CardActions>
          {!pet.adopted && isAuthenticated && (
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleAdopt}
              disabled={loading}
              startIcon={<FavoriteIcon />}
            >
              {loading ? 'Adoptando...' : 'Adoptarme'}
            </Button>
          )}
          {!pet.adopted && !isAuthenticated && (
            <Button
              fullWidth
              variant="outlined"
              disabled
            >
              Inicia sesión para adoptar
            </Button>
          )}
        </CardActions>
      </Card>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default PetCard;
