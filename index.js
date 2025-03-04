import express from 'express'
import configureMiddlewares from './Middlewares/middlewares.js'
import organisateurRoute from './Routes/organisateurRoute.js'
import participantRoute from "./Routes/participantRoute.js"

const app = express()

// Configurer les middlewares
configureMiddlewares(app)

// Route principale
app.get('/', (req, res) => {
  res.send('Ceci est mon serveur !')
})


// Route pour les organisateurs
app.use('/organisateurs', organisateurRoute)
// Route pour les participants
app.use('/participants', participantRoute)

// Serveur en écoute sur le port 3000
app.listen(3000, () => {    
  console.log('Serveur lancé sur le port 3000')
})