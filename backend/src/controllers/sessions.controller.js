import { usersService } from '../services/index.js';
import { hashPassword, comparePassword, generateToken, generateResetToken } from '../utils/index.js';

/**
 * Register a new user
 */
export const register = async (req, res) => {
    try {
        const { first_name, last_name, email, password, role } = req.body;

        if (!first_name || !last_name || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Check if user exists
        const existingUser = await usersService.getByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: 'Email already registered' });
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

        res.status(201).json({
            message: 'User registered successfully',
            user: { id: newUser._id, first_name, last_name, email, role: newUser.role }
        });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Login user
 */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Find user
        const user = await usersService.getByEmail(email);
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Compare passwords
        const isValid = await comparePassword(password, user.password);
        if (!isValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate JWT
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

        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Get current user
 */
export const current = async (req, res) => {
    try {
        const user = await usersService.getById(req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ user });
    } catch (error) {
        console.error('Current user error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Logout user
 */
export const logout = async (req, res) => {
    res.clearCookie('coderCookie');
    res.status(200).json({ message: 'Logout successful' });
};

/**
 * Forgot password
 */
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        const user = await usersService.getByEmail(email);
        if (!user) {
            // Don't reveal if user exists
            return res.status(200).json({ message: 'If the email exists, a reset link has been sent' });
        }

        const resetToken = generateResetToken();
        const resetExpires = new Date(Date.now() + 3600000); // 1 hour

        await usersService.update(user._id, {
            resetPasswordToken: resetToken,
            resetPasswordExpires: resetExpires
        });

        res.status(200).json({
            message: 'If the email exists, a reset link has been sent',
            resetToken // In production, this would be sent via email
        });
    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Reset password
 */
export const resetPassword = async (req, res) => {
    try {
        const { token, password } = req.body;

        if (!token || !password) {
            return res.status(400).json({ error: 'Token and password are required' });
        }

        const user = await usersService.getByEmail(null);
        // Find user by reset token (need raw query)
        const User = (await import('../dao/models/User.js')).default;
        const userWithToken = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: new Date() }
        });

        if (!userWithToken) {
            return res.status(400).json({ error: 'Invalid or expired reset token' });
        }

        const hashedPassword = await hashPassword(password);
        await usersService.update(userWithToken._id, {
            password: hashedPassword,
            resetPasswordToken: null,
            resetPasswordExpires: null
        });

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
