import { FastifyRequest } from 'fastify'

type OrderDetail = {
  productId: number
  price: number
  quantity: number
}

export type GetOrderRequest = FastifyRequest<{
  Params: {
    orderId: string
  }
}>

export type AddOrderRequest = FastifyRequest<{
  Body: {
    orderDetails: OrderDetail[]
    userId: number
    memberId?: number
  }
}>

export type PaymentOrderRequest = FastifyRequest<{
  Body: {
    orderId: number
  }
}>

export type CancelOrderRequest = FastifyRequest<{
  Body: {
    orderId: number
  }
}>
