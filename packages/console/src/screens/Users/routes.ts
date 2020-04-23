import * as React from 'react';
import { LoadingScreenContent } from '@sancathon/ui';
import { prepareQuery } from '@sancathon/relay';

const routes = [
  {
    path: path => `${path}/users/add`,
    component: React.lazy(() => import('./UserAdd')),
    loadingComponent: LoadingScreenContent,
  },
  {
    path: path => `${path}/users/:id`,
    component: React.lazy(() => import('./UserEdit')),
    loadingComponent: LoadingScreenContent,
    prepare: ({ id }) => {
      const query = require('./__generated__/UserEditQuery.graphql');
      const variables = {
        id,
      };
      return prepareQuery(query, variables);
    },
  },
  {
    path: path => `${path}/users`,
    component: React.lazy(() => import('./UsersList')),
    loadingComponent: LoadingScreenContent,
    prepare: () => {
      const query = require('./__generated__/UsersListQuery.graphql');
      const variables = {
        first: 10,
        after: null,
        search: '',
      };
      return prepareQuery(query, variables);
    },
  },
];

export default routes;
