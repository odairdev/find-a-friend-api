import { Energy, Pet, Size } from "@prisma/client";
import { PetRequestInterface } from "./inMemory/InMemoryPetsRepository";

export interface IPetsRepository {
  create(data: PetRequestInterface): Promise<Pet>;
  findById(id: string): Promise<Pet | null>;
  findManyByCity(
    organization_city: string,
    age?: number,
    energy?: Energy,
    size?: Size,
    independence_level?: number
  ): Promise<Pet[]>;
}
