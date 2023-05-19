import { IOrganizationsRepository } from "@/repositories/IOrganizationsRepository";
import { hash } from "bcryptjs";
import { EmailAlreadyExistsError } from "./errors/EmailAlreadyExistsError";
import { AddressRequiredError } from "./errors/AddressRequiredError";

interface CreateOrganizationRequest {
  id?: string | undefined;
  name: string;
  owner: string;
  email: string;
  cep: number;
  city: string;
  neighborhood: string;
  address: string;
  whatsapp: number;
  password: string;
}

export class CreateOrganizationUseCase {
  constructor(private organizationsRepository: IOrganizationsRepository) {}

  async execute({
    id,
    name,
    owner,
    email,
    cep,
    city,
    neighborhood,
    address,
    whatsapp,
    password,
  }: CreateOrganizationRequest) {
    if (!address || !whatsapp) {
      throw new AddressRequiredError();
    }

    const password_hash = await hash(password, 6);

    const emailAlreadyInUse = await this.organizationsRepository.findByEmail(
      email
    );

    if (emailAlreadyInUse) {
      throw new EmailAlreadyExistsError();
    }

    const organization = await this.organizationsRepository.create({
      id,
      name,
      owner,
      email,
      cep,
      city,
      neighborhood,
      address,
      whatsapp,
      password_hash,
    });

    return organization;
  }
}
