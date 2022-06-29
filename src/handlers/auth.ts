import { FastifyRequest, FastifyReply } from 'fastify'
import { LoginRequest } from '../types/handlers/auth'
import { prisma } from '../helpers/utils'
import bcrypt from 'bcryptjs'
import jwt, { JwtPayload } from 'jsonwebtoken'

const comparePassword = async (password: string, existPassword: string): Promise<boolean> => {
  const isCorrect = await bcrypt.compare(password, existPassword)

  return isCorrect
}

export const login = async (req: LoginRequest, res: FastifyReply) => {
  try {
    const { email, password } = req.body

    const user = await prisma.user.findFirst({ where: { email } })
    if (!user) return res.send({ error: 'user not found' })

    const isCorrect = await comparePassword(password, user.password)
    if (!isCorrect) return res.send({ error: 'password incorrect' })

    //shoud fix later !!!
    const token = jwt.sign({ id: user.id }, 'secret')
    const DAY = 24 * 60 * 60 * 1000

    res.cookie('jwt', token, { httpOnly: true, maxAge: DAY })
    return res.send({ message: 'logged in' })
  } catch (error) {
    return res.send({ error: error })
  }
}

export const verify = async (req: FastifyRequest, res: FastifyReply) => {
  const cookie = req.cookies.jwt
  if (!cookie) return res.send({ error: 'unauthorized' })

  const claims = jwt.verify(cookie, 'secret') as JwtPayload
  if (!cookie) return res.send({ error: 'unauthorized' })

  const user = await prisma.user.findUnique({ where: { id: claims.id } })

  if (user) {
    const { password, ...data } = user
    return res.send(data)
  }

  return res.send({ error: 'unauthorized' })
}

export const logout = async (req: FastifyRequest, res: FastifyReply) => {
  res.clearCookie('jwt')

  return res.send({ message: 'logged out' })
}
