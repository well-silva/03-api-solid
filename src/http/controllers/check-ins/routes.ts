import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middleware/verify-jwt'
import { verifyUserRole } from '@/http/middleware/verify-user-role'

import { CreateCheckInController } from './create-check-in'
import { UserMetricsController } from './metrics-check-in'
import { UserHistoryCheckInsController } from './user-history-check-ins'
import { ValidateCheckInController } from './validate-check-in'

const createCheckInController = new CreateCheckInController()
const validateCheckInController = new ValidateCheckInController()
const userHistoryCheckInsController = new UserHistoryCheckInsController()
const metricsCheckInsController = new UserMetricsController()

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.post('/gyms/:gymId/check-ins/', createCheckInController.handle)
  app.patch(
    '/check-ins/:checkInId/validate',
    { onRequest: [verifyUserRole('ADMIN')] },
    validateCheckInController.handle,
  )
  app.get('/check-ins/history', userHistoryCheckInsController.handle)
  app.get('/check-ins/metrics', metricsCheckInsController.handle)
}
