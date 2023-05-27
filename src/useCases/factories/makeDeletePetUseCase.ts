import { PrismaPetsRepository } from "@/repositories/prisma/PrismaPetsRepository";
import { DeletePetUseCase } from "../deletePetUseCase";

export function makeDeltePetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const deletePetUseCase = new DeletePetUseCase(petsRepository)

  return deletePetUseCase
}