import { FastifyInstance } from "fastify";
import { create } from "./create";
import { authenticate } from "./authenticate";

export async function OrganizationRoutes(app: FastifyInstance) {
  app.post('/', create)
  app.post('/authenticate', authenticate)
}