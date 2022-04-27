import fastify, { FastifyServerOptions } from 'fastify'
import categoryRouters from './routes/category'
import employeeRouters from './routes/employee'
import productRouters from './routes/product'
import stockRouters from './routes/stock'

const buildApp = (options: FastifyServerOptions) => {
  const app = fastify(options)

  app.register(categoryRouters, { prefix: '/categories' })
  app.register(productRouters, { prefix: '/products' })
  app.register(stockRouters, { prefix: 'stocks' })
  app.register(employeeRouters, { prefix: '/employees' })

  return app
}

export default buildApp
