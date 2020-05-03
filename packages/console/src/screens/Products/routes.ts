import * as React from 'react';
import { LoadingScreenContent } from '@sancathon/ui';

const routes = [
  {
    path: path => `${path}/products`,
    component: React.lazy(() => import('./Products')),
    loadingComponent: LoadingScreenContent,
  },
];

export default routes;
