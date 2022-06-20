import { FastifyRequest } from 'fastify'

export type UpdateDiscountRequest = FastifyRequest<{
  Body: {
    discount: number
  }
}>
