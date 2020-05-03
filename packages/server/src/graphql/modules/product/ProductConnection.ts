import ProductType from './ProductType';

import { GraphQLInt } from 'graphql';

import { connectionDefinitions } from 'graphql-relay';

export default connectionDefinitions({
  name: 'Product',
  nodeType: ProductType,
  connectionFields: {
    count: {
      type: GraphQLInt,
    },
  },
});
