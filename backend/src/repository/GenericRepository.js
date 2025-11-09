/**
 * Generic Repository pattern for CRUD operations
 */
class GenericRepository {
  constructor(dao) {
    this.dao = dao;
  }

  /**
   * Get all entities
   */
  async getAll() {
    return await this.dao.getAll();
  }

  /**
   * Get entity by ID
   */
  async getById(id) {
    return await this.dao.getById(id);
  }

  /**
   * Create a new entity
   */
  async create(data) {
    return await this.dao.create(data);
  }

  /**
   * Update entity by ID
   */
  async update(id, data) {
    return await this.dao.update(id, data);
  }

  /**
   * Delete entity by ID
   */
  async delete(id) {
    return await this.dao.delete(id);
  }
}

export default GenericRepository;
