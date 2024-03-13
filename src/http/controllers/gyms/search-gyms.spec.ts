import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { UtilsTest } from '@/utils/test/create-and-authenticate-user'

describe('Search Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search gyms', async () => {
    const { token } = await UtilsTest.createAndAuthenticateUser(app)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'gym-1',
        description: 'gym-1 description',
        phone: '123456789',
        latitude: 0,
        longitude: 0,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'gym-2',
        description: 'gym-2 description',
        phone: '123456789',
        latitude: 0,
        longitude: 0,
      })

    const response = await request(app.server)
      .get('/gyms/search')
      .set('Authorization', `Bearer ${token}`)
      .query({ query: 'gym-1' })
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'gym-1',
      }),
    ])
  })
})
