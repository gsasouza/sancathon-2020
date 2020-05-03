import * as React from 'react';
import { LoadingScreenContent } from '@sancathon/ui';

const routes = [
  {
    path: path => `${path}/home`,
    component: React.lazy(() => import('./Home')),
    loadingComponent: LoadingScreenContent,
  },
];

export default routes;
