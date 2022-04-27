import fastify, { FastifyServerOptions } from 'fastify'
import categoryRouters from './routes/category'
import productRouters from './routes/product'

const buildApp = (options: FastifyServerOptions) => {
  const app = fastify(options)

  app.register(categoryRouters, { prefix: '/categories' })
  app.register(productRouters, { prefix: '/products' })

  return app
}

export default buildApp
