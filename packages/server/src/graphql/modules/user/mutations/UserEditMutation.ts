import { GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';
import {fromGlobalId, mutationWithClientMutationId, toGlobalId} from 'graphql-relay';

import { UserModel } from '../UserModel';
import UserConnection from '../UserConnection';
import * as UserLoader from '../UserLoader'

export default mutationWithClientMutationId({
  name: 'UserEdit',
  inputFields: {
    id: {
      type: GraphQLNonNull(GraphQLID),
    },
    email: {
      type: GraphQLString,
    },
    name: {
      type: GraphQLString,
    },
    password: {
      type: GraphQLString,
    },
  },
  mutateAndGetPayload: async ({ id: globalId, password, email, name }) => {
    const { id } = fromGlobalId(globalId)
    const user = await UserModel.findOne({ _id: id });

    if (!user) {
      return {
        user: null,
        error: 'NOT_FOUND',
      };
    }

    try {
      const newUser = await UserModel.findOneAndUpdate({ _id: user._id }, { name, email, password });
      return {
        error: null,
        user: newUser,
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
