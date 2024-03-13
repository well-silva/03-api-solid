import { FastifyReply, FastifyRequest } from 'fastify'

import { GetUserMetricsUseCaseFactory } from '@/use-cases/factories/make-get-user-metrics-use-case'

export class UserMetricsController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const getUserMetricsUseCase =
      GetUserMetricsUseCaseFactory.makeGetUserMetricsUseCase()

    const { checkInsCount } = await getUserMetricsUseCase.execute({
      userId: request.user.sub,
    })

    return reply.status(200).send({ checkInsCount })
  }
}
