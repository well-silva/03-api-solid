import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { RegisterUseCaseFactory } from '@/use-cases/factories/make-register-use-case'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const bodyCreateUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string(),
  })

  const { email, password, name } = bodyCreateUserSchema.parse(request.body)

  try {
    const registerUseCase = RegisterUseCaseFactory.makeRegisterUseCase()

    await registerUseCase.execute({ email, password, name })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: 'User already exists' })
    }

    throw error
  }

  return reply.status(201).send()
}
