import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay';

import { UserModel } from '../UserModel';
import UserConnection from '../UserConnection';
import * as UserLoader from '../UserLoader'

export default mutationWithClientMutationId({
  name: 'UserCreate',
  inputFields: {
    username: {
      type: new GraphQLNonNull(GraphQLString),
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async ({ username, password, email, name }) => {
    const user = await UserModel.findOne({ username: username.toLowerCase() });

    if (user) {
      return {
        user: null,
        error: 'ALREADY_EXISTS',
      };
    }

    try {
      const newUser = await UserModel.create({ name, email, password, username });
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
        if (!newUser ) return null;
        return {
          cursor: toGlobalId('User', newUser.id),
          node: newUser ,
        };
      },
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error,
    },
  },
});
