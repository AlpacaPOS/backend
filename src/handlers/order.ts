import { FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from '../helpers/utils'
import {
  AddOrderRequest,
  CancelOrderRequest,
  GetOrderRequest,
  PaymentOrderRequest,
} from '../types/handlers/order'

export const getOrders = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    const orders = await prisma.order.findMany({
      include: { OrderDetail: true },
    })

    return res.send(orders)
  } catch (error) {
    return res.status(500).send({ error: error })
  }
}

export const getOrder = async (req: GetOrderRequest, res: FastifyReply) => {
  try {
    const { orderId } = req.params

    const order = await prisma.order.findUnique({
      include: {
        OrderDetail: { select: { price: true, quantity: true } },
        member: { select: { firstname: true, lastname: true } },
        user: { select: { firstname: true, lastname: true } },
      },
      where: { id: Number(orderId) },
    })

    return res.send(order)
  } catch (error) {
    return res.status(500).send({ error: error })
  }
}

export const addOrder = async (req: AddOrderRequest, res: FastifyReply) => {
  try {
    let { orderDetails, userId, memberId } = req.body

    let totals = 0
    for (const orderDetail of orderDetails) {
      totals += orderDetail.price * orderDetail.quantity
    }

    if (memberId) {
      const order = await prisma.order.create({
        data: {
          memberId,
          userId,
          total: totals,
          OrderDetail: {
            createMany: { data: orderDetails },
          },
          orderStatusId: 1,
        },
        include: { OrderDetail: true },
      })
      return res.status(201).send(order)
    } else {
      const order = await prisma.order.create({
        data: {
          userId,
          total: totals,
          OrderDetail: {
            createMany: { data: orderDetails },
          },
          orderStatusId: 1,
        },
        include: { OrderDetail: true },
      })
      return res.status(201).send(order)
    }
  } catch (error) {
    return res.status(400).send(error)
  }
}

export const paymentOrder = async (req: PaymentOrderRequest, res: FastifyReply) => {
  try {
    const { orderId } = req.body

    const order = await prisma.order.update({
      data: { orderStatusId: 2 },
      where: { id: orderId },
      select: {
        OrderDetail: {
          select: {
            id: true,
            product: {
              select: {
                name: true,
              },
            },
            price: true,
            quantity: true,
          },
        },
        member: {
          select: {
            firstname: true,
            lastname: true,
          },
        },
        user: {
          select: {
            firstname: true,
            lastname: true,
          },
        },
        updatedAt: true,
        total: true,
      },
    })

    return res.send(order)
  } catch (error) {
    return res.status(400).send(error)
  }
}

export const cancelOrder = async (req: CancelOrderRequest, res: FastifyReply) => {
  try {
    const { orderId } = req.body

    const order = await prisma.order.update({
      data: { orderStatusId: 3 },
      where: { id: orderId },
    })

    return res.send(order)
  } catch (error) {
    return res.status(400).send(error)
  }
}

export default {
  addOrder,
  paymentOrder,
  getOrder,
  getOrders,
  cancelOrder,
}
