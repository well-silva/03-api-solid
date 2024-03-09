import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

import { AuthenticateUseCase } from '../authenticate'

export class AuthenticateUseCaseFactory {
  static makeAuthenticateUseCase() {
    const usersRepository = new PrismaUsersRepository()
    const useCase = new AuthenticateUseCase(usersRepository)

    return useCase
  }
}
