import { graphql } from 'react-relay';

export const ProductUnSignMutation = graphql`
  mutation ProductUnSignMutation($input: ProductUnSignInput!) {
    ProductUnSign(input: $input) {
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
