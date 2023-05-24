import { Pet, Prisma } from "@prisma/client";
import { PetRequestInterface } from "./inMemory/InMemoryPetsRepository";

export interface IPetsRepository {
  create(data: PetRequestInterface): Promise<Pet>
  findById(id: string): Promise<Pet | null>
}