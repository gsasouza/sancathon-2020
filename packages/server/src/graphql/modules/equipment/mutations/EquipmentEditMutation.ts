import { GraphQLString, GraphQLNonNull, GraphQLID } from 'graphql';
import { fromGlobalId, mutationWithClientMutationId, toGlobalId } from 'graphql-relay';

import { EquipmentModel } from '../EquipmentModel';
import EquipmentConnection from '../EquipmentConnection';
import * as EquipmentLoader from '../EquipmentLoader';

export default mutationWithClientMutationId({
  name: 'EquipmentEdit',
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    lastMaintenance: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async ({ id: globalId, lastMaintenance }, { user }) => {
    const { id } = fromGlobalId(globalId);

    if (!user) {
      return {
        equipment: null,
        error: 'FORBIDDEN',
      };
    }

    const equipment = await EquipmentModel.findOne({ _id: id });

    if (!equipment) {
      return {
        equipment: null,
        error: 'NOT_FOUND',
      };
    }

    try {
      const newEquipment = await EquipmentModel.findOneAndUpdate({ _id: id }, { lastMaintenance });
      return {
        error: null,
        equipment: newEquipment,
      };
    } catch (e) {
      return {
        equipment: null,
        error: e,
      };
    }
  },
  outputFields: {
    equipmentEdge: {
      type: EquipmentConnection.edgeType,
      resolve: async ({ equipment }, _, context) => {
        if (!equipment) return null;
        const newEquipment = await EquipmentLoader.load(context, equipment._id);
        if (!newEquipment) return null;
        return {
          cursor: toGlobalId('Equipment', newEquipment.id),
          node: newEquipment,
        };
      },
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error,
    },
  },
});
