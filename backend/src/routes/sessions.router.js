import { Router } from 'express';
import { register, login, current, logout, forgotPassword, resetPassword } from '../controllers/sessions.controller.js';
import { authenticateJWT } from '../utils/index.js';

const router = Router();

/**
 * @swagger
 * /api/sessions/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Sessions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - first_name
 *               - last_name
 *               - email
 *               - password
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [user, admin]
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */
router.post('/register', register);

/**
 * @swagger
 * /api/sessions/login:
 *   post:
 *     summary: Login user
 *     tags: [Sessions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               example: coderCookie=abcde12345; Path=/; HttpOnly
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', login);

/**
 * @swagger
 * /api/sessions/current:
 *   get:
 *     summary: Get current user
 *     tags: [Sessions]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Current user data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 */
router.get('/current', authenticateJWT, current);

/**
 * @swagger
 * /api/sessions/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Sessions]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 */
router.post('/logout', authenticateJWT, logout);

/**
 * @swagger
 * /api/sessions/forgot-password:
 *   post:
 *     summary: Request password reset
 *     tags: [Sessions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset email sent (if user exists)
 *       400:
 *         description: Bad request
 */
router.post('/forgot-password', forgotPassword);

/**
 * @swagger
 * /api/sessions/reset-password:
 *   post:
 *     summary: Reset password using token
 *     tags: [Sessions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - password
 *             properties:
 *               token:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successful
 *       400:
 *         description: Invalid or expired token
 */
router.post('/reset-password', resetPassword);

export default router;
