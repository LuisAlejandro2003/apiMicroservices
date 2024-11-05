// src/users/application/use-cases/find-user-by-email.use-case.ts
import { Injectable, Inject } from '@nestjs/common';
import { UserRepositoryPort } from '../../domain/repositories/user-service.port';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class FindUserByEmailUseCase {
  constructor(
    @Inject('UserRepositoryPort')
    private readonly userRepository: UserRepositoryPort,
  ) {}

  async execute(email: string): Promise<User | null> {
    return await this.userRepository.findUserByEmail(email);
  }
}
