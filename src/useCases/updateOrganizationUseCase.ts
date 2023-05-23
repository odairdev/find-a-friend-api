import { IOrganizationsRepository } from "@/repositories/IOrganizationsRepository";
import { Organization, Prisma } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/ResourceNotFound";

export class UpdateOrganizationUseCase {
  constructor(private organizationsRepository: IOrganizationsRepository) {}

  async execute(data: Prisma.OrganizationUncheckedCreateInput) {
    if(!data.id) {
      throw new ResourceNotFoundError()
    }

    const doesOrganizationExist = await this.organizationsRepository.findById(data.id)

    if(!doesOrganizationExist) {
      throw new ResourceNotFoundError()
    }

    const updatedOrganization = await this.organizationsRepository.update({
      id: doesOrganizationExist.id,
      ...data,
      created_at: doesOrganizationExist.created_at
    })

    return updatedOrganization
  }
}