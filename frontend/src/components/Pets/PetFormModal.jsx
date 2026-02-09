import { useState, useEffect, useRef } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box,
    Alert,
    ToggleButtonGroup,
    ToggleButton,
    Typography
} from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import UploadFileIcon from '@mui/icons-material/UploadFile';

const PetFormModal = ({ open, onClose, onSave, pet = null, onUploadImage }) => {
    const [formData, setFormData] = useState({
        name: '',
        specie: '',
        breed: '',
        birthDate: '',
        location: '',
        image: ''
    });
    const [imageMode, setImageMode] = useState('url'); // 'url' or 'upload'
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (pet) {
            setFormData({
                name: pet.name || '',
                specie: pet.specie || '',
                breed: pet.breed || '',
                birthDate: pet.birthDate ? pet.birthDate.split('T')[0] : '',
                location: pet.location || '',
                image: pet.image || ''
            });
            setPreviewUrl(pet.image || '');
        } else {
            setFormData({
                name: '',
                specie: '',
                breed: '',
                birthDate: '',
                location: '',
                image: ''
            });
            setPreviewUrl('');
        }
        setSelectedFile(null);
        setError('');
        setImageMode('url');
    }, [pet, open]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (name === 'image') {
            setPreviewUrl(value);
        }
    };

    const handleImageModeChange = (event, newMode) => {
        if (newMode !== null) {
            setImageMode(newMode);
            if (newMode === 'url') {
                setSelectedFile(null);
            } else {
                setFormData(prev => ({ ...prev, image: '' }));
            }
        }
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate required fields
        if (!formData.name || !formData.specie || !formData.birthDate) {
            setError('Nombre, especie y fecha de nacimiento son obligatorios');
            return;
        }

        setLoading(true);
        try {
            // First save the pet data
            const savedPet = await onSave(formData);

            // If there's a file to upload and we have the upload handler
            if (selectedFile && onUploadImage && savedPet?._id) {
                const uploadFormData = new FormData();
                uploadFormData.append('image', selectedFile);
                await onUploadImage(savedPet._id, uploadFormData);
            }

            onClose();
        } catch (err) {
            setError(err.response?.data?.error || 'Error al guardar la mascota');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <form onSubmit={handleSubmit}>
                <DialogTitle>
                    {pet ? 'Editar Mascota' : 'Nueva Mascota'}
                </DialogTitle>

                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                        {error && <Alert severity="error">{error}</Alert>}

                        <TextField
                            name="name"
                            label="Nombre"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            fullWidth
                        />

                        <TextField
                            name="specie"
                            label="Especie"
                            value={formData.specie}
                            onChange={handleChange}
                            required
                            fullWidth
                            placeholder="Ej: Perro, Gato, Conejo"
                        />

                        <TextField
                            name="breed"
                            label="Raza"
                            value={formData.breed}
                            onChange={handleChange}
                            fullWidth
                            placeholder="Ej: Labrador, Siamés"
                        />

                        <TextField
                            name="birthDate"
                            label="Fecha de Nacimiento"
                            type="date"
                            value={formData.birthDate}
                            onChange={handleChange}
                            required
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                        />

                        <TextField
                            name="location"
                            label="Ubicación"
                            value={formData.location}
                            onChange={handleChange}
                            fullWidth
                            placeholder="Ej: Buenos Aires, Argentina"
                        />

                        {/* Image Section */}
                        <Box sx={{ border: '1px solid #e0e0e0', borderRadius: 1, p: 2 }}>
                            <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                Foto de la Mascota
                            </Typography>

                            <ToggleButtonGroup
                                value={imageMode}
                                exclusive
                                onChange={handleImageModeChange}
                                size="small"
                                fullWidth
                                sx={{ mb: 2 }}
                            >
                                <ToggleButton value="url">
                                    <LinkIcon sx={{ mr: 1 }} /> URL
                                </ToggleButton>
                                <ToggleButton value="upload">
                                    <UploadFileIcon sx={{ mr: 1 }} /> Subir Archivo
                                </ToggleButton>
                            </ToggleButtonGroup>

                            {imageMode === 'url' ? (
                                <TextField
                                    name="image"
                                    label="URL de la imagen"
                                    value={formData.image}
                                    onChange={handleChange}
                                    fullWidth
                                    placeholder="https://ejemplo.com/imagen.jpg"
                                />
                            ) : (
                                <Box>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileSelect}
                                        ref={fileInputRef}
                                        style={{ display: 'none' }}
                                    />
                                    <Button
                                        variant="outlined"
                                        onClick={() => fileInputRef.current?.click()}
                                        fullWidth
                                        startIcon={<UploadFileIcon />}
                                    >
                                        {selectedFile ? selectedFile.name : 'Seleccionar imagen'}
                                    </Button>
                                </Box>
                            )}

                            {/* Image Preview */}
                            {previewUrl && (
                                <Box sx={{ mt: 2, textAlign: 'center' }}>
                                    <img
                                        src={previewUrl}
                                        alt="Vista previa"
                                        style={{
                                            maxWidth: '100%',
                                            maxHeight: '150px',
                                            borderRadius: '8px',
                                            objectFit: 'cover'
                                        }}
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                        }}
                                    />
                                </Box>
                            )}
                        </Box>
                    </Box>
                </DialogContent>

                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={onClose} disabled={loading}>
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={loading}
                    >
                        {loading ? 'Guardando...' : (pet ? 'Actualizar' : 'Crear')}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default PetFormModal;

