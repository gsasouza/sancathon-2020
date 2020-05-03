import * as React from 'react';
import { LoadingScreenContent } from '@sancathon/ui';

const routes = [
  {
    path: path => `${path}/equipments`,
    component: React.lazy(() => import('./Equipments')),
    loadingComponent: LoadingScreenContent,
  },
];

export default routes;
