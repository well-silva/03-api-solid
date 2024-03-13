import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { FetchNearbyGymsUseCaseFactory } from '@/use-cases/factories/make-fetch-nearby-gyms-use-case'

export class NearbyGymsController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const nearbyGymsQuerySchema = z.object({
      latitude: z.number().refine((value) => {
        return Math.abs(value) <= 90
      }),
      longitude: z.number().refine((value) => {
        return Math.abs(value) <= 180
      }),
    })

    const { latitude, longitude } = nearbyGymsQuerySchema.parse(request.body)
    const fetchNearbyGymsUseCase =
      FetchNearbyGymsUseCaseFactory.makeFetchNearbyGymsUseCase()

    const { gyms } = await fetchNearbyGymsUseCase.execute({
      userLatitude: latitude,
      userLongitude: longitude,
    })

    return reply.status(200).send({ gyms })
  }
}
