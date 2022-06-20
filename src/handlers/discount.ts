import { FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from '../helpers/utils'
import { UpdateDiscountRequest } from '../types/handlers/discount'

export const getDiscount = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    const discount = await prisma.discount.findUnique({
      where: { id: 1 },
    })

    return res.send(discount)
  } catch (error) {
    return res.status(500).send({ error: error })
  }
}

export const updateDiscount = async (req: UpdateDiscountRequest, res: FastifyReply) => {
  try {
    const { discount } = req.body
    const dc = await prisma.discount.update({ data: { discount }, where: { id: 1 } })
  } catch (error) {
    return res.status(400).send({ error: error })
  }
}
