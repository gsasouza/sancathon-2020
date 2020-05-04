import { LoadingScreen, LazyComponent } from '@sancathon/ui';
import { isLoggedIn } from '../utils/security';

import * as React from 'react';
import { useHistory, Switch, Route } from 'react-router-dom';

const PublicRouter = () => {
  const [isLoading, setLoading] = React.useState(true);
  const history = useHistory();

  React.useEffect(() => {
    (async () => {
      if (await isLoggedIn()) return history.push('/dashboard');
      return setLoading(false);
    })();
  }, [history]);

  if (isLoading) return <LoadingScreen />;

  return (
    <Switch>
      <Route path="/" exact>
        <LazyComponent component={React.lazy(() => import('../screens/Landing/LandingPage'))} loadingComponent={LoadingScreen} />
      </Route>
      <Route path="/login">
        <LazyComponent component={React.lazy(() => import('../screens/Auth/Login'))} loadingComponent={LoadingScreen} />
      </Route>
    </Switch>
  );
};

export default PublicRouter;
