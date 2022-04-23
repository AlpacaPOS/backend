import fastify, { FastifyServerOptions } from 'fastify'

const buildApp = (options: FastifyServerOptions) => {
  const app = fastify(options)

  return app
}

export default buildApp
