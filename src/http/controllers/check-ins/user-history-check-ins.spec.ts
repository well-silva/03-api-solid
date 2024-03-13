import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { UtilsTest } from '@/utils/test/create-and-authenticate-user'

describe('User History Check-in (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list the history of check-ins', async () => {
    const { token } = await UtilsTest.createAndAuthenticateUser(app)

    const user = await prisma.user.findFirstOrThrow({})

    const { id } = await prisma.gym.create({
      data: {
        title: 'gym-1',
        description: 'gym-1 description',
        phone: '123456789',
        latitude: -22.9873251,
        longitude: -43.2485817,
      },
    })

    await prisma.checkIn.createMany({
      data: [
        {
          user_id: user.id,
          gym_id: id,
        },
        {
          user_id: user.id,
          gym_id: id,
        },
      ],
    })

    const response = await request(app.server)
      .get(`/check-ins/history`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body.checkIns.length).toBe(2)
    expect(response.body.checkIns).toEqual([
      expect.objectContaining({ user_id: user.id, gym_id: id }),
      expect.objectContaining({ user_id: user.id, gym_id: id }),
    ])
  })
})
