export class AuthenticationError extends Error {
  constructor() {
    super('Unauthorizaed: Email or Password invalid.')
  }
}