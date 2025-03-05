import express from 'express'
import { getAllOrganisateur, getOrganisateurById, createOrganisateur, loginOrganisateur, updatePassword, deleteOrganisateur } from '../Controllers/organisateurController.js'
import { authenticateToken } from '../Middlewares/auth.js'

const router = express.Router()

// Route pour obtenir tous les organisateurs, protégée par le middleware d'authentification
router.get('/', authenticateToken, getAllOrganisateur)

// Route pour obtenir un organisateur par ID, protégée par le middleware d'authentification
router.get('/:id', authenticateToken, getOrganisateurById)

// Route pour créer un nouvel organisateur
router.post('/', createOrganisateur)

// Route pour connecter un organisateur
router.post('/login', loginOrganisateur)

// Route pour mettre à jour le mot de passe d'un organisateur, protégée par le middleware d'authentification
router.put('/update-password', authenticateToken, updatePassword)

// Route pour supprimer un organisateur, protégée par le middleware d'authentification
router.delete('/:id', authenticateToken, deleteOrganisateur)

export default router