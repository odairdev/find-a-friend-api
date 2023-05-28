import { ResourceNotFoundError } from "@/useCases/errors/ResourceNotFound";
import { makeDeltePetUseCase } from "@/useCases/factories/makeDeletePetUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function deletePet(request: FastifyRequest, reply: FastifyReply) {
  const deletePetParams = z.object({
    petId: z.string().uuid()
  })

  const { petId} = deletePetParams.parse(request.params)

  try {
    const deletePetUseCase = makeDeltePetUseCase()

    await deletePetUseCase.execute(petId)

    return reply.status(200)
  } catch(err) {
    if(err instanceof ResourceNotFoundError) {
      return reply.status(400).send({message: err.message})
    } else {
      return reply.status(500)
    }
  }
}