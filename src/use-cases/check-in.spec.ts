import { Decimal } from '@prisma/client/runtime/library'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

import { CheckInUseCase } from './check-in'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    gymsRepository.items.push({
      id: 'gym-1',
      title: 'Gym 1',
      description: 'Gym 1 description',
      phone: '123456789',
      latitude: new Decimal(-22.9873251),
      longitude: new Decimal(-43.2485817),
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-1',
      userId: 'user-1',
      userLatitude: -22.9873251,
      userLongitude: -43.2485817,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-1',
      userId: 'user-1',
      userLatitude: -22.9873251,
      userLongitude: -43.2485817,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-1',
        userId: 'user-1',
        userLatitude: -22.9873251,
        userLongitude: -43.2485817,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-1',
      userId: 'user-1',
      userLatitude: -22.9873251,
      userLongitude: -43.2485817,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-1',
      userId: 'user-1',
      userLatitude: -22.9873251,
      userLongitude: -43.2485817,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {
    gymsRepository.items.push({
      id: 'gym-2',
      title: 'Gym 2',
      description: 'Gym 2 description',
      phone: '123456789',
      latitude: new Decimal(-22.9800102),
      longitude: new Decimal(-43.237095),
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-2',
        userId: 'user-1',
        userLatitude: -22.9873251,
        userLongitude: -43.2485817,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
