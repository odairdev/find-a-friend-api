import { Energy, Pet, Size } from "@prisma/client";
import { IPetsRepository } from "../IPetsRepository";
import { randomUUID } from "crypto";

export interface PetRequestInterface {
  id?: string | undefined;
  name: string;
  about?: string | null | undefined;
  age: number;
  size: "SMALL" | "MEDIUM" | "BIG";
  energy: "Low" | "Normal" | "High";
  independence_level: number;
  environment: string;
  requirements: string[];
  organization_id: string;
  organization_city: string;
  created_at?: Date;
}

export class InMemoryPetsRepository implements IPetsRepository {
  public db: Pet[] = [];

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
      organization_city: data.organization_city,
      created_at: new Date(),
    };

    this.db.push(pet);

    return pet;
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = this.db.find((pet) => pet.id === id) ?? null;

    return pet;
  }

  async findManyByCity(
    organization_city: string,
    age?: number,
    energy?: Energy,
    size?: Size,
    independence_level?: number
  ): Promise<Pet[]> {
    let cityFilteredPets = this.db.filter(
      (pet) => pet.organization_city === organization_city
    );

    if (age) {
      cityFilteredPets = cityFilteredPets.filter((pet) => pet.age === age);
    }

    if (energy) {
      cityFilteredPets = cityFilteredPets.filter(
        (pet) => pet.energy === energy
      );
    }

    if (size) {
      cityFilteredPets = cityFilteredPets.filter((pet) => pet.size === size);
    }

    if (independence_level) {
      cityFilteredPets = cityFilteredPets.filter(
        (pet) => pet.independence_level === independence_level
      );
    }

    return cityFilteredPets;
  }
}
