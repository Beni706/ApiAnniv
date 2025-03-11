/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Organisateur:
 *       type: object
 *       properties:
 *         id_organisateur:
 *           type: integer
 *           description: ID de l'organisateur
 *         nom:
 *           type: string
 *           description: Nom de l'organisateur
 *         prenom:
 *           type: string
 *           description: Prénom de l'organisateur
 *         email:
 *           type: string
 *           description: Email de l'organisateur
 *         password:
 *           type: string
 *           description: Mot de passe crypté de l'organisateur
 *         nom_evenement:
 *           type: string
 *           description: Nom de l'événement
 *         date_evenement:
 *           type: string
 *           format: date-time
 *           description: Date de l'événement
 *         lieu:
 *           type: string
 *           description: Lieu de l'événement
 *         Participants:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Participant'
 *     Participant:
 *       type: object
 *       properties:
 *         id_participant:
 *           type: integer
 *           description: ID du participant
 *         nom:
 *           type: string
 *           description: Nom du participant
 *         prenom:
 *           type: string
 *           description: Prénom du participant
 *         email:
 *           type: string
 *           description: Email du participant
 *         id_organisateur:
 *           type: integer
 *           description: ID de l'organisateur associé
 * security:
 *   - bearerAuth: []
 */

/**
 * @swagger
 * tags:
 *   name: Organisateurs
 *   description: Gestion des organisateurs
 */

/**
 * @swagger
 * /organisateurs:
 *   get:
 *     summary: Récupérer tous les organisateurs
 *     tags: [Organisateurs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste de tous les organisateurs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Organisateur'
 */

/**
 * @swagger
 * /organisateurs/{id}:
 *   get:
 *     summary: Récupérer un organisateur par ID
 *     tags: [Organisateurs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'organisateur
 *     responses:
 *       200:
 *         description: Détails de l'organisateur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Organisateur'
 */

/**
 * @swagger
 * /organisateurs:
 *   post:
 *     summary: Créer un nouvel organisateur
 *     tags: [Organisateurs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Organisateur'
 *     responses:
 *       201:
 *         description: Organisateur créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message de succès
 *                 token:
 *                   type: string
 *                   description: Token JWT de l'organisateur
 */

/**
 * @swagger
 * /organisateurs/login:
 *   post:
 *     summary: Connecter un organisateur
 *     tags: [Organisateurs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email de l'organisateur
 *               password:
 *                 type: string
 *                 description: Mot de passe de l'organisateur
 *     responses:
 *       200:
 *         description: Connexion réussie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message de succès
 *                 token:
 *                   type: string
 *                   description: Token JWT de l'organisateur
 */

/**
 * @swagger
 * /organisateurs/update-password:
 *   put:
 *     summary: Mettre à jour le mot de passe d'un organisateur
 *     tags: [Organisateurs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email de l'organisateur
 *               oldPassword:
 *                 type: string
 *                 description: Ancien mot de passe de l'organisateur
 *               newPassword:
 *                 type: string
 *                 description: Nouveau mot de passe de l'organisateur
 *     responses:
 *       200:
 *         description: Mot de passe mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message de succès
 */

/**
 * @swagger
 * /organisateurs/{id}:
 *   delete:
 *     summary: Supprimer un organisateur
 *     tags: [Organisateurs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'organisateur
 *     responses:
 *       200:
 *         description: Organisateur supprimé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message de succès
 */

/**
 * @swagger
 * tags:
 *   name: Participants
 *   description: Gestion des participants
 */

/**
 * @swagger
 * /participants:
 *   get:
 *     summary: Récupérer tous les participants
 *     tags: [Participants]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste de tous les participants
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Participant'
 */

/**
 * @swagger
 * /participants/{id}:
 *   get:
 *     summary: Récupérer un participant par ID
 *     tags: [Participants]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du participant
 *     responses:
 *       200:
 *         description: Détails du participant
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Participant'
 */

/**
 * @swagger
 * /participants/organisateur/{id}:
 *   get:
 *     summary: Récupérer tous les participants associés à un organisateur
 *     tags: [Participants]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'organisateur
 *     responses:
 *       200:
 *         description: Liste de tous les participants associés à l'organisateur
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Participant'
 */

/**
 * @swagger
 * /participants:
 *   post:
 *     summary: Créer un nouveau participant
 *     tags: [Participants]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Participant'
 *     responses:
 *       201:
 *         description: Participant créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message de succès
 *                 participant:
 *                   type: object
 *                   properties:
 *                     id_participant:
 *                       type: integer
 *                       description: ID du participant
 *                     nom:
 *                       type: string
 *                       description: Nom du participant
 *                     prenom:
 *                       type: string
 *                       description: Prénom du participant
 *                     email:
 *                       type: string
 *                       description: Email du participant
 *                     id_organisateur:
 *                       type: integer
 *                       description: ID de l'organisateur associé
 */