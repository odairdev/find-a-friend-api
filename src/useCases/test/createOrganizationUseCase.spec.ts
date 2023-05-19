import { InMemoryOrganizationsRepository } from "@/repositories/inMemory/InMemoryOrganizationsRepository";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { CreateOrganizationUseCase } from "../createOrganizationUseCase";

let inMemoryOrganizationsRepository: InMemoryOrganizationsRepository;
let sut: CreateOrganizationUseCase;

describe("Create Organization Use Case", () => {
  beforeEach(() => {
    inMemoryOrganizationsRepository = new InMemoryOrganizationsRepository();
    sut = new CreateOrganizationUseCase(inMemoryOrganizationsRepository);
  });

  it("should be able to create an organization", async () => {
    const organization = await sut.execute({
      id: "org-1",
      name: "Pet Org",
      owner: "John Doe",
      email: "johndoe@email.com",
      cep: 99999999,
      city: "Sao Paulo",
      neighborhood: "Downtown",
      address: "Any Street",
      whatsapp: 99999999999,
      password: "123456",
    });

    expect(organization.id).toEqual(expect.any(String))
  });
});
