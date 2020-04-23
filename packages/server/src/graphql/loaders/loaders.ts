import * as UserLoader from '../modules/user/UserLoader';

import * as DataLoader from 'dataloader';
import { Types } from 'mongoose';

export type DataLoaderKey = string | object | Types.ObjectId;

export interface GraphQLDataloaders {
  UserLoader: DataLoader<DataLoaderKey, UserLoader.IUser>;
}

export { UserLoader };
