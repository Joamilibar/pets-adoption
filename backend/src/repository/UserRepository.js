import GenericRepository from './GenericRepository.js';

/**
 * User Repository with additional user-specific methods
 */
class UserRepository extends GenericRepository {
  constructor(dao) {
    super(dao);
  }

  /**
   * Get user by email
   */
  async getByEmail(email) {
    return await this.dao.getByEmail(email);
  }
}

export default UserRepository;
