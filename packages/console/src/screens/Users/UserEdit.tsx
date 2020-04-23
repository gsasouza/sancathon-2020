import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { graphql, usePreloadedQuery } from 'react-relay/hooks';
import { ContentHeader } from '@sancathon/ui';

import UserForm from './components/UserForm';
import { UserEditQuery } from './__generated__/UserEditQuery.graphql';

const UserEdit = ({ preloadedQuery }) => {
  const { node } = usePreloadedQuery<UserEditQuery>(query, preloadedQuery);
  const history = useHistory();

  return (
    <>
      <ContentHeader title="Editar Usuário" backAction={() => history.push('/dashboard/users')} />
      <UserForm user={node} />
    </>
  );
};

const query = graphql`
  query UserEditQuery($id: ID!) {
    node(id: $id) {
      ... on User {
        id
        name
        email
        username
      }
    }
  }
`;

export default UserEdit;
