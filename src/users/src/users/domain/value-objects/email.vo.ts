export class Email {
  constructor(private readonly value: string) {
    if (!value) throw new Error('Email cannot be empty');
  }

  getValue(): string {
    return this.value;
  }
}
