// src/contact/domain/repositories/contact.repository.port.ts
import { Contact } from '../entities/contact.entity';

export interface ContactRepositoryPort {
  createContact(contact: Contact): Promise<void>;
  findContactById(contactId: string): Promise<Contact | null>;
}
