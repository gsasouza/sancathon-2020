import { GraphQLObjectType, GraphQLString } from 'graphql';
import { connectionArgs } from 'graphql-relay';

import { NodeField } from '../interface/NodeInterface';

import UserType from '../modules/user/UserType';
import UserConnection from '../modules/user/UserConnection';
import EquipmentConnection from '../modules/equipment/EquipmentConnection';
import ProductConnection from '../modules/product/ProductConnection';

import { EquipmentLoader, ProductLoader, UserLoader } from '../loaders';

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
    products: {
      type: ProductConnection.connectionType,
      args: {
        ...connectionArgs,
        search: {
          type: GraphQLString,
        },
      },
      resolve: (_, args, context) => ProductLoader.loadProducts(context, args),
    },
  }),
});
