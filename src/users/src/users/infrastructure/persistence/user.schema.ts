// src/users/infrastructure/persistence/user.schema.ts
import { Schema, Document } from 'mongoose';

export interface UserDocument extends Document {
  uuid: string;
  email: string;
  password: string;
  contactId: string;
  verifiedAt?: Date;
}

export const UserSchema = new Schema({
  uuid: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contactId: { type: String, required: true },
  verifiedAt: { type: Date, default: null },
});
