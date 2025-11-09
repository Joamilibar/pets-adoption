import { usersService } from '../services/index.js';
import { hashPassword } from '../utils/index.js';
import UserDTO from '../dto/User.dto.js';

/**
 * Get all users (admin only)
 */
export const getAllUsers = async (req, res) => {
  try {
    const users = await usersService.getAll();
    const usersDTO = users.map(user => new UserDTO(user));
    res.status(200).json({ users: usersDTO });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Get user by ID
 */
export const getUserById = async (req, res) => {
  try {
    const { uid } = req.params;

    const user = await usersService.getById(uid);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userDTO = new UserDTO(user);
    res.status(200).json({ user: userDTO });
  } catch (error) {
    console.error('Get user by ID error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Create a new user
 */
export const createUser = async (req, res) => {
  try {
    const { first_name, last_name, email, password, role } = req.body;

    // Validate required fields
    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if user already exists
    const existingUser = await usersService.getByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const newUser = await usersService.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      role: role || 'user'
    });

    const userDTO = new UserDTO(newUser);
    res.status(201).json({ message: 'User created successfully', user: userDTO });
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Update user by ID
 */
export const updateUser = async (req, res) => {
  try {
    const { uid } = req.params;
    const updateData = req.body;

    // Check if user exists
    const user = await usersService.getById(uid);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if user is updating their own profile or is admin
    if (req.user.id !== uid && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // If password is being updated, hash it
    if (updateData.password) {
      updateData.password = await hashPassword(updateData.password);
    }

    // Update user
    const updatedUser = await usersService.update(uid, updateData);
    const userDTO = new UserDTO(updatedUser);
    res.status(200).json({ message: 'User updated successfully', user: userDTO });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Delete user by ID
 */
export const deleteUser = async (req, res) => {
  try {
    const { uid } = req.params;

    // Check if user exists
    const user = await usersService.getById(uid);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if user is deleting their own profile or is admin
    if (req.user.id !== uid && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Delete user
    await usersService.delete(uid);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
