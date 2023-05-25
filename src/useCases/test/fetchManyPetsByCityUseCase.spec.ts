import { InMemoryOrganizationsRepository } from "@/repositories/inMemory/InMemoryOrganizationsRepository";
import { InMemoryPetsRepository } from "@/repositories/inMemory/InMemoryPetsRepository";
import { describe, it, beforeEach, expect } from "vitest";
import { hash } from "bcryptjs";
import { Organization } from "@prisma/client";
import { FetchManyPetsByCityUseCase } from "../fetchManyPetsByCityUseCase";

let organizationsRepository: InMemoryOrganizationsRepository;
let petsRepository: InMemoryPetsRepository;
let testOrganization: Organization;
let sut: FetchManyPetsByCityUseCase;

describe("Fetch many Pets Use Case", () => {
  beforeEach(async () => {
    organizationsRepository = new InMemoryOrganizationsRepository();
    petsRepository = new InMemoryPetsRepository();
    sut = new FetchManyPetsByCityUseCase(petsRepository);

    testOrganization = await organizationsRepository.create({
      id: "org-1",
      name: "Pet Org",
      owner: "John Doe",
      email: "johndoe@email.com",
      cep: "99999999",
      city: "Sao Paulo",
      neighborhood: "Downtown",
      address: "Any Street",
      whatsapp: "99999999999",
      password_hash: await hash("123456", 6),
    });

    await petsRepository.create({
      id: "pet-01",
      name: "Toby",
      about: "Nice dog",
      age: 3,
      size: "MEDIUM",
      energy: "Normal",
      independence_level: 3,
      environment: "Ambiente Pequeno",
      requirements: ["Problema respiratorio"],
      organization_id: testOrganization.id,
      organization_city: testOrganization.city
    });

    await petsRepository.create({
      id: "pet-02",
      name: "Doe",
      about: "Nice dog",
      age: 2,
      size: "SMALL",
      energy: "High",
      independence_level: 1,
      environment: "Ambiente Pequeno",
      requirements: ["Problema respiratorio"],
      organization_id: testOrganization.id,
      organization_city: testOrganization.city
    });
  });

  it("should be able to fetch many pets", async () => {
    const pets = await sut.execute({city: testOrganization.city});

    expect(pets.length).toEqual(2);
  });

  it("should return 0 if no pets are found in that city", async () => {
    const pets = await sut.execute({city: 'New York'});

    expect(pets.length).toEqual(0);
  });

  it("should be able to fetch many pets by age", async () => {
    const pets = await sut.execute({city: testOrganization.city, age: 2});

    expect(pets[0].age).toEqual(2);
  });

  it("should be able to fetch many pets by size", async () => {
    const pets = await sut.execute({city: testOrganization.city, size: "MEDIUM"});

    expect(pets[0].size).toEqual("MEDIUM");
  });

  it("should be able to fetch many pets by energy", async () => {
    const pets = await sut.execute({city: testOrganization.city, energy: "High"});

    expect(pets[0].energy).toEqual("High");
  });

  it("should be able to fetch many pets by independence", async () => {
    const pets = await sut.execute({city: testOrganization.city, independence_level: 3});

    expect(pets[0].independence_level).toEqual(3);
  });
});
