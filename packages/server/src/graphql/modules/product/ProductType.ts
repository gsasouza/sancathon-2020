import { NodeInterface } from '../../interface/NodeInterface';

import { GraphQLBoolean, GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql';
import { globalIdField } from 'graphql-relay';
import UserType from '../user/UserType';

const ProductType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Product',
  description: 'Product data',
  fields: () => ({
    id: globalIdField('Product'),
    name: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString,
    },
    price: {
      type: GraphQLInt,
    },
    signed: {
      type: GraphQLBoolean,
    },
    user: {
      type: UserType,
    },
    removedAt: {
      type: GraphQLString,
    },
  }),
  interfaces: () => [NodeInterface],
});

export default ProductType;
