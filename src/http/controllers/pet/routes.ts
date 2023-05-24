import { FastifyInstance } from "fastify";
import { create } from "./create";
import { verifyJWT } from "../middlewares/jwtSign";
import { fetch } from "./fetch";

export async function PetsRoutes(app: FastifyInstance) {

  app.get('/:id', fetch)
  
  app.addHook("onRequest", verifyJWT)
  app.post('/', create)
}