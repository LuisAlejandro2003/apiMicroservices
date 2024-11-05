
export class Contact {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly phoneNumber: string,
    public readonly firstName: string,
    public readonly lastName: string,
  ) {}
}
