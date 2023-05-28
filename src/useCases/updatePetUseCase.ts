import { IPetsRepository } from "@/repositories/IPetsRepository";
import { Energy, Pet, Size } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/ResourceNotFound";

type PetRequest = {
  id: string;
  name: string;
  about: string | null;
  age: number;
  size: Size;
  energy: Energy;
  independence_level: number;
  environment: string;
  requirements: string[];
  organization_id: string;
  organization_city: string;
}

export class UpdatePetUseCase {
  constructor(private petsRepository: IPetsRepository) {}

  async execute(pet: PetRequest) {
    const petExists = await this.petsRepository.findById(pet.id)

    if(!petExists) {
      throw new ResourceNotFoundError()
    }

    const updatedPet = await this.petsRepository.update({
      ...pet,
      created_at: petExists.created_at
    })

    return updatedPet
  }
}