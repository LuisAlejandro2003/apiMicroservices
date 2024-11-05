import { UserId } from '../value-objects/user-id.vo';
import { Email } from '../value-objects/email.vo';
import { ContactId } from '../value-objects/contact-id.vo';

export class User {
  constructor(
    public readonly id: UserId,
    public readonly email: Email,
    public password: string,
    public contactId: ContactId,
    public verifiedAt?: Date,
  ) {}

  verifyUser() {
    this.verifiedAt = new Date();
  }
}
