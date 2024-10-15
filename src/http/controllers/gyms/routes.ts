import { FastifyInstance } from 'fastify'

import { search } from './search'
import { nearby } from './nearby'
import { create } from './create'
import { VerifyJWT } from '@/http/middlewares/verify-jwt'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', VerifyJWT)

  app.get('/gyms/search', search)
  app.get('/gyms/nearby', nearby)

  app.post('/gyms', create)
}