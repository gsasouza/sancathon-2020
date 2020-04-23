import { preloadQuery, useRelayEnvironment } from 'react-relay/hooks';

const prepareQuery = (query, variables = {}) => {
  const environment = useRelayEnvironment();
  return { query: preloadQuery(environment, query, variables) };
};

export default prepareQuery;
