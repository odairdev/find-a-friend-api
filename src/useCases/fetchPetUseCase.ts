import { IPetsRepository } from "@/repositories/IPetsRepository";
import { ResourceNotFoundError } from "./errors/ResourceNotFound";

export class FetchPetUseCase {
  constructor(private petsRepository: IPetsRepository) {}

  async execute(id: string) {
    const pet = await this.petsRepository.findById(id)

    if(!pet) {
      throw new ResourceNotFoundError()
    }

    return pet
  }
}