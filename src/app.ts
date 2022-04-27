import fastify, { FastifyServerOptions } from 'fastify'
import categoryRouters from './routes/category'

const buildApp = (options: FastifyServerOptions) => {
  const app = fastify(options)

  app.register(categoryRouters, { prefix: '/categories' })

  return app
}

export default buildApp
