import { InMemoryOrganizationsRepository } from "@/repositories/inMemory/InMemoryOrganizationsRepository";
import { describe, it, expect, beforeEach } from "vitest";
import { AuthenticateUseCase } from "../authenticateUseCase";
import { hash } from "bcryptjs";
import { Organization } from "@prisma/client";
import { AuthenticationError } from "../errors/AuthenticationError";

let organizationsRepository: InMemoryOrganizationsRepository;
let sut: AuthenticateUseCase;
let organization: Organization;

describe("Authenticate Use Case", () => {
  beforeEach(async () => {
    organizationsRepository = new InMemoryOrganizationsRepository();
    sut = new AuthenticateUseCase(organizationsRepository);

    organization = await organizationsRepository.create({
      id: "org-1",
      name: "Pet Org",
      owner: "John Doe",
      email: "johndoe@email.com",
      cep: 99999999,
      city: "Sao Paulo",
      neighborhood: "Downtown",
      address: "Any Street",
      whatsapp: 99999999999,
      password_hash: await hash("123456", 6),
    });
  });

  it("should be able to authenticate organization", async () => {
    const result = await sut.execute(organization.email, "123456");

    expect(result.organization.id).toEqual("org-1");
  });

  it("should not be able to authenticate organization with wrong email", async () => {
    await expect(async () => {
      await sut.execute("doejohn@email.com", "123456")
    }).rejects.toBeInstanceOf(AuthenticationError)
  });

  it("should not be able to authenticate organization with wrong email", async () => {
    await expect(async () => {
      await sut.execute(organization.email, "123123")
    }).rejects.toBeInstanceOf(AuthenticationError)
  });
});
