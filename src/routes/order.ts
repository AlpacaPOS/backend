import { FastifyInstance } from 'fastify'
import { addOrder, cancelOrder, getOrder, getOrders, paymentOrder } from '../handlers/order'

const orderRouters = async (app: FastifyInstance) => {
  app.get('/', getOrders)
  app.get('/:orderId', getOrder)
  app.post('/', addOrder)
  app.put('/payment', paymentOrder)
  app.put('/cancel', cancelOrder)
}

export default orderRouters
