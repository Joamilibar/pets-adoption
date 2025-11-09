import Adoption from './models/Adoption.js';

/**
 * Data Access Object for Adoptions
 */
class AdoptionsDAO {
  /**
   * Get all adoptions
   */
  async getAll() {
    return await Adoption.find().populate('owner').populate('pet');
  }

  /**
   * Get adoption by ID
   */
  async getById(id) {
    return await Adoption.findById(id).populate('owner').populate('pet');
  }

  /**
   * Get adoptions by user ID
   */
  async getByUserId(userId) {
    return await Adoption.find({ owner: userId }).populate('owner').populate('pet');
  }

  /**
   * Create a new adoption
   */
  async create(adoptionData) {
    const adoption = new Adoption(adoptionData);
    return await adoption.save();
  }

  /**
   * Delete adoption by ID
   */
  async delete(id) {
    return await Adoption.findByIdAndDelete(id);
  }
}

export default AdoptionsDAO;
