import { PrismaPetsRepository } from "@/repositories/prisma/PrismaPetsRepository";
import { UpdatePetUseCase } from "../updatePetUseCase";

export function makeUpdatePetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const updatePetUseCase = new UpdatePetUseCase(petsRepository)

  return updatePetUseCase
}