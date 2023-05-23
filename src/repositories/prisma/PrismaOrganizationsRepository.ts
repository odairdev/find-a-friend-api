import { Prisma, Organization } from "@prisma/client";
import { IOrganizationsRepository } from "../IOrganizationsRepository";
import { prisma } from "@/lib/prisma";

export class PrismaOrganizationsRepository implements IOrganizationsRepository {
  async create(data: Prisma.OrganizationCreateInput): Promise<Organization> {
    const organization = await prisma.organization.create({
      data
    })

    return organization
  }

  async findByEmail(email: string): Promise<Organization | null> {
    const organization = await prisma.organization.findUnique({
      where: {
        email
      }
    })

    return organization
  }
}