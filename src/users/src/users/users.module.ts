// src/users/users.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './infrastructure/controllers/user.controller';
import { MongoDBUserAdapter } from './infrastructure/persistence/mongodb-user.adapter';
import { UserSchema } from './infrastructure/persistence/user.schema';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { FindUserByEmailUseCase } from './application/use-cases/find-user-by-email.use-case';
import { FindUserByIdUseCase } from './application/use-cases/find-user-by-id.use-case';
import { UserVerificationService } from './domain/services/user-verification.service';
import { UserRepositoryPort } from './domain/repositories/user-service.port';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [
    MongoDBUserAdapter,
    CreateUserUseCase,
    FindUserByEmailUseCase,
    FindUserByIdUseCase,
    UserVerificationService,
    {
      provide: 'UserRepositoryPort',
      useClass: MongoDBUserAdapter,
    },
  ],
  exports: [CreateUserUseCase, FindUserByEmailUseCase, FindUserByIdUseCase, UserVerificationService],
})
export class UsersModule {}
