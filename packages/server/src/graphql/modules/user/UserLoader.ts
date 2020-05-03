import { connectionFromMongoCursor, mongooseLoader } from '@entria/graphql-mongoose-loader';
import DataLoader from 'dataloader';
import escapeStringRegexp from 'escape-string-regexp';
import { ConnectionArguments } from 'graphql-relay';
import { Schema } from 'mongoose';

import { UserModel, IUser } from './UserModel';
import { GraphQLContext } from '../../../common/types';
import { DataLoaderKey } from '../../loaders';

export type { IUser } from './UserModel';

export default class User {
  id: string;
  _id: string;
  name: string;
  username: string;
  products: Schema.Types.ObjectId[]
  email: string;
  removedAt: string | null;

  constructor(data: IUser) {
    this.id = data._id;
    this._id = data._id;
    this.name = data.name;
    this.products = data.products;
    this.email = data.email;
    this.username = data.username;
    this.removedAt = data.removedAt;
  }
}

export const getLoader = () =>
  new DataLoader<DataLoaderKey, IUser>(ids => mongooseLoader(UserModel, ids as string[]));

const viewerCanSee = context => !!context.user;

export const load = async (context: GraphQLContext, id: DataLoaderKey): Promise<User | null> => {
  if (!id) return null;
  try {
    const data = await context.dataloaders.UserLoader.load(id);
    if (!data) return null;
    return viewerCanSee(context) ? new User(data) : null;
  } catch (err) {
    return null;
  }
};

export const clearCache = ({ dataloaders }: GraphQLContext, id: Schema.Types.ObjectId) =>
  dataloaders.UserLoader.clear(id.toString());

interface LoadUsersArgs extends ConnectionArguments {
  search?: string;
}

export const loadUsers = async (context: any, args: LoadUsersArgs) => {
  const defaultWhere = {
    removedAt: null
  }
  const where = args.search ? { ...defaultWhere, name: { $regex: new RegExp(`^${escapeStringRegexp(args.search)}`, 'ig') } } : defaultWhere;
  const users = UserModel.find(where, { _id: 1 }).sort({ createdAt: -1 }).lean();
  return connectionFromMongoCursor({
    cursor: users,
    context,
    args,
    loader: load,
  });
};
