import mongoose, { Document, Model } from 'mongoose';

export interface IEquipment extends Document {
  name: string;
  lastMaintenance: Date;
  removedAt: Date | null;
}

const adminEquipmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
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
  },
  { timestamps: true },
);

export const EquipmentModel: Model<IEquipment> = mongoose.model('equipment', adminEquipmentSchema);
