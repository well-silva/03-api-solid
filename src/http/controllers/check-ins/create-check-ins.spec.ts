import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { UtilsTest } from '@/utils/test/create-and-authenticate-user'

describe('Create Check-in (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a check-in', async () => {
    const { token } = await UtilsTest.createAndAuthenticateUser(app)

    const { id } = await prisma.gym.create({
      data: {
        title: 'gym-1',
        description: 'gym-1 description',
        phone: '123456789',
        latitude: -22.9873251,
        longitude: -43.2485817,
      },
    })

    const response = await request(app.server)
      .post(`/gyms/${id}/check-ins/`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -22.9873251,
        longitude: -43.2485817,
      })

    expect(response.statusCode).toBe(201)
  })
})
