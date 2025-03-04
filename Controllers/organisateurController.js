import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


// Afficher tous les organisateurs
export const getAllOrganisateur = async (req, res) => {
  try {
// Cette ligne de code récupère tous les organisateurs de la base de données, ainsi que les participants associés à chaque organisateur.
    const organisateurs = await prisma.organisateur.findMany({
      select: {
        nom: true,
        prenom: true,
        email: true,
        password: false,
        nom_evenement: true,
        date_evenement: true,
        lieu: true,
        Participants: true
      }
    })
    res.json(organisateurs)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: error.message })
  }
}


// Créer un nouvel organisateur
export const createOrganisateur = async (req, res) => {
  try {
    const { nom, prenom, email, password, nom_evenement, date_evenement, lieu } = req.body

    if (!nom || !prenom || !email || !password || !nom_evenement || !date_evenement || !lieu) {
      return res.status(400).json({ error: 'Tous les champs sont obligatoires' })
    }

    // Vérifier si l'email existe déjà
    const existingOrganisateur = await prisma.organisateur.findUnique({
      where: { email }
    })

    if (existingOrganisateur) {
      return res.status(400).json({ error: 'Cet email est déjà utilisé' })
    }

    const newOrganisateur = await prisma.organisateur.create({
      data: {
        nom,
        prenom,
        email,
        password,
        nom_evenement,
        date_evenement: new Date(date_evenement),
        lieu
      }
    })

    res.status(201).json({ message: "Félicitation vous venez de vous enregistrer et de créer un évenement avec succès !", organisateur: newOrganisateur })
  } catch (error) {
    console.error(error) // Affiche l'erreur dans la console
    res.status(500).json({ error: error.message }) // Retourne le message d'erreur détaillé
  }
}


// Supprimer un organisateur
export const deleteOrganisateur = async (req, res) => {
  try {
    const { id } = req.params

    await prisma.$transaction(async (prisma) => {
      // Supprimer les utilisateurs associés à l'organisateur
      await prisma.participant.deleteMany({
        where: { id_organisateur: parseInt(id) }
      })

      // Supprimer l'organisateur
      await prisma.organisateur.delete({
        where: { id_organisateur: parseInt(id) }
      })
    })

    res.json({ message: `L'organisateur avec l'id ${id} et tous les participants enregistrer a son evenement ont été supprimés avec succè !` })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: error.message })
  }
}