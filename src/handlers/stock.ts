import { FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from '../helpers/utils'
import { AddStockRequest, GetStockRequest } from '../types/handlers/stock'

export const getStocks = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    const stocks = await prisma.stock.findMany({
      include: {
        product: {
          select: {
            name: true,
            category: {
              select: { name: true },
            },
          },
        },
      },
    })

    return res.send(stocks)
  } catch (error) {
    return res.status(500).send({ error: error })
  }
}

export const getStock = async (req: GetStockRequest, res: FastifyReply) => {
  try {
    const { stockId } = req.params

    const stock = await prisma.stock.findUnique({ where: { id: Number(stockId) } })

    return res.send(stock)
  } catch (error) {
    return res.status(400).send({ error: error })
  }
}

export const addStock = async (req: AddStockRequest, res: FastifyReply) => {
  try {
    const { productId, quantity } = req.body

    const stock = await prisma.stock.create({ data: { productId, quantity } })

    const product = await prisma.product.findUnique({
      select: { quantity: true },
      where: { id: stock.productId },
    })

    if (product?.quantity) {
      await prisma.product.update({
        data: { quantity: stock.quantity },
        where: { id: stock.productId },
      })
    }

    return res.status(201).send(stock)
  } catch (error) {
    return res.status(400).send({ error: error })
  }
}

export default {
  getStocks,
  getStock,
  addStock,
}
