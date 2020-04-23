import {
  clearDbAndRestartCounters,
  connectMongoose,
  disconnectMongoose,
  getContext,
} from '../../../../../../test/helpers';
import { graphql } from 'graphql';
import schema from '../../../../schema';

beforeAll(connectMongoose);

beforeEach(clearDbAndRestartCounters);

afterAll(disconnectMongoose);

describe('Server: UserMutations', () => {
  it('Should properly create an user', async () => {
    // language=GraphQL
    const query = `
      mutation M($username: String!, $password: String!, $name: String!, $email: String!) {
        UserCreate(input: {
          username: $username,
          password: $password,
          name: $name,
          email: $email
        }) {
          userEdge {
            node {
              username
              name
              email
            }
          }
          error
        }
      }
    `;

    const variables = {
      username: 'username',
      password: 'password',
      email: 'email@email.com',
      name: 'name',
    };

    const rootValue = {};

    const context = getContext();

    const result = await graphql(schema, query, rootValue, context, variables);

    expect(result.data).toMatchInlineSnapshot(`
      Object {
        "UserCreate": Object {
          "error": null,
          "userEdge": Object {
            "node": Object {
              "email": "email@email.com",
              "name": "name",
              "username": "username",
            },
          },
        },
      }
    `);
  });
});
