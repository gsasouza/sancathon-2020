import { graphql } from 'react-relay';

export const UserCreateMutation = graphql`
  mutation UserCreateMutation($input: UserCreateInput!) {
    UserCreate(input: $input) {
      userEdge {
        cursor
        node {
          id
          name
          email
          username
        }
      }
      error
    }
  }
`;
