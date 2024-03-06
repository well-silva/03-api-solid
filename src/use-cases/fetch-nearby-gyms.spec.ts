import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Gym 1',
      description: 'Gym 1 description',
      phone: '123456789',
      latitude: -22.9873251,
      longitude: -43.2485817,
    })

    await gymsRepository.create({
      title: 'Gym 2',
      description: 'Gym 2 description',
      phone: '123456789',
      latitude: -22.8923405,
      longitude: -43.2121556,
    })

    const { gyms } = await sut.execute({
      userLatitude: -22.9873251,
      userLongitude: -43.2485817,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Gym 1' })])
  })
})
