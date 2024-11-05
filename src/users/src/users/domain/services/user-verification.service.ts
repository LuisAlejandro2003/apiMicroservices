// src/users/domain/services/user-verification.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { UserRepositoryPort } from '../repositories/user-service.port';
import { UserId } from '../value-objects/user-id.vo';

@Injectable()
export class UserVerificationService {
  constructor(
    @Inject('UserRepositoryPort')
    private readonly userRepository: UserRepositoryPort,
  ) {}

  async verifyUser(userId: UserId): Promise<void> {
    const user = await this.userRepository.findUserById(userId.value);
    if (!user) throw new Error('User not found');
    await this.userRepository.verifyUser(userId.value);
  }
}
