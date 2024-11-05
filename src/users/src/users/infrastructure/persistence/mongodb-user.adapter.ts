// src/users/infrastructure/persistence/mongodb-user.adapter.ts
import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserRepositoryPort } from '../../domain/repositories/user-service.port';
import { User } from '../../domain/entities/user.entity';
import { UserDocument } from './user.schema';
import { UserId } from '../../domain/value-objects/user-id.vo';
import { Email } from '../../domain/value-objects/email.vo';
import { ContactId } from '../../domain/value-objects/contact-id.vo';

@Injectable()
export class MongoDBUserAdapter implements UserRepositoryPort {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(user: User): Promise<void> {
    const newUser = new this.userModel({
      uuid: user.id.value,              // Acceso al valor de UserId
      email: user.email.value,          // Acceso al valor de Email
      password: user.password,
      contactId: user.contactId.value,  // Acceso al valor de ContactId
    });
    await newUser.save();
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const userDocument = await this.userModel.findOne({ email }).exec();
    return userDocument ? new User(new UserId(userDocument.uuid), new Email(userDocument.email), userDocument.password, new ContactId(userDocument.contactId)) : null;
  }

  async findUserById(id: string): Promise<User | null> {
    const userDocument = await this.userModel.findById(id).exec();
    return userDocument ? new User(new UserId(userDocument.uuid), new Email(userDocument.email), userDocument.password, new ContactId(userDocument.contactId)) : null;
  }

  async verifyUser(userId: string): Promise<void> {
    const userDocument = await this.userModel.findById(userId).exec();
    if (userDocument) {
      userDocument.verifiedAt = new Date();
      await userDocument.save();
    }
  }
}
