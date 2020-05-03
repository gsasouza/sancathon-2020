import { GraphQLObjectType, GraphQLString } from 'graphql';
import { connectionArgs } from 'graphql-relay';

import { NodeField } from '../interface/NodeInterface';

import UserConnection from '../modules/user/UserConnection';
import * as UserLoader from '../modules/user/UserLoader';
import UserType from '../modules/user/UserType';
import EquipmentConnection from '../modules/equipment/EquipmentConnection'
import {EquipmentLoader} from '../loaders'


export default new GraphQLObjectType({
  name: 'Query',
  description: 'The root of all... queries',
  fields: () => ({
    node: NodeField,
    me: {
      type: UserType,
      resolve: (_, args, context) => context.user,
    },
    users: {
      type: UserConnection.connectionType,
      args: {
        ...connectionArgs,
        search: {
          type: GraphQLString,
        },
      },
      resolve: (_, args, context) => UserLoader.loadUsers(context, args),
    },
    equipments: {
      type: EquipmentConnection.connectionType,
      args: {
        ...connectionArgs,
        search: {
          type: GraphQLString,
        },
      },
      resolve: (_, args, context) => EquipmentLoader.loadEquipments(context, args),
    },
  }),
});
