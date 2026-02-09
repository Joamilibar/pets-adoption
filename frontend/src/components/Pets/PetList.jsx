import { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  CircularProgress,
  Box,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField
} from '@mui/material';
import PetCard from './PetCard';
import { api } from '../../api/client';

const PetList = () => {
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all'); // all, available, adopted
  const [searchTerm, setSearchTerm] = useState('');

  const fetchPets = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.getAllPets();
      setPets(response.data.pets);
      setFilteredPets(response.data.pets);
    } catch (err) {
      setError('Error al cargar las mascotas');
      console.error('Error fetching pets:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  useEffect(() => {
    let result = pets;

    // Apply adoption filter
    if (filter === 'available') {
      result = result.filter(pet => !pet.adopted);
    } else if (filter === 'adopted') {
      result = result.filter(pet => pet.adopted);
    }

    // Apply search filter
    if (searchTerm) {
      result = result.filter(pet =>
        pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pet.specie.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredPets(result);
  }, [filter, searchTerm, pets]);

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
        Mascotas Disponibles
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <TextField
          label="Buscar mascotas"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ minWidth: 200 }}
        />

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Filtrar</InputLabel>
          <Select
            value={filter}
            label="Filtrar"
            onChange={(e) => setFilter(e.target.value)}
          >
            <MenuItem value="all">Todas</MenuItem>
            <MenuItem value="available">Disponibles</MenuItem>
            <MenuItem value="adopted">Adoptadas</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {filteredPets.length === 0 ? (
        <Alert severity="info">
          No se encontraron mascotas que coincidan con tu búsqueda.
        </Alert>
      ) : (
        <Grid container spacing={3}>
          {filteredPets.map((pet) => (
            <Grid item xs={12} sm={6} md={4} key={pet._id}>
              <PetCard pet={pet} onAdoptSuccess={fetchPets} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default PetList;
