// src/users/domain/repositories/user-service.port.ts
import { User } from '../entities/user.entity';

export interface UserRepositoryPort {
  createUser(user: User): Promise<void>;
  findUserByEmail(email: string): Promise<User | null>;
  findUserById(id: string): Promise<User | null>;
  verifyUser(userId: string): Promise<void>;
}
