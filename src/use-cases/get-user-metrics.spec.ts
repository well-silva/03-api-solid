import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'

import { GetUserMetricsUseCase } from './get-user-metrics'

let getUserMetricsUseCase: InMemoryCheckInsRepository
let sut: GetUserMetricsUseCase

describe('Get User metrics Use Case', () => {
  beforeEach(async () => {
    getUserMetricsUseCase = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsUseCase(getUserMetricsUseCase)
  })

  it('should be able to get check-ins count from metrics', async () => {
    await getUserMetricsUseCase.create({
      gym_id: 'gym-1',
      user_id: 'user-1',
    })

    await getUserMetricsUseCase.create({
      gym_id: 'gym-2',
      user_id: 'user-1',
    })

    const { checkInsCount } = await sut.execute({
      userId: 'user-1',
    })

    expect(checkInsCount).toEqual(2)
  })
})
