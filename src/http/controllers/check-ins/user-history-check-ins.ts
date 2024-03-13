import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { FetchUserCheckInsHistoryUseCaseFactory } from '@/use-cases/factories/make-fetch-user-check-ins-history-use-case'

export class UserHistoryCheckInsController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const checkInHistoryQuerySchema = z.object({
      page: z.coerce.number().default(1),
    })

    const { page } = checkInHistoryQuerySchema.parse(request.body)
    const fetchUserCheckInsHistoryUseCaseFactory =
      FetchUserCheckInsHistoryUseCaseFactory.makeFetchUserCheckInsHistoryUseCase()

    const { checkIns } = await fetchUserCheckInsHistoryUseCaseFactory.execute({
      userId: request.user.sub,
      page,
    })

    return reply.status(200).send({ checkIns })
  }
}
