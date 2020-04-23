import { GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';
import { fromGlobalId, mutationWithClientMutationId, toGlobalId } from 'graphql-relay';

import { UserModel } from '../UserModel';
import UserConnection from '../UserConnection';
import * as UserLoader from '../UserLoader'

export default mutationWithClientMutationId({
  name: 'UserRemove',
  inputFields: {
    id: {
      type: GraphQLNonNull(GraphQLID),
    },
  },
  mutateAndGetPayload: async ({ id: globalId }) => {
    const { id } = fromGlobalId(globalId);
    try {
      const user = await UserModel.findOneAndUpdate({ _id: id }, { removedAt: Date.now().toString() });

      if (!user) {
        return {
          user: null,
          error: 'NOT_FOUND',
        };
      }
      return {
        error: null,
        user: user,
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
        const newUser = await UserLoader.load(context, user._id);
        if (!newUser) return null;
        return {
          cursor: toGlobalId('User', newUser._id),
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
