import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

import { SearchGymsUseCase } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      id: 'gym-1',
      title: 'Gym 1',
      description: 'Gym 1 description',
      phone: '123456789',
      latitude: -22.9873251,
      longitude: -43.2485817,
    })

    await gymsRepository.create({
      id: 'gym-2',
      title: 'Gym 2',
      description: 'Gym 2 description',
      phone: '123456789',
      latitude: -22.9873251,
      longitude: -43.2485817,
    })

    const { gyms } = await sut.execute({
      query: 'Gym 1',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Gym 1' })])
  })

  it('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        id: `gym-${i}`,
        title: `Gym ${i}`,
        description: `Gym ${i} description`,
        phone: '123456789',
        latitude: -22.9873251,
        longitude: -43.2485817,
      })
    }
    const { gyms } = await sut.execute({
      query: 'Gym',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ id: 'gym-21' }),
      expect.objectContaining({ id: 'gym-22' }),
    ])
  })
})
