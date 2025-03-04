import express from 'express'
import { getAllParticipant,  getParticipantById, createParticipant } from '../controllers/participantController.js '

const participantRoute = express.Router()

// Afficher tous les participants
participantRoute.get('/', getAllParticipant)
// Afficher un participant par son id
participantRoute.get('/:id', getParticipantById)
// Créer un nouveau participant
participantRoute.post('/', createParticipant)

export default participantRoute