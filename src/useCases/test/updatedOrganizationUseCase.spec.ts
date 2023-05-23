import { InMemoryOrganizationsRepository } from "@/repositories/inMemory/InMemoryOrganizationsRepository";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { hash } from "bcryptjs";
import { UpdateOrganizationUseCase } from "../updateOrganizationUseCase";
import { ResourceNotFoundError } from "../errors/ResourceNotFound";

let inMemoryOrganizationsRepository: InMemoryOrganizationsRepository;
let sut: UpdateOrganizationUseCase;

describe("Update Organization Use Case", () => {
  beforeEach(async () => {
    inMemoryOrganizationsRepository = new InMemoryOrganizationsRepository();
    sut = new UpdateOrganizationUseCase(inMemoryOrganizationsRepository);

    await inMemoryOrganizationsRepository.create({
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

  it("should be able to create an organization", async () => {
    const organization = await sut.execute({
      id: "org-1",
      name: "Updated Org",
      owner: "John Doe",
      email: "johndoe@email.com",
      cep: "99999999",
      city: "Sao Paulo",
      neighborhood: "Downtown",
      address: "Any Street",
      whatsapp: "99999999999",
      password: "123456",
    });

    expect(organization.name).toEqual("Updated Org");
  });

  it("should not be able to create an organization with wrong id", async () => {
    await expect(async () => {
      await sut.execute({
        id: "org-2",
        name: "Updated Org",
        owner: "John Doe",
        email: "johndoe@email.com",
        cep: "99999999",
        city: "Sao Paulo",
        neighborhood: "Downtown",
        address: "Any Street",
        whatsapp: "99999999999",
        password: "123456",
      });
    }).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
