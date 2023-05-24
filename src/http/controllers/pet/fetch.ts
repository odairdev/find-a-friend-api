import { ResourceNotFoundError } from "@/useCases/errors/ResourceNotFound";
import { makeFetchPetUseCase } from "@/useCases/factories/makeFetchPetUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function fetch(request: FastifyRequest, reply: FastifyReply) {
  const fetchPetParamsSchema = z.object({
    id: z.string().uuid()
  })

  const { id } = fetchPetParamsSchema.parse(request.params)

  try {
    const fetchPetUseCase = makeFetchPetUseCase()
    const pet = await fetchPetUseCase.execute(id)

    return reply.status(200).send(pet)
  } catch(err) {
    if(err instanceof ResourceNotFoundError) {
      return reply.status(400).send({message: err.message})
    } else {
      return reply.status(500)
    }
  }
}