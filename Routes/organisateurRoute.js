import express from 'express'
import { createOrganisateur, getAllOrganisateur, deleteOrganisateur } from '../Controllers/organisateurController.js'

const organisateurRoute = express.Router()

// Afficher tous les organisateurs
organisateurRoute.get('/', getAllOrganisateur)
// Créer un nouvel organisateur
organisateurRoute.post('/', createOrganisateur)
// Supprimer un organisateur
organisateurRoute.delete('/:id', deleteOrganisateur)

export default organisateurRoute