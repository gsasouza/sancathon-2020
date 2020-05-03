import * as DataLoader from 'dataloader';
import { Types } from 'mongoose';

import * as UserLoader from '../modules/user/UserLoader';
import * as EquipmentLoader from '../modules/equipment/EquipmentLoader';
import * as ProductLoader from '../modules/product/ProductLoader';

export type DataLoaderKey = string | object | Types.ObjectId;

export interface GraphQLDataloaders {
  UserLoader: DataLoader<DataLoaderKey, UserLoader.IUser>;
  EquipmentLoader: DataLoader<DataLoaderKey, EquipmentLoader.IEquipment>;
  ProductLoader: DataLoader<DataLoaderKey, ProductLoader.IProduct>;
}

export { UserLoader, EquipmentLoader, ProductLoader };
