import { FastifyInstance } from 'fastify'
import { login, verify, logout } from '../handlers/auth'

const authRouters = async (app: FastifyInstance) => {
  app.post('/login', login)
  app.get('/verify', verify)
  app.get('/logout', logout)
}

export default authRouters
