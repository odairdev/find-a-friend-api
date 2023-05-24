import { IOrganizationsRepository } from "@/repositories/IOrganizationsRepository";
import { IPetsRepository } from "@/repositories/IPetsRepository";
import { PetRequestInterface } from "@/repositories/inMemory/InMemoryPetsRepository";
import { ResourceNotFoundError } from "./errors/ResourceNotFound";

export class CreatePetUseCase {
  constructor(
    private organizationsRepository: IOrganizationsRepository,
    private petsRepository: IPetsRepository
  ) {}

  async execute({
    id,
    name,
    about,
    age,
    size,
    energy,
    independence_level,
    environment,
    requirements,
    organization_id,
  }: PetRequestInterface) {
    const organization = await this.organizationsRepository.findById(
      organization_id
    );

    if (!organization) {
      throw new ResourceNotFoundError();
    }

    const pet = await this.petsRepository.create({
      id,
      name,
      about,
      age,
      size,
      energy,
      independence_level,
      environment,
      requirements,
      organization_id,
    });

    return pet;
  }
}
