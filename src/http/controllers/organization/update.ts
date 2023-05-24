import { ResourceNotFoundError } from "@/useCases/errors/ResourceNotFound";
import { makeUpdateOrganizationUseCase } from "@/useCases/factories/makeUpdateOrganizationUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const createORganizationBodySchema = z.object({
    name: z.string().min(1),
    owner: z.string().min(1),
    email: z.string().email(),
    cep: z.string(),
    city: z.string().min(1),
    neighborhood: z.string().min(1),
    address: z.string().min(1),
    whatsapp: z.string(),
    password: z.string().min(6),
  });

  const {
    name,
    owner,
    email,
    cep,
    city,
    neighborhood,
    address,
    whatsapp,
    password,
  } = createORganizationBodySchema.parse(request.body);

  try {
    const updateOrganizationUseCase = makeUpdateOrganizationUseCase();

    const org = await updateOrganizationUseCase.execute({
      id: request.user.sub,
      name,
      owner,
      email,
      cep,
      city,
      neighborhood,
      address,
      whatsapp,
      password,
    });

    return reply.status(201).send(org)
  } catch (err) {
    if(err instanceof ResourceNotFoundError) {
      return reply.status(400).send({message: err.message})
    } else {
      return reply.status(500)
    }
  }
}
