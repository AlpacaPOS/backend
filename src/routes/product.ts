import { FastifyInstance } from 'fastify'
import {
  addProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from '../handlers/product'

const productRouters = async (app: FastifyInstance) => {
  app.get('/', getProducts)
  app.get('/:productId', getProduct)
  app.post('/', addProduct)
  app.put('/', updateProduct)
  app.delete('/:productId', deleteProduct)
}

export default productRouters
