import { nodeDefinitions, fromGlobalId } from 'graphql-relay';

import { GraphQLContext } from '../../common/types';
import User, * as UserLoader from '../modules/user/UserLoader';
import UserType from '../modules/user/UserType';
import Equipment, * as EquipmentLoader from '../modules/user/UserLoader';
import EquipmentType from '../modules/user/UserType';

const { nodeField, nodesField, nodeInterface } = nodeDefinitions(
  async (globalId, context: GraphQLContext) => {
    const { id, type } = fromGlobalId(globalId);
    if (type === 'User') return await UserLoader.load(context, id);
    if (type === 'Equipment') return await EquipmentLoader.load(context, id);
    return null;
  },
  obj => {
    if (obj instanceof User) return UserType;
    if (obj instanceof Equipment) return EquipmentType;
    return null;
  },
);

export const NodeInterface = nodeInterface;
export const NodeField = nodeField;
export const NodesField = nodesField;
