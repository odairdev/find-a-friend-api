import { PrismaOrganizationsRepository } from "@/repositories/prisma/PrismaOrganizationsRepository";
import { PrismaPetsRepository } from "@/repositories/prisma/PrismaPetsRepository";
import { CreatePetUseCase } from "../createPetUseCase";
import { FetchPetUseCase } from "../fetchPetUseCase";

export function makeFetchPetUseCase() {
  const petsReposiroty = new PrismaPetsRepository()
  const fetchPetUseCase = new FetchPetUseCase(petsReposiroty)

  return fetchPetUseCase
}