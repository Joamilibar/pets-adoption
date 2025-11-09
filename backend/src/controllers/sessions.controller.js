import { usersService } from '../services/index.js';
import { hashPassword, comparePassword, generateToken } from '../utils/index.js';
import UserDTO from '../dto/User.dto.js';

/**
 * Register a new user
 */
export const register = async (req, res) => {
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
    res.status(201).json({ message: 'User registered successfully', user: userDTO });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Login user and set JWT cookie
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user by email
    const user = await usersService.getByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token using JWT_SECRET from environment
    const token = generateToken({
      id: user._id,
      email: user.email,
      role: user.role
    });

    // Set cookie
    res.cookie('coderCookie', token, {
      httpOnly: true,
      maxAge: 3600000, // 1 hour
      sameSite: 'lax'
    });

    const userDTO = new UserDTO(user);
    res.status(200).json({ message: 'Login successful', user: userDTO });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Get current user from JWT cookie
 */
export const current = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await usersService.getById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userDTO = new UserDTO(user);
    res.status(200).json({ user: userDTO });
  } catch (error) {
    console.error('Current user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Logout user by clearing cookie
 */
export const logout = async (req, res) => {
  try {
    res.clearCookie('coderCookie');
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
