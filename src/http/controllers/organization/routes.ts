import { FastifyInstance } from "fastify";
import { create } from "./create";
import { authenticate } from "./authenticate";
import { verifyJWT } from "../middlewares/jwtSign";
import { update } from "./update";

export async function OrganizationRoutes(app: FastifyInstance) {
  app.post('/', create)
  app.post('/authenticate', authenticate)

  app.addHook("onRequest", verifyJWT)
  app.post('/update', update)
}