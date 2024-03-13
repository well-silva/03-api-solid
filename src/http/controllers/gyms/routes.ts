import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middleware/verify-jwt'

import { CreateGymController } from './create-gym'
import { NearbyGymsController } from './nearby-gyms'
import { SearchGymsController } from './search-gyms'

const searchGymsController = new SearchGymsController()
const nearbyGymsController = new NearbyGymsController()
const createGymController = new CreateGymController()

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/gyms/search', searchGymsController.handle)
  app.get('/gyms/nearby', nearbyGymsController.handle)

  app.post('/gyms', createGymController.handle)
}
