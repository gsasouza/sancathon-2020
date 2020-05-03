import { NodeInterface } from '../../interface/NodeInterface';

import { GraphQLObjectType, GraphQLString } from 'graphql';
import { globalIdField } from 'graphql-relay';
import UserType from '../user/UserType'

const EquipmentType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Equipment',
  description: 'Equipment data',
  fields: () => ({
    id: globalIdField('Equipment'),
    name: {
      type: GraphQLString,
    },
    lastMaintenance: {
      type: GraphQLString,
    },
    user: {
      type: UserType,
    },
    removedAt: {
      type: GraphQLString,
    }
  }),
  interfaces: () => [NodeInterface],
});

export default EquipmentType;
