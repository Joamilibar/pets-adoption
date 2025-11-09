import { adoptionsService, petsService, usersService } from '../services/index.js';

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
 * Get adoptions by user ID
 */
export const getAdoptionsByUserId = async (req, res) => {
  try {
    const userId = req.user.id;

    const adoptions = await adoptionsService.getByUserId(userId);
    res.status(200).json({ adoptions });
  } catch (error) {
    console.error('Get adoptions by user ID error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Create adoption (adopt a pet)
 */
export const createAdoption = async (req, res) => {
  try {
    const { uid, pid } = req.params;

    // Verify user is adopting for themselves or is admin
    if (req.user.id !== uid && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

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
    await petsService.update(pid, {
      adopted: true,
      owner: uid
    });

    // Update user's pets array
    const updatedPets = [...(user.pets || []), pid];
    await usersService.update(uid, { pets: updatedPets });

    // Populate the adoption
    const populatedAdoption = await adoptionsService.getById(adoption._id);

    res.status(201).json({ 
      message: 'Adoption created successfully', 
      adoption: populatedAdoption 
    });
  } catch (error) {
    console.error('Create adoption error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Delete adoption by ID (admin only)
 */
export const deleteAdoption = async (req, res) => {
  try {
    const { aid } = req.params;

    // Check if adoption exists
    const adoption = await adoptionsService.getById(aid);
    if (!adoption) {
      return res.status(404).json({ error: 'Adoption not found' });
    }

    // Update pet status
    await petsService.update(adoption.pet._id, {
      adopted: false,
      owner: null
    });

    // Update user's pets array
    const user = await usersService.getById(adoption.owner._id);
    if (user) {
      const updatedPets = user.pets.filter(petId => petId.toString() !== adoption.pet._id.toString());
      await usersService.update(adoption.owner._id, { pets: updatedPets });
    }

    // Delete adoption
    await adoptionsService.delete(aid);

    res.status(200).json({ message: 'Adoption deleted successfully' });
  } catch (error) {
    console.error('Delete adoption error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
