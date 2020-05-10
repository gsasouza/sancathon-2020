import * as React from 'react';
import { LoadingScreenContent } from '@sancathon/ui';
import { prepareQuery } from '@sancathon/relay';

const routes = [
  {
    path: path => `${path}/orders`,
    component: React.lazy(() => import('./OrderPanel')),
    loadingComponent: LoadingScreenContent,
    // prepare: () => {
    //   const query = require('./__generated__/ProductsListQuery.graphql');
    //   const variables = {
    //     first: 10,
    //     after: null,
    //     search: '',
    //   };
    //   return prepareQuery(query, variables);
    // },
  },
];

export default routes;
