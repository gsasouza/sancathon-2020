import { connectionFromMongoCursor, mongooseLoader } from '@entria/graphql-mongoose-loader';
import DataLoader from 'dataloader';
import escapeStringRegexp from 'escape-string-regexp';
import { ConnectionArguments } from 'graphql-relay';

import { ProductModel, IProduct } from './ProductModel';
import { GraphQLContext, Types } from '../../../common/types';
import { DataLoaderKey } from '../../loaders';

export type { IProduct } from './ProductModel';

export default class Product {
  id: string;
  _id: string;
  name: string;
  price: number;
  description: string;
  removedAt: Date | null;

  constructor(data: IProduct) {
    this.id = data._id;
    this._id = data._id;
    this.name = data.name;
    this.price = data.price;
    this.description = data.description;
    this.removedAt = data.removedAt;
  }
}

export const getLoader = () =>
  new DataLoader<DataLoaderKey, IProduct>(ids => mongooseLoader(ProductModel, ids as string[]));

const viewerCanSee = context => !!context.user;

export const load = async (context: GraphQLContext, id: DataLoaderKey): Promise<Product | null> => {

  if (!id) return null;
  try {
    const data = await context.dataloaders.ProductLoader.load(id);
    if (!data) return null;
    return viewerCanSee(context) ? new Product(data) : null;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const clearCache = ({ dataloaders }: GraphQLContext, id: Types.ObjectId) =>
  dataloaders.ProductLoader.clear(id.toString());

interface LoadProductsArgs extends ConnectionArguments {
  search?: string;
}

export const loadProducts = async (context: any, args: LoadProductsArgs) => {
  const defaultWhere = {
    removedAt: null,
  }

  const where = args.search ? { ...defaultWhere, name: { $regex: new RegExp(`^${escapeStringRegexp(args.search)}`, 'ig') } } : defaultWhere;
  const users = ProductModel.find(where, { _id: 1 }).sort({ createdAt: -1 }).lean();
  return connectionFromMongoCursor({
    cursor: users,
    context,
    args,
    loader: load,
  });
};

export const loggedUserHasProduct = (obj, args, context) => {
  if (!context.user) return false;
  if (obj.meHasSigned !== undefined) return obj.meHasSigned;
  return context.user.products.some((product) => obj._id.equals(product))
}
