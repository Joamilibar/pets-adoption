import GenericRepository from './GenericRepository.js';

/**
 * Adoption Repository with additional adoption-specific methods
 */
class AdoptionRepository extends GenericRepository {
  constructor(dao) {
    super(dao);
  }

  /**
   * Get adoptions by user ID
   */
  async getByUserId(userId) {
    return await this.dao.getByUserId(userId);
  }
}

export default AdoptionRepository;
