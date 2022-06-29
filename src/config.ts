import 'dotenv/config'

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  origin: process.env.ORIGIN || '*',
}

export default config
