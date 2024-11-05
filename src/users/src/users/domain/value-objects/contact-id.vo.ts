export class ContactId {
  constructor(private readonly value: string) {
    if (!value) throw new Error('Contact ID cannot be empty');
  }

  getValue(): string {
    return this.value;
  }
}
