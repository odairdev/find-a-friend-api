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

  async update(data: Organization): Promise<Organization> {
    const updatedOrg = await prisma.organization.update({
      where: {
        id: data.id
      },
      data
    })

    return updatedOrg
  }

  async findByEmail(email: string): Promise<Organization | null> {
    const organization = await prisma.organization.findUnique({
      where: {
        email
      }
    })

    return organization
  }

  async findById(id: string): Promise<Organization | null> {
    const organization = await prisma.organization.findUnique({
      where: {
        id
      }
    })
    return organization
  }
}