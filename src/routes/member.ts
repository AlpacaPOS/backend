import { FastifyInstance } from 'fastify'
import { addMember, deleteMember, getMember, getMembers, updateMember } from '../handlers/member'

const memberRouters = async (app: FastifyInstance) => {
  app.get('/', getMembers)
  app.get('/:memberId', getMember)
  app.post('/', addMember)
  app.put('/', updateMember)
  app.delete('/:memberId', deleteMember)
}

export default memberRouters
