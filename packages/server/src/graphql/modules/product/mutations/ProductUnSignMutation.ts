import { GraphQLString, GraphQLNonNull, GraphQLID } from 'graphql';
import { fromGlobalId, mutationWithClientMutationId, toGlobalId } from 'graphql-relay';

import { UserModel } from '../../user/UserModel';
import { ProductModel } from '../ProductModel';
import UserConnection from '../../user/UserConnection';
import { UserLoader } from '../../../loaders';

export default mutationWithClientMutationId({
  name: 'ProductUnSign',
  inputFields: {
    id: {
      type: GraphQLNonNull(GraphQLID),
    },
  },
  mutateAndGetPayload: async ({ id: globalId }, { user }) => {
    const { id } = fromGlobalId(globalId);

    if (!user) {
      return {
        user: null,
        error: 'FORBIDDEN',
      };
    }

    const product = await ProductModel.findOne({ _id: id });

    if (!product) {
      return {
        user: null,
        error: 'NOT_FOUND',
      };
    }

    try {
      const updatedUser = await UserModel.findOneAndUpdate({ _id: user._id }, { $pull: { products: product._id } });
      return {
        error: null,
        user: updatedUser,
      };
    } catch (e) {
      return {
        user: null,
        error: e,
      };
    }
  },
  outputFields: {
    userEdge: {
      type: UserConnection.edgeType,
      resolve: async ({ user }, _, context) => {
        const newUser = await UserLoader.load(context, user?._id);
        if (!newUser) return null;
        return {
          cursor: toGlobalId('User', newUser.id),
          node: newUser,
        };
      },
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error,
    },
  },
});
