import * as React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { graphql, usePaginationFragment, usePreloadedQuery } from 'react-relay/hooks';
import { ContentHeader, RoundedButton, Card, Table } from '@sancathon/ui';
import { EditAlt } from '@styled-icons/boxicons-solid/EditAlt';
import { Delete } from '@styled-icons/material/Delete';
import { UsersListPaginationQuery } from './__generated__/UsersListPaginationQuery.graphql';
import { useMutation } from 'relay-hooks';
import { toast } from 'react-toastify';
import { UserRemoveMutation, UserRemoveMutationUpdater } from './components/mutations/UserRemoveMutation';

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: -0.5rem;
  > svg {
    width: 35px;
    margin: 0.5rem;
    color: ${props => props.theme.palette.accent};
    transition: color 0.3s, stroke 0.3s;
    cursor: pointer;
    &:hover {
      color: ${props => props.theme.palette.secondary};
      stroke: ${props => props.theme.palette.accent};
    }
  }
`;

const DeleteIcon = styled(Delete)`
  &:hover {
    color: ${props => props.theme.palette.secondary};
    stroke: ${props => props.theme.palette.accent};
  }
  > path:last-child {
    display: none;
  }
`;

const UsersList = ({ preloadedQuery }) => {
  const history = useHistory();
  const query = usePreloadedQuery(UsersListQuery, preloadedQuery);
  const { data } = usePaginationFragment<UsersListPaginationQuery, any>(fragment, query);
  const [mutate] = useMutation(UserRemoveMutation, {
    onCompleted: () => toast.success('O usuário foi removido'),
    updater: UserRemoveMutationUpdater,
  });

  const tableColumns = [
    {
      header: { label: 'Nome' },
      property: 'name',
    },
    {
      header: { label: 'Usuário' },
      property: 'username',
    },
    {
      header: { label: 'Email' },
      property: 'email',
    },
    {
      header: { label: '' },
      property: 'actions',
      renderRow: ({ id }) => (
        <Row>
          <EditAlt onClick={() => history.push(`/dashboard/users/${id}`)} />
          <DeleteIcon
            onClick={() =>
              mutate({
                variables: {
                  input: { id },
                },
              })
            }
          />
        </Row>
      ),
    },
  ];

  return (
    <>
      <ContentHeader title="Usuários">
        <RoundedButton color="accent" onClick={() => history.push('/dashboard/users/add')}>
          Adicionar Usuários
        </RoundedButton>
      </ContentHeader>
      <Card>
        <Table columns={tableColumns} data={data.users} />
      </Card>
    </>
  );
};

const fragment = graphql`
  fragment UsersList_users on Query
    @argumentDefinitions(first: { type: Int }, after: { type: String }, search: { type: String })
    @refetchable(queryName: "UsersListPaginationQuery") {
    users(first: $first, after: $after, search: $search) @connection(key: "UsersList_users", filters: ["search"]) {
      count
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
        startCursor
      }
      edges {
        cursor
        node {
          id
          name
          email
          username
        }
      }
    }
  }
`;

const UsersListQuery = graphql`
  query UsersListQuery($first: Int, $after: String, $search: String) {
    ...UsersList_users @arguments(first: $first, after: $after, search: $search)
  }
`;

export default UsersList;
