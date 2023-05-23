import { AddressRequiredError } from "@/useCases/errors/AddressRequiredError";
import { EmailAlreadyExistsError } from "@/useCases/errors/EmailAlreadyExistsError";
import { makeCreateOrganizationUseCase } from "@/useCases/factories/makeCreateOrganizationUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
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
    const createOrganizationUseCase = makeCreateOrganizationUseCase();

    const org = await createOrganizationUseCase.execute({
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
    if(err instanceof AddressRequiredError || err instanceof EmailAlreadyExistsError) {
      return reply.status(400).send({message: err.message})
    } else {
      return reply.status(500)
    }
  }
}
