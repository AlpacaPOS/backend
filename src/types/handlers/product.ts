import { FastifyRequest } from 'fastify'

export type GetProductRequest = FastifyRequest<{
  Params: {
    productId: string
  }
}>

export type AddProductRequest = FastifyRequest<{
  Body: {
    name: string
    price: number
    categoryId: number
  }
}>

export type UpdateProductRequest = FastifyRequest<{
  Body: {
    productId: number
    name: string
    price: number
    categoryId: number
  }
}>

export type DeleteProductRequest = FastifyRequest<{
  Params: {
    productId: string
  }
}>
