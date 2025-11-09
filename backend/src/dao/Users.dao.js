import User from './models/User.js';

/**
 * Data Access Object for Users
 */
class UsersDAO {
  /**
   * Get all users
   */
  async getAll() {
    return await User.find().populate('pets');
  }

  /**
   * Get user by ID
   */
  async getById(id) {
    return await User.findById(id).populate('pets');
  }

  /**
   * Get user by email
   */
  async getByEmail(email) {
    return await User.findOne({ email }).populate('pets');
  }

  /**
   * Create a new user
   */
  async create(userData) {
    const user = new User(userData);
    return await user.save();
  }

  /**
   * Update user by ID
   */
  async update(id, userData) {
    return await User.findByIdAndUpdate(id, userData, { new: true }).populate('pets');
  }

  /**
   * Delete user by ID
   */
  async delete(id) {
    return await User.findByIdAndDelete(id);
  }
}

export default UsersDAO;
