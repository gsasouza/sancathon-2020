import { NodeInterface } from '../../interface/NodeInterface';

import { GraphQLBoolean, GraphQLFloat, GraphQLObjectType, GraphQLString } from 'graphql';
import { globalIdField } from 'graphql-relay';
import { loggedUserHasProduct } from './ProductLoader';

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
      type: GraphQLFloat,
      resolve: obj => obj.price / 100,
    },
    meHasSigned: {
      type: GraphQLBoolean,
      resolve: loggedUserHasProduct,
    },
    removedAt: {
      type: GraphQLString,
    },
  }),
  interfaces: () => [NodeInterface],
});

export default ProductType;
