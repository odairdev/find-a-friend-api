import { IPetsRepository } from "@/repositories/IPetsRepository";
import { ResourceNotFoundError } from "./errors/ResourceNotFound";

export class DeletePetUseCase {
  constructor(private petsRepository: IPetsRepository) {}

  async execute(petId: string) {
    const doesPetExist = await this.petsRepository.findById(petId)

    if(!doesPetExist) {
      throw new ResourceNotFoundError()
    }

    this.petsRepository.deletePet(petId)
  }
}