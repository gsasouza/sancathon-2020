import * as React from 'react';
import { LoadingScreenContent } from '@sancathon/ui';
import { prepareQuery } from '@sancathon/relay';

const routes = [
  {
    path: path => `${path}/equipments`,
    component: React.lazy(() => import('./EquipmentsList')),
    loadingComponent: LoadingScreenContent,
    prepare: () => {
      const query = require('./__generated__/EquipmentsListQuery.graphql');
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
