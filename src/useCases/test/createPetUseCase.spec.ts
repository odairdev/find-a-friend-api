import { InMemoryOrganizationsRepository } from "@/repositories/inMemory/InMemoryOrganizationsRepository";
import { InMemoryPetsRepository } from "@/repositories/inMemory/InMemoryPetsRepository";
import { describe, it, beforeEach, expect } from "vitest";
import { CreatePetUseCase } from "../createPetUseCase";
import { hash } from "bcryptjs";
import { Organization } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/ResourceNotFound";

let organizationsRepository: InMemoryOrganizationsRepository;
let petsRepository: InMemoryPetsRepository;
let testOrganization: Organization;
let sut: CreatePetUseCase;

describe("Create Pet Use Case", () => {
  beforeEach(async () => {
    organizationsRepository = new InMemoryOrganizationsRepository();
    petsRepository = new InMemoryPetsRepository();
    sut = new CreatePetUseCase(organizationsRepository, petsRepository);

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
  });

  it("should be able to create a pet", async () => {
    const pet = await sut.execute({
      id: "pet-01",
      name: "Toby",
      about: "Nice dog",
      age: 3,
      size: "SMALL",
      energy: "Normal",
      independence_level: 1,
      environment: "Ambiente Pequeno",
      requirements: ["Problema respiratorio"],
      organization_id: testOrganization.id,
      organization_city: testOrganization.city,
    });

    expect(pet.id).toEqual("pet-01");
  });

  it("should not be able to create a pet without a valid organization", async () => {
    await expect(async () => {
      await sut.execute({
        id: "pet-01",
        name: "Toby",
        about: "Nice dog",
        age: 3,
        size: "SMALL",
        energy: "Normal",
        independence_level: 1,
        environment: "Ambiente Pequeno",
        requirements: ["Problema respiratorio"],
        organization_id: "wrong",
        organization_city: testOrganization.city,
      });
    }).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
