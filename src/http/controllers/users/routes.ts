import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middleware/verify-jwt'

import { authenticateController } from './authenticate.controller'
import { ProfileController } from './profile.controller'
import { RefreshTokenController } from './refresh-token.controller'
import { register } from './register.controller'

const profileController = new ProfileController()
const refreshTokenController = new RefreshTokenController()

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticateController)

  app.patch('/token/refresh', refreshTokenController.handle)

  app.get('/me', { onRequest: [verifyJwt] }, profileController.handle)
}
