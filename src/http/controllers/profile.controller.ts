import { FastifyReply, FastifyRequest } from 'fastify'

import { GetUserProfileUseCaseFactory } from '@/use-cases/factories/make-get-profile-use-case'

export class ProfileController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const getUserProfileUseCase =
      GetUserProfileUseCaseFactory.makeGetUserProfileUseCase()

    const { user } = await getUserProfileUseCase.execute({
      userId: request.user.sub,
    })

    return reply.status(200).send({
      user: {
        ...user,
        password_hash: undefined,
      },
    })
  }
}
