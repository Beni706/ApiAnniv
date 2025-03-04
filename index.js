import express from 'express'
import configureMiddlewares from './Middlewaires/middlewares.js'

const app = express()

// Configurer les middlewares
configureMiddlewares(app)

// Route principale
app.get('/', (req, res) => {
  res.send('Ceci est mon serveur !')
})

// Serveur en écoute sur le port 3000
app.listen(3000, () => {    
  console.log('Serveur lancé sur le port 3000')
})