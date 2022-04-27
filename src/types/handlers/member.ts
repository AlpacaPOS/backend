import { FastifyRequest } from 'fastify'

export type GetMemberRequest = FastifyRequest<{
  Params: {
    memberId: string
  }
}>

export type AddMemberRequest = FastifyRequest<{
  Body: {
    email: string
    firstname: string
    lastname: string
    phone: string
  }
}>

export type UpdateMemberRequest = FastifyRequest<{
  Body: {
    memberId: number
    email: string
    firstname: string
    lastname: string
    phone: string
  }
}>

export type DeleteMemberRequest = FastifyRequest<{
  Params: {
    memberId: string
  }
}>
