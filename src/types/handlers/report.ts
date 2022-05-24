import { FastifyRequest } from 'fastify'

export type GetDailySellRequest = FastifyRequest<{
  Body: {
    date: string
  }
}>

export type GetDailyBestSeller = FastifyRequest<{
  Body: {
    date: string
  }
}>
