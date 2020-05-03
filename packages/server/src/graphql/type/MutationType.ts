import { GraphQLObjectType } from 'graphql';

import UserMutations from '../modules/user/mutations';
import LadingMutations from '../modules/landing/mutations';
import EquipmentMutations from '../modules/equipment/mutations';
import ProductMutations from  '../modules/product/mutations';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    ...UserMutations,
    ...LadingMutations,
    ...EquipmentMutations,
    ...ProductMutations
  }),
});
