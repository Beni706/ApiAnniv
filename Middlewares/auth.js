import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

// Clé secrète pour signer les tokens JWT
const JWT_SECRET = process.env.JWT_SECRET

// Middleware pour authentifier le token JWT
export const authenticateToken = (req, res, next) => {
  // Récupérer le token depuis l'en-tête Authorization
  const token = req.header('Authorization')?.split(' ')[1]

  // Vérifier si le token est présent
  if (!token) {
    return res.status(401).json({ error: 'Accès refusé' })
  }

  try {
    // Vérifier et décoder le token
    const verified = jwt.verify(token, JWT_SECRET)
    // Ajouter l'ID de l'organisateur vérifié à l'objet req
    req.organisateurId = verified.id
    // Passer au middleware suivant ou à la route
    next()
  } catch (error) {
    // Si le token est invalide, renvoyer une erreur
    console.log(error)
    res.status(400).json({ error: 'Token invalide' })
  }
}


const token = 'anniversaire'
try {
  const decoded = jwt.verify(token, JWT_SECRET)
  console.log('Token valide:', decoded)
} catch (error) {
  console.error('Token invalide:', error.message)
}

