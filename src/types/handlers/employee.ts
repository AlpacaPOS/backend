import { FastifyRequest } from 'fastify'

export type GetEmployeeRequest = FastifyRequest<{
  Params: {
    employeeId: string
  }
}>

export type AddEmployeeRequest = FastifyRequest<{
  Body: {
    email: string
    password: string
    firstname: string
    lastname: string
    phone: string
  }
}>

export type UpdateEmployeeRequest = FastifyRequest<{
  Body: {
    employeeId: string
    email: string
    password: string
    firstname: string
    lastname: string
    phone: string
  }
}>

export type DeleteEmployeeRequest = FastifyRequest<{
  Params: {
    employeeId: string
  }
}>
