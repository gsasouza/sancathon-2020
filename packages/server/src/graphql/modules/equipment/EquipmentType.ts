import { NodeInterface } from '../../interface/NodeInterface';

import { GraphQLObjectType, GraphQLString } from 'graphql';
import { globalIdField } from 'graphql-relay';

const EquipmentType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Equipment',
  description: 'Equipment data',
  fields: () => ({
    id: globalIdField('Equipment'),
    name: {
      type: GraphQLString,
      resolve: user => user.name,
    },
    lastMaintenance: {
      type: GraphQLString,
      resolve: user => user.lastMaintenance,
    },
    removedAt: {
      type: GraphQLString,
      resolve: user => user.removedAt
    }
  }),
  interfaces: () => [NodeInterface],
});

export default EquipmentType;
