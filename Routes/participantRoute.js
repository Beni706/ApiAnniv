import express from 'express'
import { getAllParticipant,  getParticipantById, createParticipant, getParticipantByIdOrganisateur } from '../controllers/participantController.js '
import { authenticateToken } from '../Middlewares/auth.js'

const participantRoute = express.Router()

// Route pour obtenir tous les organisateurs, protégée par le middleware d'authentification
participantRoute.get('/', authenticateToken, getAllParticipant)
// Route pour afficher un participant par son id, protegée par le middleware d'authentification
participantRoute.get('/:id', authenticateToken, getParticipantById)

// Route pour afficher tous les participants associé a un organisateur, protégée par le middleware d'authentification
participantRoute.get('/organisateur/:id', authenticateToken, getParticipantByIdOrganisateur)

// Créer un nouveau participant
participantRoute.post('/', createParticipant)

export default participantRoute