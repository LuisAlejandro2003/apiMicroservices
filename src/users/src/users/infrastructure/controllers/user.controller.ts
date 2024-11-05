// src/users/infrastructure/controllers/user.controller.ts
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CreateUserUseCase } from '../../application/use-cases/create-user.use-case';
import { FindUserByEmailUseCase } from '../../application/use-cases/find-user-by-email.use-case';
import { RabbitMQPublisher } from '../adapters/rabbitmq.publisher';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findUserByEmailUseCase: FindUserByEmailUseCase,
    private readonly rabbitMQPublisher: RabbitMQPublisher,
  ) {}

  @Post()
  async create(@Body() userData: { id: string; email: string; password: string; contactId: string }) {
    return await this.createUserUseCase.execute(userData);
  }

  @Get(':email')
  async findByEmail(@Param('email') email: string) {
    return await this.findUserByEmailUseCase.execute(email);
  }
}
