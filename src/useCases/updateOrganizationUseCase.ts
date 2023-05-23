import { IOrganizationsRepository } from "@/repositories/IOrganizationsRepository";
import { Organization, Prisma } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/ResourceNotFound";
import { hash } from "bcryptjs";

interface UpdateOrganizationUseCaseRequest {
  id?: string | undefined;
  name: string;
  owner: string;
  email: string;
  cep: string;
  city: string;
  neighborhood: string;
  address: string;
  whatsapp: string;
  password: string;
}

export class UpdateOrganizationUseCase {
  constructor(private organizationsRepository: IOrganizationsRepository) {}

  async execute(data: UpdateOrganizationUseCaseRequest) {
    if (!data.id) {
      throw new ResourceNotFoundError();
    }

    const doesOrganizationExist = await this.organizationsRepository.findById(
      data.id
    );

    if (!doesOrganizationExist) {
      throw new ResourceNotFoundError();
    }

    const updatedOrganization = await this.organizationsRepository.update({
      id: doesOrganizationExist.id,
      name: data.name,
      owner: data.owner,
      email: data.email,
      cep: data.cep,
      city: data.city,
      neighborhood: data.neighborhood,
      address: data.address,
      whatsapp: data.whatsapp,
      password_hash: await hash(data.password, 6),
      created_at: doesOrganizationExist.created_at,
    });

    return updatedOrganization;
  }
}
