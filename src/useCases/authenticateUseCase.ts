import { IOrganizationsRepository } from "@/repositories/IOrganizationsRepository";
import { AuthenticationError } from "./errors/AuthenticationError";
import { compare } from "bcryptjs";

export class AuthenticateUseCase {
  constructor(private organizationsRepository: IOrganizationsRepository) {}

  async execute(email: string, password: string) {
    const organization = await this.organizationsRepository.findByEmail(email)

    if(!organization) {
      throw new AuthenticationError()
    }

    const doesPasswordMatch = await compare(password, organization.password_hash)

    if(!doesPasswordMatch) {
      throw new AuthenticationError()
    }

    // @ts-ignore
    delete organization.password_hash

    return {
      organization
    }
  }
}