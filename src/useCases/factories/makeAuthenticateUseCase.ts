import { PrismaOrganizationsRepository } from "@/repositories/prisma/PrismaOrganizationsRepository";
import { AuthenticateUseCase } from "../authenticateUseCase";

export function makeAutehnticateUseCase() {
  const organizationsRepository = new PrismaOrganizationsRepository()
  const authenticateUseCase = new AuthenticateUseCase(organizationsRepository)

  return authenticateUseCase
}