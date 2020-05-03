import { graphql } from 'react-relay';

export const ContactCreateMutation = graphql`
  mutation ContactCreateMutation($input: ContactCreateInput!) {
    ContactCreate(input: $input) {
      error
    }
  }
`;
