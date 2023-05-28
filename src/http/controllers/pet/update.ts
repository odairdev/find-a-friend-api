import { ResourceNotFoundError } from "@/useCases/errors/ResourceNotFound";
import { makeUpdatePetUseCase } from "@/useCases/factories/makeUpdatePetUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updatePetParamsSchema = z.object({
    id: z.string().uuid()
  })

  const updatePetBodySchema = z.object({
    name: z.string(),
    about: z.string().nullable(),
    age: z.number().max(30),
    size: z.enum(["SMALL", "MEDIUM", "BIG"]),
    energy: z.enum(["Low", "Normal", "High"]),
    independence_level: z.number().max(3),
    environment: z.string(),
    requirements: z.array(z.string()),
  });

  const {
    name,
    about,
    age,
    size,
    energy,
    independence_level,
    environment,
    requirements,
  } = updatePetBodySchema.parse(request.body);

  const { id } = updatePetParamsSchema.parse(request.params)

  try {
    const createPetUseCase = makeUpdatePetUseCase()

    const pet = await createPetUseCase.execute({
      id,
      name,
      about,
      age,
      size,
      energy,
      independence_level,
      environment,
      requirements,
      organization_id: request.user.sub,
      organization_city: request.user.city
    })

    return reply.status(201).send({pet})
  }catch(err) {
    if(err instanceof ResourceNotFoundError) {
      return reply.status(400).send({message: err.message})
    } else {
      return reply.status(500)
    }
  }
}
