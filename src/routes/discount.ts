import { FastifyInstance } from 'fastify'
import { getDiscount, updateDiscount } from '../handlers/discount'

const discountRouters = async (app: FastifyInstance) => {
  app.get('/', getDiscount)
  app.put('/', updateDiscount)
}

export default discountRouters
