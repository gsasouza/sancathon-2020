import {
  clearDbAndRestartCounters,
  connectMongoose,
  createUser,
  disconnectMongoose,
  getContext,
} from '../../../../../../test/helpers';
import { graphql } from 'graphql';
import schema from '../../../../schema';
import { toGlobalId } from 'graphql-relay';

beforeAll(connectMongoose);

beforeEach(clearDbAndRestartCounters);

afterAll(disconnectMongoose);

describe('Server: UserMutations', () => {
  it('Should properly edit an user', async () => {
    const user = await createUser();
    // language=GraphQL
    const query = `
      mutation M($id: ID!, $password: String!, $name: String!, $email: String!) {
        UserEdit(input: {
          id: $id,
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
      id: toGlobalId('User', user._id),
      password: 'password_changed',
      email: 'email_changed@email.com',
      name: 'name_changed',
    };

    const rootValue = {};

    const context = getContext();

    const result = await graphql(schema, query, rootValue, context, variables);

    expect(result.data).toMatchInlineSnapshot(`
      Object {
        "UserEdit": Object {
          "error": null,
          "userEdge": Object {
            "node": Object {
              "email": "email_changed@email.com",
              "name": "name_changed",
              "username": "user#1",
            },
          },
        },
      }
    `);
  });
});
