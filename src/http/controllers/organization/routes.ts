import { FastifyInstance } from "fastify";
import { create } from "./create";

export async function OrganizationRoutes(app: FastifyInstance) {
  app.post('/', create)
}