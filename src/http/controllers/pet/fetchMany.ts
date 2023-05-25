import { makeFetchManyPetsUseCase } from "@/useCases/factories/makeFetchManyPetsUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function fetchMany(request: FastifyRequest, reply: FastifyReply) {
  const fetchManyQueryParamsSchema = z.object({
    city: z.string(),
    age: z.coerce.number().positive().max(30).optional(),
    energy: z.enum(["Low", "Normal", "High"]).optional(),
    size: z.enum(["SMALL", "MEDIUM", "BIG"]).optional(),
    independence_level: z.coerce.number().positive().min(1).max(3).optional(),
  });

  const { city, age, energy, size, independence_level } =
    fetchManyQueryParamsSchema.parse(request.query);

  try {
    const fetchManyPetsByCityUseCase = makeFetchManyPetsUseCase();

    const pets = await fetchManyPetsByCityUseCase.execute({
      city,
      age,
      energy,
      size,
      independence_level
    });

    return reply.status(200).send(pets)
  } catch (err) {
    return reply.status(500);
  }
}
