import { connectionFromMongoCursor, mongooseLoader } from '@entria/graphql-mongoose-loader';
import DataLoader from 'dataloader';
import escapeStringRegexp from 'escape-string-regexp';
import { ConnectionArguments } from 'graphql-relay';

import { EquipmentModel, IEquipment } from './EquipmentModel';
import { GraphQLContext, Types } from '../../../common/types';
import { DataLoaderKey } from '../../loaders';

export type { IEquipment } from './EquipmentModel';

export default class Equipment {
  id: string;
  _id: string;
  name: string;
  lastMaintenance: Date;
  removedAt: Date | null;

  constructor(data: IEquipment) {
    this.id = data._id;
    this._id = data._id;
    this.name = data.name;
    this.lastMaintenance = data.lastMaintenance;
    this.removedAt = data.removedAt;
  }
}

export const getLoader = () =>
  new DataLoader<DataLoaderKey, IEquipment>(ids => mongooseLoader(EquipmentModel, ids as string[]));

const viewerCanSee = context => !!context.user;

export const load = async (context: GraphQLContext, id: DataLoaderKey): Promise<Equipment | null> => {
  if (!id) return null;
  try {
    const data = await context.dataloaders.EquipmentLoader.load(id);
    if (!data) return null;
    return viewerCanSee(context) ? new Equipment(data) : null;
  } catch (err) {
    return null;
  }
};

export const clearCache = ({ dataloaders }: GraphQLContext, id: Types.ObjectId) =>
  dataloaders.EquipmentLoader.clear(id.toString());

interface LoadEquipmentsArgs extends ConnectionArguments {
  search?: string;
}

export const loadEquipments = async (context: any, args: LoadEquipmentsArgs) => {
  const defaultWhere = {
    removedAt: null
  }
  const where = args.search ? { ...defaultWhere, name: { $regex: new RegExp(`^${escapeStringRegexp(args.search)}`, 'ig') } } : defaultWhere;
  const users = EquipmentModel.find(where, { _id: 1 }).sort({ createdAt: -1 }).lean();
  return connectionFromMongoCursor({
    cursor: users,
    context,
    args,
    loader: load,
  });
};
