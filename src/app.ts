import fastify, { FastifyServerOptions } from 'fastify'
import cors from '@fastify/cors'
import categoryRouters from './routes/category'
import employeeRouters from './routes/employee'
import memberRouters from './routes/member'
import orderRouters from './routes/order'
import productRouters from './routes/product'
import stockRouters from './routes/stock'
import discountRouters from './routes/discount'
import reportRouters from './routes/reports'

const buildApp = (options: FastifyServerOptions) => {
  const app = fastify(options)

  app.register(cors)

  app.register(categoryRouters, { prefix: '/categories' })
  app.register(productRouters, { prefix: '/products' })
  app.register(stockRouters, { prefix: 'stocks' })
  app.register(employeeRouters, { prefix: '/employees' })
  app.register(memberRouters, { prefix: '/members' })
  app.register(orderRouters, { prefix: '/orders' })
  app.register(discountRouters, { prefix: '/discounts' })
  app.register(reportRouters, { prefix: '/reports' })

  return app
}

export default buildApp
