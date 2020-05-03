import * as DataLoader from 'dataloader';
import { Types } from 'mongoose';

import * as UserLoader from '../modules/user/UserLoader';
import * as EquipmentLoader from '../modules/equipment/EquipmentLoader';

export type DataLoaderKey = string | object | Types.ObjectId;

export interface GraphQLDataloaders {
  UserLoader: DataLoader<DataLoaderKey, UserLoader.IUser>;
  EquipmentLoader: DataLoader<DataLoaderKey, EquipmentLoader.IEquipment>;
}

export { UserLoader, EquipmentLoader };
