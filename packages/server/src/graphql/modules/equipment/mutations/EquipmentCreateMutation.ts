import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay';

import { EquipmentModel } from '../EquipmentModel';
import EquipmentConnection from '../EquipmentConnection';
import * as EquipmentLoader from '../EquipmentLoader';

export default mutationWithClientMutationId({
  name: 'EquipmentCreate',
  inputFields: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async ({ name }, { user }) => {
    if (!user) {
      return {
        equipment: null,
        error: 'FORBIDDEN',
      };
    }

    const equipment = await EquipmentModel.findOne({ name, user: user._id });

    if (equipment) {
      return {
        equipment: null,
        error: 'ALREADY_EXISTS',
      };
    }

    try {
      const newEquipment = await EquipmentModel.create({ name, user: user._id, lastMaintenance: new Date() });
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
