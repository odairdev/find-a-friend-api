import { Prisma, Pet } from "@prisma/client";
import { IPetsRepository } from "../IPetsRepository";
import { randomUUID } from "crypto";

export interface PetRequestInterface {
    id?: string | undefined;
    name: string;
    about?: string | null | undefined;
    age: number;
    size: 'SMALL' | 'MEDIUM' | 'BIG',
    energy: 'Low' | 'Normal' | 'High',
    independence_level: number;
    environment: string;
    requirements: string[],
    organization_id: string;
    created_at?: Date;
}

export class InMemoryPetsRepository implements IPetsRepository {
  public db: Pet[] = []

  async create(data: PetRequestInterface): Promise<Pet> {

    const pet = {
      id: data.id ? data.id : randomUUID(),
      name: data.name,
      about: data.about ?? null,
      age: data.age,
      size: data.size,
      energy: data.energy,
      independence_level: data.independence_level,
      environment: data.environment,
      requirements: data.requirements,
      organization_id: data.organization_id,
      created_at: new Date()
    }

    this.db.push(pet)

    return pet
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = this.db.find(pet => pet.id === id) ?? null

    return pet
  }
}