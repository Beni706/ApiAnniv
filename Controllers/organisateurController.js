import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const prisma = new PrismaClient()
const JWT_SECRET = process.env.JWT_SECRET // Assurez-vous de stocker ce secret de manière sécurisée

// Afficher tous les organisateurs
export const getAllOrganisateur = async (req, res) => {
  try {
    // Cette ligne de code récupère tous les organisateurs de la base de données, ainsi que les participants associés à chaque organisateur.
    const organisateurs = await prisma.organisateur.findMany({
      include: {
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

    // Vérifie que tous les champs sont remplis
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

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10)

    // Créer un nouvel organisateur dans la base de données
    const newOrganisateur = await prisma.organisateur.create({
      data: {
        nom,
        prenom,
        email,
        password: hashedPassword,
        nom_evenement,
        date_evenement: new Date(date_evenement),
        lieu
      }
    })

    // Générer un token JWT
    const token = jwt.sign({ id: newOrganisateur.id_organisateur }, JWT_SECRET, { expiresIn: '1h' })

    res.status(201).json({ message: "Félicitation vous venez de vous enregistrer et de créer un évenement avec succès !", token })
  } catch (error) {
    console.error(error) // Affiche l'erreur dans la console
    res.status(500).json({ error: error.message }) // Retourne le message d'erreur détaillé
  }
}

// Supprimer un organisateur
export const deleteOrganisateur = async (req, res) => {
  try {
      const { id } = req.params;
      const organisateurId = parseInt(id);

      await prisma.$transaction(async (prisma) => {
          // Vérifier si l'organisateur existe
          const organisateur = await prisma.organisateur.findUnique({
              where: { id_organisateur: organisateurId },
          });

          if (!organisateur) {
              return res.status(404).json({ error: "Organisateur introuvable" });
          }

          // Supprimer les participants associés à l'organisateur
          await prisma.participant.deleteMany({
              where: { id_organisateur: organisateurId },
          });

          // Supprimer l'organisateur
          await prisma.organisateur.delete({
              where: { id_organisateur: organisateurId },
          });
      });

      res.json({
          message: `L'organisateur avec l'id ${id} et tous les participants enregistrés à son événement ont été supprimés avec succès !`,
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
  }
};

// Connexion d'un organisateur
export const loginOrganisateur = async (req, res) => {
  try {
    const { email, password } = req.body

    // Vérifiez les informations d'identification de l'utilisateur
    const organisateur = await prisma.organisateur.findUnique({
      where: { email }
    })

    if (!organisateur || !bcrypt.compareSync(password, organisateur.password)) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' })
    }

    // Générer un token JWT
    const token = jwt.sign({ id: organisateur.id_organisateur }, JWT_SECRET, { expiresIn: '1h' })

    res.json({ message: 'Connexion réussie', token })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: error.message })
  }
}

// Obtenir un organisateur par ID
export const getOrganisateurById = async (req, res) => {
  try {
    const { id } = req.params

    // Trouver l'organisateur par ID
    const organisateur = await prisma.organisateur.findUnique({
      where: { id_organisateur: parseInt(id) },
      select: {
        id_organisateur: true,
        nom: true,
        prenom: true,
        email: true,
        nom_evenement: true,
        date_evenement: true,
        lieu: true,
        Participants: true
      }
    })

    if (!organisateur) {
      return res.status(404).json({ error: 'Organisateur non trouvé' })
    }

    res.json(organisateur)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: error.message })
  }
}

export const updatePassword = async (req, res) => {
    try {
      const { email, password } = req.body
  
      // Vérifie que l'email, le nouveau mot de passe sont fournis
      if (!email || !password) {
        return res.status(400).json({ error: 'Email, ancien mot de passe et nouveau mot de passe sont obligatoires' })
      }
  
      // Trouver l'organisateur par email
      const organisateur = await prisma.organisateur.findUnique({
        where: { email }
      })
  
      if (!organisateur) {
        return res.status(400).json({ error: 'Organisateur non trouvé' })
      }
  
      // Hash du nouveau mot de passe
      const hashedNewPassword = await bcrypt.hash(password, 10)
  
      // Mettre à jour le mot de passe dans la base de données
      await prisma.organisateur.update({
        where: { email },
        data: { password: hashedNewPassword }
      })
  
      res.json({ message: 'Mot de passe mis à jour avec succès' })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: error.message })
    }
  }

