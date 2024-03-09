import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

import { FetchUserCheckInsHistoryUseCase } from '../fetch-user-check-ins-history'

export class FetchUserCheckInsHistoryUseCaseFactory {
  static makeFetchUserCheckInsHistoryUseCase() {
    const checkInsRepository = new PrismaCheckInsRepository()
    const useCase = new FetchUserCheckInsHistoryUseCase(checkInsRepository)

    return useCase
  }
}
