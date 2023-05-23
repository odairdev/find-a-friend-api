import { PrismaOrganizationsRepository } from "@/repositories/prisma/PrismaOrganizationsRepository";
import { CreateOrganizationUseCase } from "../createOrganizationUseCase";

export function makeCreateOrganizationUseCase() {
  const organizationsRepository  = new PrismaOrganizationsRepository()
  const createOrganizationUseCasee = new CreateOrganizationUseCase(organizationsRepository)

  return createOrganizationUseCasee
}