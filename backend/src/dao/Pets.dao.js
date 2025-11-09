import Pet from './models/Pet.js';

/**
 * Data Access Object for Pets
 */
class PetsDAO {
  /**
   * Get all pets
   */
  async getAll() {
    return await Pet.find().populate('owner');
  }

  /**
   * Get pet by ID
   */
  async getById(id) {
    return await Pet.findById(id).populate('owner');
  }

  /**
   * Create a new pet
   */
  async create(petData) {
    const pet = new Pet(petData);
    return await pet.save();
  }

  /**
   * Update pet by ID
   */
  async update(id, petData) {
    return await Pet.findByIdAndUpdate(id, petData, { new: true }).populate('owner');
  }

  /**
   * Delete pet by ID
   */
  async delete(id) {
    return await Pet.findByIdAndDelete(id);
  }
}

export default PetsDAO;
