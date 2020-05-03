import { graphql } from 'react-relay';

export const ProductSignMutation = graphql`
  mutation ProductSignMutation($input: ProductSignInput!) {
    ProductSign(input: $input) {
      productEdge {
        node {
          id
          meHasSigned
        }
      }
      error
    }
  }
`;
