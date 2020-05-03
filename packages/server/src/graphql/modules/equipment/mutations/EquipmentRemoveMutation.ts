import { GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';
import { fromGlobalId, mutationWithClientMutationId, toGlobalId } from 'graphql-relay';

import { EquipmentModel } from '../EquipmentModel';
import EquipmentConnection from '../EquipmentConnection';
import * as EquipmentLoader from '../EquipmentLoader'

export default mutationWithClientMutationId({
  name: 'EquipmentRemove',
  inputFields: {
    id: {
      type: GraphQLNonNull(GraphQLID),
    },
  },
  mutateAndGetPayload: async ({ id: globalId }) => {
    const { id } = fromGlobalId(globalId);
    try {
      const equipment = await EquipmentModel.findOneAndUpdate({ _id: id }, { removedAt: new Date() });

      if (!equipment) {
        return {
          equipment: null,
          error: 'NOT_FOUND',
        };
      }
      return {
        error: null,
        equipment,
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
        const newEquipment = await EquipmentLoader.load(context, equipment?._id);
        if (!newEquipment) return null;
        return {
          cursor: toGlobalId('Equipment', newEquipment._id),
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
