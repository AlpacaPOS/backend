import { FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from '../helpers/utils'
import {
  AddProductRequest,
  DeleteProductRequest,
  GetProductRequest,
  UpdateProductRequest,
} from '../types/handlers/product'

export const getProducts = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    const products = await prisma.product.findMany()

    return res.send(products)
  } catch (error) {
    return res.status(500).send({ error: error })
  }
}

export const getProduct = async (req: GetProductRequest, res: FastifyReply) => {
  try {
    const { productId } = req.params

    const product = await prisma.product.findUnique({ where: { id: Number(productId) } })

    return res.send(product)
  } catch (error) {
    return res.status(400).send({ error: error })
  }
}

export const addProduct = async (req: AddProductRequest, res: FastifyReply) => {
  try {
    const { name, price, categoryId } = req.body

    const product = await prisma.product.create({ data: { name, price, categoryId } })

    return res.status(201).send(product)
  } catch (error) {
    return res.status(400).send({ error: error })
  }
}

export const updateProduct = async (req: UpdateProductRequest, res: FastifyReply) => {
  try {
    const { name, price, productId, categoryId } = req.body

    const product = await prisma.product.update({
      data: { name, price, categoryId },
      where: { id: productId },
    })

    return res.send(product)
  } catch (error) {
    return res.status(400).send({ error: error })
  }
}

export const deleteProduct = async (req: DeleteProductRequest, res: FastifyReply) => {
  try {
    const { productId } = req.params

    await prisma.product.delete({ where: { id: Number(productId) } })

    return res.status(204).send()
  } catch (error) {
    return res.status(400).send({ error: error })
  }
}

export default {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
}
