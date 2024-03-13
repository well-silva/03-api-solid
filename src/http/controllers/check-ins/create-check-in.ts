import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { CheckInUseCaseFactory } from '@/use-cases/factories/make-check-ins-use-case'

export class CreateCheckInController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const createCheckInParamsSchema = z.object({
      gymId: z.string().uuid(),
    })

    const createCheckInBodySchema = z.object({
      latitude: z.number().refine((value) => {
        return Math.abs(value) <= 90
      }),
      longitude: z.number().refine((value) => {
        return Math.abs(value) <= 180
      }),
    })

    const { latitude, longitude } = createCheckInBodySchema.parse(request.body)

    const { gymId } = createCheckInParamsSchema.parse(request.params)

    const checkInsUseCase = CheckInUseCaseFactory.makeCheckInsUseCase()

    await checkInsUseCase.execute({
      userId: request.user.sub,
      gymId,
      userLatitude: latitude,
      userLongitude: longitude,
    })

    return reply.status(201).send()
  }
}
