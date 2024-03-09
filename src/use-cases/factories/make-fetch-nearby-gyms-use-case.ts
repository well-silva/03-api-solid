import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

import { FetchNearbyGymsUseCase } from '../fetch-nearby-gyms'

export class FetchNearbyGymsUseCaseFactory {
  static makeFetchNearbyGymsUseCase() {
    const gymsRepository = new PrismaGymsRepository()
    const useCase = new FetchNearbyGymsUseCase(gymsRepository)

    return useCase
  }
}
