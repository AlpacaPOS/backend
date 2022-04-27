import { FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from '../helpers/utils'
import {
  GetCategoryRequest,
  AddCategoryRequest,
  UpdateCategoryRequest,
  DeleteCategoryRequest,
} from '../types/handlers/category'

export const getCategories = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    const categories = await prisma.category.findMany()

    return res.send(categories)
  } catch (error) {
    return res.status(500).send({ error: error })
  }
}

export const getCategory = async (req: GetCategoryRequest, res: FastifyReply) => {
  try {
    const { categoryId } = req.params

    const category = await prisma.category.findUnique({ where: { id: Number(categoryId) } })

    return res.send(category)
  } catch (error) {
    return res.status(400).send({ error: error })
  }
}

export const addCategory = async (req: AddCategoryRequest, res: FastifyReply) => {
  try {
    const { name } = req.body

    const category = await prisma.category.create({ data: { name } })

    return res.status(201).send(category)
  } catch (error) {
    return res.status(400).send({ error: error })
  }
}

export const updateCategory = async (req: UpdateCategoryRequest, res: FastifyReply) => {
  try {
    const { categoryId, name } = req.body

    const category = await prisma.category.update({ data: { name }, where: { id: categoryId } })

    return res.status(200).send(category)
  } catch (error) {
    return res.status(400).send({ error: error })
  }
}

export const deleteCategory = async (req: DeleteCategoryRequest, res: FastifyReply) => {
  try {
    const { categoryId } = req.params

    await prisma.category.delete({ where: { id: Number(categoryId) } })

    return res.status(204).send()
  } catch (error) {
    return res.status(400).send({ error: error })
  }
}

export default {
  getCategories,
  getCategory,
}
