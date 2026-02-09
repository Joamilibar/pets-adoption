import { Router } from 'express';
import multer from 'multer';
import {
  getAllPets,
  getPetById,
  createPet,
  updatePet,
  deletePet,
  uploadPetImage
} from '../controllers/pets.controller.js';
import { authenticateJWT, isAdmin } from '../utils/index.js';

const router = Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage });

/**
 * @swagger
 * /api/pets:
 *   get:
 *     summary: Get all pets
 *     tags: [Pets]
 *     responses:
 *       200:
 *         description: List of all pets
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 pets:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Pet'
 */
router.get('/', getAllPets);

/**
 * @swagger
 * /api/pets/{pid}:
 *   get:
 *     summary: Get pet by ID
 *     tags: [Pets]
 *     parameters:
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: string
 *         description: Pet ID
 *     responses:
 *       200:
 *         description: Pet data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pet'
 *       404:
 *         description: Pet not found
 */
router.get('/:pid', getPetById);

/**
 * @swagger
 * /api/pets:
 *   post:
 *     summary: Create a new pet (admin only)
 *     tags: [Pets]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - specie
 *               - birthDate
 *             properties:
 *               name:
 *                 type: string
 *               specie:
 *                 type: string
 *               breed:
 *                 type: string
 *               birthDate:
 *                 type: string
 *                 format: date
 *               location:
 *                 type: string
 *               image:
 *                 type: string
 *     responses:
 *       201:
 *         description: Pet created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', authenticateJWT, isAdmin, createPet);

/**
 * @swagger
 * /api/pets/{pid}:
 *   put:
 *     summary: Update pet by ID (admin only)
 *     tags: [Pets]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: string
 *         description: Pet ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               specie:
 *                 type: string
 *               breed:
 *                 type: string
 *               birthDate:
 *                 type: string
 *                 format: date
 *               location:
 *                 type: string
 *               adopted:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Pet updated successfully
 *       404:
 *         description: Pet not found
 */
router.put('/:pid', authenticateJWT, isAdmin, updatePet);

/**
 * @swagger
 * /api/pets/{pid}:
 *   delete:
 *     summary: Delete pet by ID (admin only)
 *     tags: [Pets]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: string
 *         description: Pet ID
 *     responses:
 *       200:
 *         description: Pet deleted successfully
 *       404:
 *         description: Pet not found
 */
router.delete('/:pid', authenticateJWT, isAdmin, deletePet);

/**
 * @swagger
 * /api/pets/{pid}/image:
 *   post:
 *     summary: Upload pet image (admin only)
 *     tags: [Pets]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: string
 *         description: Pet ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *       404:
 *         description: Pet not found
 */
router.post('/:pid/image', authenticateJWT, isAdmin, upload.single('image'), uploadPetImage);

export default router;
