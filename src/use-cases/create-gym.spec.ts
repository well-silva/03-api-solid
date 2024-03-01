import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

import { CreateGymUseCase } from './create-gym'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('should be able to create Gym', async () => {
    const { gym } = await sut.execute({
      title: 'Gym 1',
      description: 'Gym 1 description',
      phone: '123456789',
      latitude: -22.9873251,
      longitude: -43.2485817,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
