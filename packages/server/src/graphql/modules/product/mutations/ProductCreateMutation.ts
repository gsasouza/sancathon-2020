import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay';

import { ProductModel } from '../ProductModel';
import ProductConnection from '../ProductConnection';
import * as ProductLoader from '../ProductLoader';

export default mutationWithClientMutationId({
  name: 'ProductCreate',
  inputFields: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async ({ name }, { user }) => {
    if (!user) {
      return {
        product: null,
        error: 'FORBIDDEN',
      };
    }

    const product = await ProductModel.findOne({ name, user: user._id });

    if (product) {
      return {
        product: null,
        error: 'ALREADY_EXISTS',
      };
    }

    try {
      const newProduct = await ProductModel.create({ name, user: user._id, lastMaintenance: new Date() });
      return {
        error: null,
        product: newProduct,
      };
    } catch (e) {
      return {
        product: null,
        error: e,
      };
    }
  },
  outputFields: {
    productEdge: {
      type: ProductConnection.edgeType,
      resolve: async ({ product }, _, context) => {
        if (!product) return null;
        const newProduct = await ProductLoader.load(context, product._id);
        if (!newProduct) return null;
        return {
          cursor: toGlobalId('Product', newProduct.id),
          node: newProduct,
        };
      },
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error,
    },
  },
});
