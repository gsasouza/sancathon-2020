import { NodeInterface } from '../../interface/NodeInterface';

import { GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { globalIdField } from 'graphql-relay';
import ProductType from '../product/ProductType';
import { ProductLoader } from '../../loaders';

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
      resolve: (user, args, context) => ProductLoader.load(context, user.products),
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
