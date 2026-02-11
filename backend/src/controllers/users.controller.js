import { usersService } from '../services/index.js';
import { hashPassword } from '../utils/index.js';

/**
 * Get all users (admin only)
 */
export const getAllUsers = async (req, res) => {
    try {
        const users = await usersService.getAll();
        res.status(200).json({ users });
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
        res.status(200).json({ user });
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

        if (!first_name || !last_name || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const existingUser = await usersService.getByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        const hashedPassword = await hashPassword(password);
        const newUser = await usersService.create({
            first_name,
            last_name,
            email,
            password: hashedPassword,
            role: role || 'user'
        });

        res.status(201).json({ message: 'User created successfully', user: newUser });
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

        const user = await usersService.getById(uid);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (updateData.password) {
            updateData.password = await hashPassword(updateData.password);
        }

        const updatedUser = await usersService.update(uid, updateData);
        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
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

        const user = await usersService.getById(uid);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        await usersService.delete(uid);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
