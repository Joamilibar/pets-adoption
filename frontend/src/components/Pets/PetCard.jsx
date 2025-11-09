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
        message: 'Please login to adopt a pet',
        severity: 'warning'
      });
      return;
    }

    setLoading(true);
    try {
      await api.createAdoption(user.id, pet._id);
      setSnackbar({
        open: true,
        message: `Successfully adopted ${pet.name}!`,
        severity: 'success'
      });
      if (onAdoptSuccess) {
        onAdoptSuccess();
      }
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to adopt pet';
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
      return `${ageInMonths} month${ageInMonths !== 1 ? 's' : ''}`;
    }
    const years = Math.floor(ageInMonths / 12);
    return `${years} year${years !== 1 ? 's' : ''}`;
  };

  return (
    <>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardMedia
          component="img"
          height="200"
          image={pet.image || 'https://via.placeholder.com/300x200?text=No+Image'}
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
                label="Adopted" 
                color="success" 
                size="small"
                icon={<FavoriteIcon />}
              />
            )}
          </Box>

          <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
            <Chip 
              icon={<PetsIcon />}
              label={pet.specie} 
              size="small" 
              variant="outlined"
            />
            <Chip 
              label={calculateAge(pet.birthDate)} 
              size="small" 
              variant="outlined"
            />
          </Box>

          {pet.owner && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Owner: {pet.owner.first_name} {pet.owner.last_name}
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
              {loading ? 'Adopting...' : 'Adopt Me'}
            </Button>
          )}
          {!pet.adopted && !isAuthenticated && (
            <Button
              fullWidth
              variant="outlined"
              disabled
            >
              Login to Adopt
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
