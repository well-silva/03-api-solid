import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { ValidateCheckInUseCaseFactory } from '@/use-cases/factories/make-validate-check-in-use-case'

export class ValidateCheckInController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const validateCheckInParamsSchema = z.object({
      checkInId: z.string(),
    })

    const { checkInId } = validateCheckInParamsSchema.parse(request.params)
    const validateCheckInUseCase =
      ValidateCheckInUseCaseFactory.makeValidateCheckInUseCase()

    await validateCheckInUseCase.execute({
      checkInId,
    })

    return reply.status(204).send()
  }
}
