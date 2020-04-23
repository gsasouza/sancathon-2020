import { graphql } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';

export const UserRemoveMutation = graphql`
  mutation UserRemoveMutation($input: UserRemoveInput!) {
    UserRemove(input: $input) {
      userEdge {
        cursor
        node {
          id
          removedAt
        }
      }
      error
    }
  }
`;

export const UserRemoveMutationUpdater = store => {
  const payload = store.getRootField('UserRemove');
  const rootProxy = store.getRoot();
  if (rootProxy && payload) {
    const deletedUser = payload.getLinkedRecord('userEdge');
    const connection = ConnectionHandler.getConnection(rootProxy, 'UsersList_users');
    if (connection && deletedUser) {
      const node = deletedUser.getLinkedRecord('node');
      if (node) {
        ConnectionHandler.deleteNode(connection, node.getDataID());
      }
    }
  }
};
