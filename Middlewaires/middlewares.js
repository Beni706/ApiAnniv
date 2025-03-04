import express from 'express'

const configureMiddlewares = (app) => {
  // Utilisation des middlewares
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
}

export default configureMiddlewares