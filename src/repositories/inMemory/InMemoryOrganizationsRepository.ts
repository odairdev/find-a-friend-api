import { Organization, Prisma } from "@prisma/client";
import { IOrganizationsRepository } from "../IOrganizationsRepository";
import { randomUUID } from "crypto";

export class InMemoryOrganizationsRepository implements IOrganizationsRepository {
  public db: Organization[] = []

  async create(data: Prisma.OrganizationCreateInput): Promise<Organization> {
    const newOrganization = {
      ...data,
      id: data.id ? data.id : randomUUID(),
      created_at: new Date()
    }

    this.db.push(newOrganization)

    return newOrganization
  }

  async findByEmail(email: string): Promise<Organization | null> {
    const organization = this.db.find(org => org.email === email) ?? null

    return organization
  }
}