import * as React from 'react';
import { PrivateScreenLoading } from '@sancathon/ui';
import { Route, RouteProps, useParams } from 'react-router-dom';

interface Props extends RouteProps {
  component: React.ComponentType<{ preloadedQuery: any }>;
  loadingComponent?: React.ComponentType;
  prepare?: (params?: any) => { query: any };
}

const defaultPrepare = () => ({ query: {} });

const LazyComponent: React.FC<Pick<Props, 'prepare' | 'component' | 'loadingComponent'>> = ({
  prepare = defaultPrepare,
  component: Component,
  loadingComponent: Loading = PrivateScreenLoading,
}) => {
  const params = useParams();
  const { query } = prepare(params);
  return (
    <React.Suspense fallback={<Loading />}>
      <Component preloadedQuery={query} />
    </React.Suspense>
  );
};

const LazyRouter = ({ component, ...props }: Props) => {
  return (
    <Route {...props}>
      <LazyComponent {...props} component={component} />
    </Route>
  );
};

export default LazyRouter;
