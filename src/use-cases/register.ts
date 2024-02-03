import { hash } from 'bcryptjs'

import { UsersRepository } from '@/repositories/users-repository'

interface RegisterUseCaseRequest {
  email: string
  password: string
  name: string
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ email, name, password }: RegisterUseCaseRequest) {
    const passwordHash = await hash(password, 6)

    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new Error('User already exists')
    }

    await this.usersRepository.create({
      email,
      name,
      password_hash: passwordHash,
    })
  }
}
