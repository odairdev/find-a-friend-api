import { PrismaOrganizationsRepository } from "@/repositories/prisma/PrismaOrganizationsRepository";
import { PrismaPetsRepository } from "@/repositories/prisma/PrismaPetsRepository";
import { CreatePetUseCase } from "../createPetUseCase";

export function makeCreatePetUseCase() {
  const organizationsRepository = new PrismaOrganizationsRepository()
  const petsReposiroty = new PrismaPetsRepository()
  const createPetUseCase = new CreatePetUseCase(organizationsRepository, petsReposiroty)

  return createPetUseCase
}