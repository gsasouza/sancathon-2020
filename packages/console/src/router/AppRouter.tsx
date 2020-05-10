import { AnimatePresence } from 'framer-motion';
import * as React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import { LazyComponent } from '@sancathon/ui';

const AppRouter = () => (
  <Router>
    <AnimatePresence exitBeforeEnter initial={false}>
      <Switch>
        <Route path={'/dashboard'}>
          <LazyComponent component={React.lazy(() => import('./PrivateRouter'))} />
        </Route>
        <Route path="/public-orders">
          <LazyComponent component={React.lazy(() => import('../screens/Order/PublicOrders'))} />
        </Route>
        <Route path="/">
          <LazyComponent component={React.lazy(() => import('./PublicRouter'))} />
        </Route>
        <Redirect to="/" />
      </Switch>
    </AnimatePresence>
  </Router>
);

export default AppRouter;
