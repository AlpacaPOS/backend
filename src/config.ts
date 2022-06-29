import 'dotenv/config'

const config = {
  env: process.env.NODE_ENV || 'development',
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3000,
  origin: process.env.ORIGIN || '*',
}

export default config
