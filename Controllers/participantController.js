import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Afficher tous les participants
export const getAllParticipant = async (req, res) => {
  try {
    const participants = await prisma.participant.findMany()
    res.json(participants)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message })
  }
}

// Afficher un participant par son id
export const getParticipantById = async (req, res) => {
  try {
    const { id } = req.params
    const participant = await prisma.participant.findUnique({
      where: { id_participant: parseInt(id) }
    })
    if (!participant) {
      return res.status(400).json({ error: 'Aucun participant trouvé' })
    }
    res.json(participant)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message })
  }
}

// Créer un nouveau participant
export const createParticipant = async (req, res) => {
  try {
    const { nom, prenom, email, id_organisateur } = req.body

    if (!nom || !prenom || !email || !id_organisateur) {
      return res.status(400).json({ error: 'Tous les champs sont obligatoires' })
    }

    // Vérifier si l'email existe déjà
    const existingParticipant = await prisma.participant.findUnique({
      where: { email }
    })

    if (existingParticipant) {
      return res.status(400).json({ error: 'Cet email est déjà utilisé' })
    }

    const newParticipant = await prisma.participant.create({
      data: {
        nom,
        prenom,
        email,
        id_organisateur : parseInt(id_organisateur)
      }
    })
    res.status(201).json({ message: 'Félicitations, vous vous êtes inscrit avec succès !', participant: newParticipant })

  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message })
  }
}

