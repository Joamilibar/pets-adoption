import { adoptionsService, usersService, petsService } from '../services/index.js';

/**
 * Get all adoptions (admin only)
 */
export const getAllAdoptions = async (req, res) => {
    try {
        const adoptions = await adoptionsService.getAll();
        res.status(200).json({ adoptions });
    } catch (error) {
        console.error('Get all adoptions error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Get adoption by ID
 */
export const getAdoptionById = async (req, res) => {
    try {
        const { aid } = req.params;
        const adoption = await adoptionsService.getById(aid);
        if (!adoption) {
            return res.status(404).json({ error: 'Adoption not found' });
        }
        res.status(200).json({ adoption });
    } catch (error) {
        console.error('Get adoption by ID error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Get adoptions by user ID (current user)
 */
export const getAdoptionsByUserId = async (req, res) => {
    try {
        const adoptions = await adoptionsService.getByUserId(req.user.id);
        res.status(200).json({ adoptions });
    } catch (error) {
        console.error('Get user adoptions error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Create adoption
 */
export const createAdoption = async (req, res) => {
    try {
        const { uid, pid } = req.params;

        // Check if user exists
        const user = await usersService.getById(uid);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if pet exists
        const pet = await petsService.getById(pid);
        if (!pet) {
            return res.status(404).json({ error: 'Pet not found' });
        }

        // Check if pet is already adopted
        if (pet.adopted) {
            return res.status(400).json({ error: 'Pet is already adopted' });
        }

        // Create adoption
        const adoption = await adoptionsService.create({
            owner: uid,
            pet: pid
        });

        // Update pet status
        await petsService.update(pid, { adopted: true, owner: uid });

        // Add pet to user's pets array
        const updatedPets = [...(user.pets || []), pid];
        await usersService.update(uid, { pets: updatedPets });

        res.status(201).json({ message: 'Adoption created successfully', adoption });
    } catch (error) {
        console.error('Create adoption error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Delete adoption (admin only)
 */
export const deleteAdoption = async (req, res) => {
    try {
        const { aid } = req.params;

        const adoption = await adoptionsService.getById(aid);
        if (!adoption) {
            return res.status(404).json({ error: 'Adoption not found' });
        }

        // Update pet to not adopted
        await petsService.update(adoption.pet._id || adoption.pet, { adopted: false, owner: null });

        // Remove pet from user's pets array
        const user = await usersService.getById(adoption.owner._id || adoption.owner);
        if (user) {
            const petId = (adoption.pet._id || adoption.pet).toString();
            const updatedPets = (user.pets || []).filter(p => p.toString() !== petId);
            await usersService.update(user._id, { pets: updatedPets });
        }

        await adoptionsService.delete(aid);
        res.status(200).json({ message: 'Adoption deleted successfully' });
    } catch (error) {
        console.error('Delete adoption error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
