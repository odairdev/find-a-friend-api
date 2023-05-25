import { PrismaPetsRepository } from "@/repositories/prisma/PrismaPetsRepository";
import { FetchManyPetsByCityUseCase } from "../fetchManyPetsByCityUseCase";

export function makeFetchManyPetsUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const fetchManyPetsByCityUseCase = new FetchManyPetsByCityUseCase(petsRepository)

  return fetchManyPetsByCityUseCase
}