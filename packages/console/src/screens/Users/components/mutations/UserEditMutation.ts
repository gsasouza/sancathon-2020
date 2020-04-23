import { graphql } from 'react-relay';

export const UserEditMutation = graphql`
  mutation UserEditMutation($input: UserEditInput!) {
    UserEdit(input: $input) {
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
