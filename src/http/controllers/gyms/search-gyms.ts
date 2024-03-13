import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { SearchGymsUseCaseFactory } from '@/use-cases/factories/make-search-gyms-use-case'

export class SearchGymsController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const searchGymQuerySchema = z.object({
      query: z.string(),
      page: z.coerce.number().min(1).default(1),
    })

    const { query, page } = searchGymQuerySchema.parse(request.query)
    const searchGymsUseCase = SearchGymsUseCaseFactory.makeSearchGymsUseCase()

    const { gyms } = await searchGymsUseCase.execute({
      query,
      page,
    })

    return reply.status(200).send({ gyms })
  }
}
