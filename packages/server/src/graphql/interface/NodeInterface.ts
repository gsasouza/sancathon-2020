import { nodeDefinitions, fromGlobalId } from 'graphql-relay';

import { GraphQLContext } from '../../common/types';

import User, * as UserLoader from '../modules/user/UserLoader';
import UserType from '../modules/user/UserType';

import Equipment, * as EquipmentLoader from '../modules/equipment/EquipmentLoader';
import EquipmentType from '../modules/equipment/EquipmentType';

import Product, * as ProductLoader from '../modules/product/ProductLoader';
import ProductType from '../modules/product/ProductType';

const { nodeField, nodesField, nodeInterface } = nodeDefinitions(
  async (globalId, context: GraphQLContext) => {
    const { id, type } = fromGlobalId(globalId);
    if (type === 'User') return await UserLoader.load(context, id);
    if (type === 'Equipment') return await EquipmentLoader.load(context, id);
    if (type === 'Product') return await ProductLoader.load(context, id);
    return null;
  },
  obj => {
    if (obj instanceof User) return UserType;
    if (obj instanceof Equipment) return EquipmentType;
    if (obj instanceof Product) return ProductType;
    return null;
  },
);

export const NodeInterface = nodeInterface;
export const NodeField = nodeField;
export const NodesField = nodesField;
