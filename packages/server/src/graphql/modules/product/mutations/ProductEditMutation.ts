import { GraphQLString, GraphQLNonNull, GraphQLFloat, GraphQLID } from 'graphql';
import { fromGlobalId, mutationWithClientMutationId, toGlobalId } from 'graphql-relay';

import { ProductModel } from '../ProductModel';
import ProductConnection from '../ProductConnection';
import * as ProductLoader from '../ProductLoader';
import { sanitizeUpdate } from '../../../../common';

export default mutationWithClientMutationId({
  name: 'ProductEdit',
  inputFields: {
    id: {
      type: GraphQLNonNull(GraphQLID),
    },
    description: {
      type: GraphQLString,
    },
    price: {
      type: GraphQLFloat,
    },
  },
  mutateAndGetPayload: async ({ id: globalId, description, price }, { user }) => {
    const { id } = fromGlobalId(globalId);

    if (!user) {
      return {
        product: null,
        error: 'FORBIDDEN',
      };
    }

    const product = await ProductModel.findOne({ _id: id });

    if (!product) {
      return {
        product: null,
        error: 'NOT_FOUND',
      };
    }

    try {
      const newProduct = await ProductModel.findOneAndUpdate(
        { _id: id },
        sanitizeUpdate({ description, price: price * 100 }),
      );
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
