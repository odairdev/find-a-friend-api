import { Organization, Prisma } from "@prisma/client";
import {
  IOrganizationsRepository,
} from "../IOrganizationsRepository";
import { randomUUID } from "crypto";

export class InMemoryOrganizationsRepository
  implements IOrganizationsRepository
{
  public db: Organization[] = [];

  async create(data: Prisma.OrganizationCreateInput): Promise<Organization> {
    const newOrganization = {
      ...data,
      id: data.id ? data.id : randomUUID(),
      created_at: new Date(),
    };

    this.db.push(newOrganization);

    return newOrganization;
  }

  async update(data: Organization): Promise<Organization> {
    const orgIndex = this.db.findIndex((org) => org.id === data.id);

    if (orgIndex >= 0) {
      this.db[orgIndex] = {
        id: data.id,
        name: data.name,
        owner: data.owner,
        email: data.email,
        cep: data.cep,
        city: data.city,
        neighborhood: data.neighborhood,
        address: data.address,
        whatsapp: data.whatsapp,
        password_hash: data.password_hash,
        created_at: data.created_at,
      };
    }

    return this.db[orgIndex];
  }

  async findByEmail(email: string): Promise<Organization | null> {
    const organization = this.db.find((org) => org.email === email) ?? null;

    return organization;
  }

  async findById(id: string): Promise<Organization | null> {
    const organization = this.db.find((org) => org.id === id) ?? null;

    return organization;
  }
}
