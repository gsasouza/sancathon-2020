import mongoose, { Document, Model, Schema } from 'mongoose';
import { IUser } from '../user/UserModel';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  signed: boolean;
  removedAt: Date | null;
  user: IUser;
}

const productSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true
    },
    signed: {
      type: Boolean,
      default: false,
      required: true
    },
    removedAt: {
      type: Date,
      default: null,
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
  },
  { timestamps: true },
);

export const ProductModel: Model<IProduct> = mongoose.model('product', productSchema);
