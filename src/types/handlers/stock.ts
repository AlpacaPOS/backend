import { FastifyRequest } from 'fastify'

export type GetStockRequest = FastifyRequest<{
  Params: {
    stockId: string
  }
}>

export type AddStockRequest = FastifyRequest<{
  Body: {
    productId: number
    quantity: number
  }
}>
