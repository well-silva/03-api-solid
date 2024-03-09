import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

import { CreateGymUseCase } from '../create-gym'

export class CreateGymUseCaseFactory {
  static makeCreateGymUseCase() {
    const gymsRepository = new PrismaGymsRepository()
    const useCase = new CreateGymUseCase(gymsRepository)

    return useCase
  }
}
