import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { UtilsTest } from '@/utils/test/create-and-authenticate-user'

describe('Create Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a new gym', async () => {
    const { token } = await UtilsTest.createAndAuthenticateUser(app)

    const response = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'gym-1',
        description: 'gym-1 description',
        phone: '123456789',
        latitude: 0,
        longitude: 0,
      })

    expect(response.statusCode).toBe(201)
  })
})
