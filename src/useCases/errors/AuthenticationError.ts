export class AuthenticationError extends Error {
  constructor() {
    super('Anauthorizaed: Email or Password invalid.')
  }
}