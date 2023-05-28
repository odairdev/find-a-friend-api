import { FastifyInstance } from "fastify";
import { create } from "./create";
import { verifyJWT } from "../middlewares/jwtSign";
import { fetch } from "./fetch";
import { fetchMany } from "./fetchMany";
import { deletePet } from "./delete";
import { update } from "./update";

export async function PetsRoutes(app: FastifyInstance) {
  app.get('/', fetchMany)
  app.get('/:id', fetch)
  
  //Authenticated Route
  app.addHook("onRequest", verifyJWT)
  app.post('/', create)
  app.put('/:id', update)
  app.delete('/:id', deletePet)
}