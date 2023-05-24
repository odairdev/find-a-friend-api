import { Pet } from "@prisma/client";
import { IPetsRepository } from "../IPetsRepository";
import { PetRequestInterface } from "../inMemory/InMemoryPetsRepository";
import { prisma } from "@/lib/prisma";

export class PrismaPetsRepository implements IPetsRepository {
  async create(data: PetRequestInterface): Promise<Pet> {
    const pet = await prisma.pet.create({
      data
    })

    return pet
  }
  
  async findById(id: string): Promise<Pet | null> {
    const pet = await prisma.pet.findUnique({
      where: {
        id
      }
    })

    return pet
  }
}