import { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  CircularProgress,
  Box,
  Alert
} from '@mui/material';
import AdoptionCard from './AdoptionCard';
import { api } from '../../api/client';

const AdoptionList = () => {
  const [adoptions, setAdoptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAdoptions = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await api.getUserAdoptions();
        setAdoptions(response.data.adoptions);
      } catch (err) {
        setError('Error al cargar las adopciones');
        console.error('Error fetching adoptions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdoptions();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Mis Adopciones
      </Typography>

      {adoptions.length === 0 ? (
        <Alert severity="info" sx={{ mt: 2 }}>
          Aún no has adoptado ninguna mascota. ¡Visita la pestaña de Mascotas para encontrar a tu compañero perfecto!
        </Alert>
      ) : (
        <Grid container spacing={3} sx={{ mt: 1 }}>
          {adoptions.map((adoption) => (
            <Grid item xs={12} sm={6} md={4} key={adoption._id}>
              <AdoptionCard adoption={adoption} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default AdoptionList;
