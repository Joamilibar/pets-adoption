import { petsService } from '../services/index.js';

/**
 * Get all pets
 */
export const getAllPets = async (req, res) => {
    try {
        const pets = await petsService.getAll();
        res.status(200).json({ pets });
    } catch (error) {
        console.error('Get all pets error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Get pet by ID
 */
export const getPetById = async (req, res) => {
    try {
        const { pid } = req.params;

        const pet = await petsService.getById(pid);
        if (!pet) {
            return res.status(404).json({ error: 'Pet not found' });
        }

        res.status(200).json({ pet });
    } catch (error) {
        console.error('Get pet by ID error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Create a new pet (admin only)
 */
export const createPet = async (req, res) => {
    try {
        const { name, specie, birthDate, image, breed, location } = req.body;

        // Validate required fields
        if (!name || !specie || !birthDate) {
            return res.status(400).json({ error: 'Name, specie, and birthDate are required' });
        }

        // Create pet
        const newPet = await petsService.create({
            name,
            specie,
            birthDate,
            image: image || null,
            breed: breed || null,
            location: location || null,
            adopted: false,
            owner: null
        });

        res.status(201).json({ message: 'Pet created successfully', pet: newPet });
    } catch (error) {
        console.error('Create pet error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Update pet by ID (admin only)
 */
export const updatePet = async (req, res) => {
    try {
        const { pid } = req.params;
        const updateData = req.body;

        // Check if pet exists
        const pet = await petsService.getById(pid);
        if (!pet) {
            return res.status(404).json({ error: 'Pet not found' });
        }

        // Update pet
        const updatedPet = await petsService.update(pid, updateData);
        res.status(200).json({ message: 'Pet updated successfully', pet: updatedPet });
    } catch (error) {
        console.error('Update pet error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Delete pet by ID (admin only)
 */
export const deletePet = async (req, res) => {
    try {
        const { pid } = req.params;

        // Check if pet exists
        const pet = await petsService.getById(pid);
        if (!pet) {
            return res.status(404).json({ error: 'Pet not found' });
        }

        // Delete pet
        await petsService.delete(pid);
        res.status(200).json({ message: 'Pet deleted successfully' });
    } catch (error) {
        console.error('Delete pet error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Upload pet image (admin only)
 */
export const uploadPetImage = async (req, res) => {
    try {
        const { pid } = req.params;

        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Check if pet exists
        const pet = await petsService.getById(pid);
        if (!pet) {
            return res.status(404).json({ error: 'Pet not found' });
        }

        // Update pet with image path
        const imagePath = `/uploads/${req.file.filename}`;
        const updatedPet = await petsService.update(pid, { image: imagePath });

        res.status(200).json({ message: 'Image uploaded successfully', pet: updatedPet });
    } catch (error) {
        console.error('Upload pet image error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
