import express from 'express'
import { getAllOrganisateur, createOrganisateur, loginOrganisateur, updatePassword, deleteOrganisateur } from '../Controllers/organisateurController.js'
import { authenticateToken } from '../Middlewares/auth.js'

const router = express.Router()

// Route pour obtenir tous les organisateurs, protégée par le middleware d'authentification
router.get('/', authenticateToken, getAllOrganisateur)

// Route pour créer un nouvel organisateur
router.post('/', createOrganisateur)

// Route pour connecter un organisateur
router.post('/login', loginOrganisateur)

// Mettre à jour un organisateur
router.put('/:id', authenticateToken, updatePassword)

// Route pour supprimer un organisateur, protégée par le middleware d'authentification
router.delete('/:id', authenticateToken, deleteOrganisateur)

export default router