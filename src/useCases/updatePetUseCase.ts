import { IPetsRepository } from "@/repositories/IPetsRepository";
import { Pet } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/ResourceNotFound";

export class UpdatePetUseCase {
  constructor(private petsRepository: IPetsRepository) {}

  async execute(pet: Pet) {
    const petExists = await this.petsRepository.findById(pet.id)

    if(!petExists) {
      throw new ResourceNotFoundError()
    }

    const updatedPet = await this.petsRepository.update(pet)

    return updatedPet
  }
}