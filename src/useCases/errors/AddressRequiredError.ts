export class AddressRequiredError extends Error {
  constructor() {
    super('Adress and whatsapp number required.')
  }
}