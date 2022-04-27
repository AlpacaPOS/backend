import { FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from '../helpers/utils'
import { AddStockRequest, GetStockRequest } from '../types/handlers/stock'

export const getStocks = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    const stocks = await prisma.stock.findMany()

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
