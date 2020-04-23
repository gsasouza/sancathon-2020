import { AnimatePresence } from 'framer-motion';
import * as React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import { LazyComponent } from '@sancathon/ui';

const AppRouter = () => (
  <Router>
    <AnimatePresence exitBeforeEnter initial={false}>
      <Switch>
        <Route path="/" exact>
          <LazyComponent component={React.lazy(() => import('./PublicRouter'))} />
        </Route>
          <Route path={'/dashboard'}>
            <LazyComponent component={React.lazy(() => import('./PrivateRouter'))} />
          </Route>
        <Redirect to="/" />
      </Switch>
    </AnimatePresence>
  </Router>
);

export default AppRouter;
