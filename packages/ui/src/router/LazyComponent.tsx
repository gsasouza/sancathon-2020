import { PrivateScreenLoading } from '@sancathon/ui';

import React from 'react';

interface Props {
  component: React.ComponentType;
  loadingComponent?: React.ComponentType;
}

const LazyComponent = ({ component: Component, loadingComponent: Loading = PrivateScreenLoading }: Props) => {
  return (
    <React.Suspense fallback={<Loading />}>
      <Component />
    </React.Suspense>
  );
};

export default LazyComponent;
