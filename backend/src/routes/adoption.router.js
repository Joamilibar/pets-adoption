import { Router } from 'express';
import { 
  getAllAdoptions, 
  getAdoptionById, 
  getAdoptionsByUserId,
  createAdoption, 
  deleteAdoption 
} from '../controllers/adoptions.controller.js';
import { authenticateJWT, isAdmin } from '../utils/index.js';

const router = Router();

/**
 * @swagger
 * /api/adoptions:
 *   get:
 *     summary: Get all adoptions (admin only)
 *     tags: [Adoptions]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of all adoptions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 adoptions:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Adoption'
 *       403:
 *         description: Forbidden
 */
router.get('/', authenticateJWT, isAdmin, getAllAdoptions);

/**
 * @swagger
 * /api/adoptions/user:
 *   get:
 *     summary: Get adoptions for current user
 *     tags: [Adoptions]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of user's adoptions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 adoptions:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Adoption'
 */
router.get('/user', authenticateJWT, getAdoptionsByUserId);

/**
 * @swagger
 * /api/adoptions/{aid}:
 *   get:
 *     summary: Get adoption by ID
 *     tags: [Adoptions]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: aid
 *         required: true
 *         schema:
 *           type: string
 *         description: Adoption ID
 *     responses:
 *       200:
 *         description: Adoption data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Adoption'
 *       404:
 *         description: Adoption not found
 */
router.get('/:aid', authenticateJWT, getAdoptionById);

/**
 * @swagger
 * /api/adoptions/{uid}/{pid}:
 *   post:
 *     summary: Create adoption (adopt a pet)
 *     tags: [Adoptions]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: string
 *         description: Pet ID
 *     responses:
 *       201:
 *         description: Adoption created successfully
 *       400:
 *         description: Pet already adopted
 *       404:
 *         description: User or pet not found
 */
router.post('/:uid/:pid', authenticateJWT, createAdoption);

/**
 * @swagger
 * /api/adoptions/{aid}:
 *   delete:
 *     summary: Delete adoption by ID (admin only)
 *     tags: [Adoptions]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: aid
 *         required: true
 *         schema:
 *           type: string
 *         description: Adoption ID
 *     responses:
 *       200:
 *         description: Adoption deleted successfully
 *       404:
 *         description: Adoption not found
 */
router.delete('/:aid', authenticateJWT, isAdmin, deleteAdoption);

export default router;
