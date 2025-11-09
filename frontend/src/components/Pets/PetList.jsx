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
      setError('Failed to load pets');
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
        Available Pets
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <TextField
          label="Search pets"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ minWidth: 200 }}
        />

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Filter</InputLabel>
          <Select
            value={filter}
            label="Filter"
            onChange={(e) => setFilter(e.target.value)}
          >
            <MenuItem value="all">All Pets</MenuItem>
            <MenuItem value="available">Available</MenuItem>
            <MenuItem value="adopted">Adopted</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {filteredPets.length === 0 ? (
        <Alert severity="info">
          No pets found matching your criteria.
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
