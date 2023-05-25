import { IPetsRepository } from "@/repositories/IPetsRepository";
import { Energy, Size } from "@prisma/client";

interface FetchManyPetsRequest {
  city: string;
  age?: number;
  size?: Size;
  energy?: Energy;
  independence_level?: number;
}

export class FetchManyPetsByCityUseCase {
  constructor(private petsRepository: IPetsRepository) {}

  async execute({
    city,
    age,
    size,
    energy,
    independence_level,
  }: FetchManyPetsRequest) {
    const pets = this.petsRepository.findManyByCity(
      city,
      age,
      energy,
      size,
      independence_level
    );

    return pets;
  }
}
