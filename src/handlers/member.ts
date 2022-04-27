import { FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from '../helpers/utils'
import {
  AddMemberRequest,
  GetMemberRequest,
  DeleteMemberRequest,
  UpdateMemberRequest,
} from '../types/handlers/member'

export const getMembers = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    const members = await prisma.member.findMany()

    return res.send(members)
  } catch (error) {
    return res.status(500).send({ error: error })
  }
}

export const getMember = async (req: GetMemberRequest, res: FastifyReply) => {
  try {
    const { memberId } = req.params

    const member = await prisma.member.findUnique({ where: { id: Number(memberId) } })

    return res.send(member)
  } catch (error) {
    return res.status(400).send({ error: error })
  }
}

export const addMember = async (req: AddMemberRequest, res: FastifyReply) => {
  try {
    const { email, firstname, lastname, phone } = req.body

    const member = await prisma.member.create({ data: { email, firstname, lastname, phone } })

    return res.status(201).send(member)
  } catch (error) {
    return res.status(400).send({ error: error })
  }
}

export const updateMember = async (req: UpdateMemberRequest, res: FastifyReply) => {
  try {
    const { memberId, email, firstname, lastname, phone } = req.body

    const member = await prisma.member.update({
      data: { email, firstname, lastname, phone },
      where: { id: memberId },
    })

    return res.send(member)
  } catch (error) {
    return res.status(400).send({ error: error })
  }
}

export const deleteMember = async (req: DeleteMemberRequest, res: FastifyReply) => {
  try {
    const { memberId } = req.params

    await prisma.member.delete({ where: { id: Number(memberId) } })

    return res.status(204).send()
  } catch (error) {
    return res.status(400).send({ error: error })
  }
}

export default {
  getMembers,
  getMember,
  addMember,
  updateMember,
  deleteMember,
}
