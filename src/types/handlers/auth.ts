import { FastifyRequest } from 'fastify'

export type LoginRequest = FastifyRequest<{
  Body: {
    email: string
    password: string
  }
}>
