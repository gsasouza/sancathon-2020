import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  removedAt: Date | null;
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
    removedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

export const ProductModel: Model<IProduct> = mongoose.model('product', productSchema);
