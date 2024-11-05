import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { UsersModule } from './users/users.module';



@Module({
  imports: [
    // Cargar el módulo de configuración para manejar variables de entorno
    ConfigModule.forRoot(),
    
    // Configuración de MongoDB usando Mongoose
    MongooseModule.forRoot('mongodb://localhost:27017/microserviceUsers'),

    // Configuración de RabbitMQ
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'user.exchange', // Nombre del exchange
          type: 'topic',         // Tipo de exchange para enrutamiento
        },
      ],
      uri: process.env.RABBITMQ_URI || 'amqp://localhost:5672', // URI de RabbitMQ
      connectionInitOptions: { wait: true },
    }),

    // Importación del módulo de Users
    UsersModule,
  ],
})
export class AppModule {}