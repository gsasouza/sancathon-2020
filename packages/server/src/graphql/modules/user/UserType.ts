import { GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { globalIdField } from 'graphql-relay';

import { NodeInterface } from '../../interface/NodeInterface';
import ProductType from '../product/ProductType';

const UserType: GraphQLObjectType = new GraphQLObjectType({
  name: 'User',
  description: 'User data',
  fields: () => ({
    id: globalIdField('User'),
    _id: {
      type: GraphQLString,
      resolve: user => user._id,
    },
    name: {
      type: GraphQLString,
      resolve: user => user.name,
    },
    username: {
      type: GraphQLString,
      resolve: user => user.username,
    },
    products: {
      type: GraphQLList(ProductType),
      resolve: async (user, args, context) => context.dataloaders.ProductLoader.loadMany(user.products),
    },
    email: {
      type: GraphQLString,
      resolve: user => user.email,
    },
    removedAt: {
      type: GraphQLString,
      resolve: user => user.removedAt,
    },
  }),
  interfaces: () => [NodeInterface],
});

export default UserType;
