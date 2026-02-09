import { useState, useEffect, useCallback } from 'react';
import {
    Box,
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Chip,
    Alert,
    Snackbar,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    CircularProgress
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PetsIcon from '@mui/icons-material/Pets';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PetFormModal from './PetFormModal';
import { api } from '../../api/client';

const PetManagement = () => {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formOpen, setFormOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedPet, setSelectedPet] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    const fetchPets = useCallback(async () => {
        try {
            const response = await api.getAllPets();
            setPets(response.data.pets);
        } catch (error) {
            console.error('Error fetching pets:', error);
            setSnackbar({
                open: true,
                message: 'Error al cargar las mascotas',
                severity: 'error'
            });
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPets();
    }, [fetchPets]);

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

    const handleCreate = () => {
        setSelectedPet(null);
        setFormOpen(true);
    };

    const handleEdit = (pet) => {
        setSelectedPet(pet);
        setFormOpen(true);
    };

    const handleDeleteClick = (pet) => {
        setSelectedPet(pet);
        setDeleteDialogOpen(true);
    };

    const handleSave = async (formData) => {
        let savedPet;
        if (selectedPet) {
            // Update existing pet
            const response = await api.updatePet(selectedPet._id, formData);
            savedPet = response.data.pet;
            setSnackbar({
                open: true,
                message: 'Mascota actualizada exitosamente',
                severity: 'success'
            });
        } else {
            // Create new pet
            const response = await api.createPet(formData);
            savedPet = response.data.pet;
            setSnackbar({
                open: true,
                message: 'Mascota creada exitosamente',
                severity: 'success'
            });
        }
        fetchPets();
        return savedPet;
    };

    const handleUploadImage = async (petId, formData) => {
        await api.uploadPetImage(petId, formData);
        fetchPets();
    };

    const handleDelete = async () => {
        try {
            await api.deletePet(selectedPet._id);
            setSnackbar({
                open: true,
                message: 'Mascota eliminada exitosamente',
                severity: 'success'
            });
            fetchPets();
        } catch (error) {
            setSnackbar({
                open: true,
                message: 'Error al eliminar la mascota',
                severity: 'error'
            });
        } finally {
            setDeleteDialogOpen(false);
            setSelectedPet(null);
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" component="h2">
                    Gestión de Mascotas
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleCreate}
                >
                    Nueva Mascota
                </Button>
            </Box>

            {pets.length === 0 ? (
                <Alert severity="info">
                    No hay mascotas registradas. ¡Agrega la primera!
                </Alert>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: 'primary.main' }}>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Nombre</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Especie</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Raza</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Edad</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Ubicación</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Estado</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="right">Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {pets.map((pet) => (
                                <TableRow key={pet._id} hover>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <PetsIcon color="primary" fontSize="small" />
                                            {pet.name}
                                        </Box>
                                    </TableCell>
                                    <TableCell>{pet.specie}</TableCell>
                                    <TableCell>{pet.breed || '-'}</TableCell>
                                    <TableCell>{calculateAge(pet.birthDate)}</TableCell>
                                    <TableCell>
                                        {pet.location ? (
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                <LocationOnIcon fontSize="small" color="action" />
                                                {pet.location}
                                            </Box>
                                        ) : '-'}
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={pet.adopted ? 'Adoptado' : 'Disponible'}
                                            color={pet.adopted ? 'success' : 'info'}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            color="primary"
                                            onClick={() => handleEdit(pet)}
                                            size="small"
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            color="error"
                                            onClick={() => handleDeleteClick(pet)}
                                            size="small"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {/* Pet Form Modal */}
            <PetFormModal
                open={formOpen}
                onClose={() => setFormOpen(false)}
                onSave={handleSave}
                onUploadImage={handleUploadImage}
                pet={selectedPet}
            />

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
            >
                <DialogTitle>Confirmar Eliminación</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ¿Estás seguro de que deseas eliminar a <strong>{selectedPet?.name}</strong>?
                        Esta acción no se puede deshacer.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>
                        Cancelar
                    </Button>
                    <Button onClick={handleDelete} color="error" variant="contained">
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar for notifications */}
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
        </Box>
    );
};

export default PetManagement;
