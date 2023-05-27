import { InMemoryOrganizationsRepository } from "@/repositories/inMemory/InMemoryOrganizationsRepository";
import { InMemoryPetsRepository } from "@/repositories/inMemory/InMemoryPetsRepository";
import { describe, it, beforeEach, expect } from "vitest";
import { hash } from "bcryptjs";
import { Organization, Pet } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/ResourceNotFound";
import { DeletePetUseCase } from "../deletePetUseCase";
import { UpdatePetUseCase } from "../updatePetUseCase";

let organizationsRepository: InMemoryOrganizationsRepository;
let petsRepository: InMemoryPetsRepository;
let testOrganization: Organization;
let sut: UpdatePetUseCase;
let pet: Pet

describe("Delete Pet Use Case", () => {
  beforeEach(async () => {
    organizationsRepository = new InMemoryOrganizationsRepository();
    petsRepository = new InMemoryPetsRepository();
    sut = new UpdatePetUseCase(petsRepository);

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

    pet = await petsRepository.create({
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
      organization_city: testOrganization.city
    });
  });

  it("should be able to update a pet", async () => {
    const updatedPet = await sut.execute({
      ...pet,
      name: 'New Pet',
    });

    expect(updatedPet.name).toEqual('New Pet');
  });

  it("should not be able to delete a pet with invalid id", async () => {
    await expect(async () => {
      await sut.execute({
        ...pet,
        id: 'pet-930293'
      });
    }).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
