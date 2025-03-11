import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Anniv',
      version: '1.0.0',
      description: 'Documentation de l\'API Anniv',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./Routes/*.js', './swaggerDoc.js'], // Chemin vers les fichiers de routes et le fichier de documentation Swagger
}

const specs = swaggerJsdoc(options)

export default (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
}