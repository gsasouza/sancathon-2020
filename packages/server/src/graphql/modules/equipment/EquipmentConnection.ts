import EquipmentType from './EquipmentType';

import { GraphQLInt } from 'graphql';

import { connectionDefinitions } from 'graphql-relay';

export default connectionDefinitions({
  name: 'Equipment',
  nodeType: EquipmentType,
  connectionFields: {
    count: {
      type: GraphQLInt,
    },
  },
});
