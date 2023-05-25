import { Energy, Pet, Size } from "@prisma/client";
import { IPetsRepository } from "../IPetsRepository";
import { PetRequestInterface } from "../inMemory/InMemoryPetsRepository";
import { prisma } from "@/lib/prisma";

export class PrismaPetsRepository implements IPetsRepository {
  async create(data: PetRequestInterface): Promise<Pet> {
    const pet = await prisma.pet.create({
      data,
    });

    return pet;
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    });

    return pet;
  }

  async findManyByCity(
    organization_city: string,
    age?: number | undefined,
    energy?: Energy | undefined,
    size?: Size | undefined,
    independence_level?: number | undefined
  ): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      where: {
        organization_city,
        age,
        energy,
        size,
        independence_level
      }
    })

    return pets
  }
}
