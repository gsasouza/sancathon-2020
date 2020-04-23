import {
  clearDbAndRestartCounters,
  connectMongoose,
  createUser,
  disconnectMongoose,
  getContext,
} from '../../../../../test/helpers';
import { toGlobalId } from 'graphql-relay';
import { graphql } from 'graphql';
import schema from '../../../schema';

beforeAll(connectMongoose);

beforeEach(clearDbAndRestartCounters);

afterAll(disconnectMongoose);

describe('Server: UserType', () => {
  it('Should query an user', async () => {
    const user = await createUser();
    // language=GraphQL
    const query = `
      query Q($id: ID!) {
        user: node(id: $id) {
          id
          ... on User {
            id
            username
            name
            email
          }
        }
      }
    `;

    const variables = {
      id: toGlobalId('User', user._id),
    };
    const rootValue = {};
    const context = await getContext({ user: true });
    const result = await graphql(schema, query, rootValue, context, variables);

    expect(result.data).toMatchInlineSnapshot(
      {
        user: {
          id: expect.any(String),
        },
      },
      `
      Object {
        "user": Object {
          "email": "user#1@domain.com",
          "id": Any<String>,
          "name": "User#1",
          "username": "user#1",
        },
      }
    `,
    );
  });

  it('Should query a list of users', async () => {
    await createUser();
    await createUser();
    await createUser();
    await createUser();

    // language=GraphQL
    const query = `
      query Q {
        users (first: 10) {
          edges {
            node {
              name
            }
          }
        }
      }
    `;

    const context = await getContext({ user: true });
    const result = await graphql(schema, query, {}, context, {});

    expect(result.data).toMatchSnapshot();
  });

  it('Should search a list of users', async () => {
    await createUser();
    await createUser();
    await createUser({ name: 'search 1' });
    await createUser({ name: 'search 2' });

    // language=GraphQL
    const query = `
      query Q ($search: String!) {
        users (search: $search) {
          edges {
            node {
              name
            }
          }
        }
      }
    `;

    const variables = { search: 'search' };
    const context = await getContext({ user: true });
    const result = await graphql(schema, query, {}, context, variables);

    expect(result.data).toMatchSnapshot();
  });
});
