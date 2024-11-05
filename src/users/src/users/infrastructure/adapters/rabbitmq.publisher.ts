// src/users/infrastructure/adapters/rabbitmq.publisher.ts
import { Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class RabbitMQPublisher {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  async publishUserCreatedEvent(userId: string, email: string) {
    await this.amqpConnection.publish('user.exchange', 'user.created', {
      userId,
      email,
    });
  }

  async publishUserVerifiedEvent(userId: string) {
    await this.amqpConnection.publish('user.exchange', 'user.verified', {
      userId,
    });
  }
}
