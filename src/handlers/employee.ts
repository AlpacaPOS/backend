import { FastifyRequest, FastifyReply } from 'fastify'
import bcrypt from 'bcryptjs'

import { prisma } from '../helpers/utils'
import {
  AddEmployeeRequest,
  DeleteEmployeeRequest,
  GetEmployeeRequest,
  UpdateEmployeeRequest,
} from '../types/handlers/employee'

export const getEmployees = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    const employees = await prisma.user.findMany({ where: { userTypeId: 2 } })

    return res.send(employees)
  } catch (error) {
    return res.status(500).send({ error: error })
  }
}

export const getEmployee = async (req: GetEmployeeRequest, res: FastifyReply) => {
  try {
    const { employeeId } = req.params

    const employee = await prisma.user.findUnique({ where: { id: Number(employeeId) } })

    return res.send(employee)
  } catch (error) {
    return res.status(400).send({ error: error })
  }
}

export const addEmployee = async (req: AddEmployeeRequest, res: FastifyReply) => {
  try {
    const { email, password, firstname, lastname, phone } = req.body

    const salt = bcrypt.genSaltSync(12)
    const hash = bcrypt.hashSync(password, salt)

    const employee = await prisma.user.create({
      data: { email, password: hash, firstname, lastname, phone, userTypeId: 2 },
    })

    return res.status(201).send(employee)
  } catch (error) {
    return res.status(400).send({ error: error })
  }
}

export const updateEmployee = async (req: UpdateEmployeeRequest, res: FastifyReply) => {
  try {
    const { employeeId, email, password, firstname, lastname, phone } = req.body

    const salt = bcrypt.genSaltSync(12)
    const hash = bcrypt.hashSync(password, salt)

    const employee = await prisma.user.update({
      data: { email, password: hash, firstname, lastname, phone },
      where: { id: Number(employeeId) },
    })

    return res.send(employee)
  } catch (error) {
    return res.status(400).send({ error: error })
  }
}

export const deleteEmployee = async (req: DeleteEmployeeRequest, res: FastifyReply) => {
  try {
    const { employeeId } = req.params

    await prisma.user.delete({ where: { id: Number(employeeId) } })

    return res.status(204).send()
  } catch (error) {
    return res.status(400).send({ error: error })
  }
}

export default {
  getEmployees,
  getEmployee,
  addEmployee,
  updateEmployee,
  deleteEmployee,
}
