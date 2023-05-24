import { FastifyInstance } from "fastify";
import { create } from "./create";
import { verifyJWT } from "../middlewares/jwtSign";

export async function PetsRoutes(app: FastifyInstance) {
  
  app.addHook("onRequest", verifyJWT)
  app.post('/', create)
}