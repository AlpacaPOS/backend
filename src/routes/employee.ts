import { FastifyInstance } from 'fastify'
import {
  addEmployee,
  deleteEmployee,
  getEmployee,
  getEmployees,
  updateEmployee,
} from '../handlers/employee'

const employeeRouters = async (app: FastifyInstance) => {
  app.get('/', getEmployees)
  app.get('/:employeeId', getEmployee)
  app.post('/', addEmployee)
  app.put('/', updateEmployee)
  app.delete('/:employeeId', deleteEmployee)
}

export default employeeRouters
