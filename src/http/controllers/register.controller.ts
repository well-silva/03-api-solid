import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterUseCase } from '@/use-cases/register'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const bodyCreateUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string(),
  })

  const { email, password, name } = bodyCreateUserSchema.parse(request.body)

  try {
    const usersRepository = new PrismaUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    await registerUseCase.execute({ email, password, name })
  } catch (error) {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}
