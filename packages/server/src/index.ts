import 'core-js';
import { createServer } from 'http';

import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';

import { connectDatabase, GRAPHQL_PORT, MONGO_URL } from './common';
import app from './graphql/app';
import schema from './graphql/schema';

(async () => {
  try {
    await connectDatabase(MONGO_URL);
  } catch (error) {
    console.error('Could not connect to database', { error }); // eslint-disable-line no-console
    process.exit(1);
  }
  const server = createServer(app.callback());

  server.listen(GRAPHQL_PORT, () => {
    console.log(`Server started on port ${GRAPHQL_PORT}`); // eslint-disable-line no-console
    SubscriptionServer.create(
      {
        onConnect: connectionParams => console.log('Client subscription connected!', connectionParams), // eslint-disable-line no-console
        onDisconnect: () => console.log('Client subscription disconnected!'), // eslint-disable-line no-console
        execute,
        subscribe,
        schema,
      },
      {
        server,
        path: '/subscriptions',
      },
    );
  });
})();
