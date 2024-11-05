// src/users/application/use-cases/create-user.use-case.ts
import { Injectable, Inject } from '@nestjs/common';
import { UserRepositoryPort } from '../../domain/repositories/user-service.port';
import { User } from '../../domain/entities/user.entity';
import { UserId } from '../../domain/value-objects/user-id.vo';
import { Email } from '../../domain/value-objects/email.vo';
import { ContactId } from '../../domain/value-objects/contact-id.vo';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('UserRepositoryPort')
    private readonly userRepository: UserRepositoryPort,
  ) {}

  async execute(userData: { id: string; email: string; password: string; contactId: string }) {
    const user = new User(
      new UserId(userData.id),
      new Email(userData.email),
      userData.password,
      new ContactId(userData.contactId),
    );
    await this.userRepository.createUser(user);
  }
}
