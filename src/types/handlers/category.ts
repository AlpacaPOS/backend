import { FastifyRequest } from 'fastify'

export type GetCategoryRequest = FastifyRequest<{
  Params: {
    categoryId: string
  }
}>

export type AddCategoryRequest = FastifyRequest<{
  Body: {
    name: string
  }
}>

export type UpdateCategoryRequest = FastifyRequest<{
  Body: {
    categoryId: number
    name: string
  }
}>

export type DeleteCategoryRequest = FastifyRequest<{
  Params: {
    categoryId: string
  }
}>
