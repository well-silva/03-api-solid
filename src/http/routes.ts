import { FastifyInstance } from 'fastify'

import { authenticateController } from './controllers/authenticate.controller'
import { ProfileController } from './controllers/profile.controller'
import { register } from './controllers/register.controller'
import { verifyJwt } from './middleware/verify-jwt'

const profileController = new ProfileController()

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticateController)
  app.get('/me', { onRequest: [verifyJwt] }, profileController.handle)
}
