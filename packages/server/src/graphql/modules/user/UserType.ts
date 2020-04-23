import { NodeInterface } from '../../interface/NodeInterface';

import { GraphQLObjectType, GraphQLString } from 'graphql';
import { globalIdField } from 'graphql-relay';

const UserType: GraphQLObjectType = new GraphQLObjectType({
  name: 'User',
  description: 'User data',
  fields: () => ({
    id: globalIdField('User'),
    _id: {
      type: GraphQLString,
      resolve: user => user._id,
    },
    name: {
      type: GraphQLString,
      resolve: user => user.name,
    },
    username: {
      type: GraphQLString,
      resolve: user => user.username,
    },
    email: {
      type: GraphQLString,
      resolve: user => user.email,
    },
    removedAt: {
      type: GraphQLString,
      resolve: user => user.removedAt
    }
  }),
  interfaces: () => [NodeInterface],
});

export default UserType;
