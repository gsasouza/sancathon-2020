import { GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';
import { fromGlobalId, mutationWithClientMutationId, toGlobalId } from 'graphql-relay';

import { ProductModel } from '../ProductModel';
import ProductConnection from '../ProductConnection';
import * as ProductLoader from '../ProductLoader';

export default mutationWithClientMutationId({
  name: 'ProductRemove',
  inputFields: {
    id: {
      type: GraphQLNonNull(GraphQLID),
    },
  },
  mutateAndGetPayload: async ({ id: globalId }) => {
    const { id } = fromGlobalId(globalId);
    try {
      const product = await ProductModel.findOneAndUpdate({ _id: id }, { removedAt: new Date() });

      if (!product) {
        return {
          product: null,
          error: 'NOT_FOUND',
        };
      }
      return {
        error: null,
        product,
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
        const newProduct = await ProductLoader.load(context, product?._id);
        if (!newProduct) return null;
        return {
          cursor: toGlobalId('Product', newProduct._id),
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
