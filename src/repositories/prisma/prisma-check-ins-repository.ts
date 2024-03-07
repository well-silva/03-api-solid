import { CheckIn, Prisma } from '@prisma/client'
import dayjs from 'dayjs'

import { prisma } from '@/lib/prisma'

import { CheckInsRepository } from '../check-ins-repository'

export class PrismaCheckInsRepository implements CheckInsRepository {
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    return await prisma.checkIn.create({ data })
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    return await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        createdAt: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
    })
  }

  async findManyByUserId(userId: string, page: number) {
    return await prisma.checkIn.findMany({
      where: {
        user_id: userId,
      },
      skip: (page - 1) * 20,
      take: 20,
    })
  }

  async countByUserId(userId: string) {
    return await prisma.checkIn.count({
      where: {
        user_id: userId,
      },
    })
  }

  async findById(id: string) {
    return await prisma.checkIn.findFirst({
      where: {
        id,
      },
    })
  }

  async save(data: CheckIn) {
    return await prisma.checkIn.update({
      where: {
        id: data.id,
      },
      data,
    })
  }
}
