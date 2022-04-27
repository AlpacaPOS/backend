import { FastifyInstance } from 'fastify'
import {
  addCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from '../handlers/category'

const categoryRouters = async (app: FastifyInstance) => {
  app.get('/', getCategories)
  app.get('/:categoryId', getCategory)
  app.post('/', addCategory)
  app.put('/', updateCategory)
  app.delete('/:categoryId', deleteCategory)
}

export default categoryRouters
