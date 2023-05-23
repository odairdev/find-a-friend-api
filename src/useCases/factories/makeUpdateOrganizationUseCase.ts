import { PrismaOrganizationsRepository } from "@/repositories/prisma/PrismaOrganizationsRepository";
import { UpdateOrganizationUseCase } from "../updateOrganizationUseCase";

export function makeUpdateOrganizationUseCase() {
  const organizationsRepository  = new PrismaOrganizationsRepository()
  const updateOrganizationUseCasee = new UpdateOrganizationUseCase(organizationsRepository)

  return updateOrganizationUseCasee
}