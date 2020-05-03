import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { sendEmail } from '../utils';

const FROM = 'contact@landingpage.com';
const SUBJECT = 'Contato NeoCloud';

export default mutationWithClientMutationId({
  name: 'ContactCreate',
  inputFields: {
    businessType: {
      type: new GraphQLNonNull(GraphQLString),
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    businessRequirement: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async ({ businessType, businessRequirement, email, name }) => {
    const text = JSON.stringify({ name, email, businessType, businessRequirement });
    try {
      await sendEmail({ from: FROM, subject: SUBJECT, text, to: email });
      return { error: null };
    } catch (e) {
      return { error: JSON.stringify(e) };
    }
  },
  outputFields: {
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error,
    },
  },
});
