import mongoose, { Document, Model, Schema } from 'mongoose';
import { IUser } from '../user/UserModel';

export interface IEquipment extends Document {
  name: string;
  lastMaintenance: Date;
  removedAt: Date | null;
  user: IUser;
}

const equipmentSchema = new Schema(
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
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { timestamps: true },
);

export const EquipmentModel: Model<IEquipment> = mongoose.model('equipment', equipmentSchema);
