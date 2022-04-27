import { FastifyInstance } from 'fastify'
import { addStock, getStock, getStocks } from '../handlers/stock'

const stockRouters = async (app: FastifyInstance) => {
  app.get('/', getStocks)
  app.get('/:stockId', getStock)
  app.post('/', addStock)
}

export default stockRouters
