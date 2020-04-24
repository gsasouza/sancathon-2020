import * as React from 'react';
import { useHistory, useRouteMatch, Switch, Redirect } from 'react-router-dom';
import { PrivateWrapper, PrivateScreenLoading, LazyRouter } from '@sancathon/ui';

import { isLoggedIn, logout } from '../utils/security';
import routes from './routes';


const sidebarProps = {
  title: 'Sancathon',
  items: [{ label: 'Usuários', path: '/dashboard/users' }],
  footer: {
    action: logout,
    icon: '',
    label: 'Logout'
  }
}

const PublicRouter = () => {
  const [isLoading, setLoading] = React.useState(true);
  const history = useHistory();
  const { path } = useRouteMatch();

  React.useEffect(() => {
    (async () => {
      if (!(await isLoggedIn())) return history.push('/');
      return setLoading(false);
    })();
  }, [history]);

  if (isLoading) return <PrivateScreenLoading />;

  return (
    <PrivateWrapper sidebarProps={sidebarProps}>
      <Switch>
        {routes.map(route => {
          return (
            <LazyRouter {...route} path={route.path(path)} key={route.path(path)} exact />
          )
        })}
        <Redirect to="/dashboard/users" />
      </Switch>
    </PrivateWrapper>
  );
};

export default PublicRouter;