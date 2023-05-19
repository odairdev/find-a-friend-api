export class EmailAlreadyExistsError extends Error {
  constructor() {
    super('Email already in use.')
  }
}