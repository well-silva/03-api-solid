import { Gym, Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import { FindManyNearbyParams, GymsRepository } from '../gyms-repository'

export class PrismaGymsRepository implements GymsRepository {
  async findById(id: string) {
    return await prisma.gym.findUnique({
      where: {
        id,
      },
    })
  }

  async create(data: Prisma.GymCreateInput) {
    return await prisma.gym.create({ data })
  }

  async searchMany(query: string, page: number) {
    return await prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      skip: (page - 1) * 20,
      take: 20,
    })
  }

  async findManyNearby({ latitude, longitude }: FindManyNearbyParams) {
    return await prisma.$queryRaw<Gym[]>`
      SELECT * from gyms
      WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `
  }
}
