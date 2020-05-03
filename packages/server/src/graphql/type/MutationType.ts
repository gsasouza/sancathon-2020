import { GraphQLObjectType } from 'graphql';

import UserMutations from '../modules/user/mutations';
import LadingMutations from '../modules/landing/mutations'

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    ...UserMutations,
    ...LadingMutations
  }),
});
