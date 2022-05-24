import { FastifyInstance } from 'fastify'
import { getDailySell, getDailyBestSeller, getTotalSell } from '../handlers/report'

const reportRouters = async (app: FastifyInstance) => {
  app.post('/dailysell', getDailySell)
  app.post('/dailybestseller', getDailyBestSeller)
  app.get('/totalsell', getTotalSell)
}

export default reportRouters
