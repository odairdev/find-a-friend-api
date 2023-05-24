import { ResourceNotFoundError } from "@/useCases/errors/ResourceNotFound";
import { makeCreatePetUseCase } from "@/useCases/factories/makeCreatePetUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
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
  } = createPetBodySchema.parse(request.body);

  try {
    const createPetUseCase = makeCreatePetUseCase()

    const pet = await createPetUseCase.execute({
      name,
      about,
      age,
      size,
      energy,
      independence_level,
      environment,
      requirements,
      organization_id: request.user.sub
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
