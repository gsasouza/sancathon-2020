import mongoose, {Document, Model, Types } from 'mongoose';

import { hashPassword, authenticate, encryptPassword } from '../utils';

export interface IUser extends Document {
  name: string;
  username: string;
  password: string;
  email: string;
  products: Types.ObjectId[];
  removedAt: string | null;
  authenticate: (plainTextPassword: string) => boolean;
  encryptPassword: (password: string | undefined) => Promise<string>;
}

const adminUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      hidden: true,
      required: true,
    },
    products: {
      type: [Types.ObjectId],
      default: [],
      ref: 'product',
      required: true
    },
    removedAt: {
      type: String,
      default: null
    },
  },
  { timestamps: true },
);

adminUserSchema.methods = {
  authenticate,
  encryptPassword,
};

adminUserSchema.pre<IUser>('save', hashPassword);

export const UserModel: Model<IUser> = mongoose.model('user', adminUserSchema);
