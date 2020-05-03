import mongoose, { Document, Model, Schema } from 'mongoose';
import { IUser } from '../user/UserModel';

export interface IEquipment extends Document {
  name: string;
  lastMaintenance: Date;
  removedAt: Date | null;
  user: IUser;
}

const adminEquipmentSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    lastMaintenance: {
      type: Date,
      required: true,
    },
    removedAt: {
      type: Date,
      default: null,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { timestamps: true },
);

export const EquipmentModel: Model<IEquipment> = mongoose.model('equipment', adminEquipmentSchema);
