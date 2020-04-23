import { graphql } from 'graphql';

import {
  disconnectMongoose,
  connectMongoose,
  clearDbAndRestartCounters,
  createUser,
  getContext,
} from '../../../../../../test/helpers';
import schema from '../../../../schema';

beforeAll(connectMongoose);

beforeEach(clearDbAndRestartCounters);

afterAll(disconnectMongoose);

describe('Server: UserMutations', () => {
  it('Should properly login an user', async () => {
    const password = 'password';
    const user = await createUser({ password });

    // language=GraphQL
    const query = `
      mutation M($username: String!, $password: String!) {
        UserLogin(input: {
          username: $username,
          password: $password
        }) {
          token
          error
        }
      }
    `;

    const variables = {
      username: user.username,
      password,
    };

    const rootValue = {};

    const context = getContext();

    const result = await graphql(schema, query, rootValue, context, variables);

    expect(result.data).toMatchInlineSnapshot(
      {
        UserLogin: {
          token: expect.any(String),
        },
      },
      `
      Object {
        "UserLogin": Object {
          "error": null,
          "token": Any<String>,
        },
      }
    `,
    );
  });

  it('Should not login an user with invalid username', async () => {
    const password = 'password';
    await createUser({ password });

    // language=GraphQL
    const query = `
      mutation M($username: String!, $password: String!) {
        UserLogin(input: {
          username: $username,
          password: $password
        }) {
          token
          error
        }
      }
    `;

    const variables = {
      username: 'INVALID',
      password,
    };

    const rootValue = {};

    const context = getContext();

    const result = await graphql(schema, query, rootValue, context, variables);

    expect(result.data).toMatchInlineSnapshot(`
      Object {
        "UserLogin": Object {
          "error": "INVALID_USERNAME_PASSWORD",
          "token": null,
        },
      }
    `);
  });

  it('Should not login an user with invalid password', async () => {
    const user = await createUser();

    // language=GraphQL
    const query = `
      mutation M($username: String!, $password: String!) {
        UserLogin(input: {
          username: $username,
          password: $password
        }) {
          token
          error
        }
      }
    `;

    const variables = {
      username: user.username,
      password: 'WRONG_PASSWORD',
    };

    const rootValue = {};

    const context = getContext();

    const result = await graphql(schema, query, rootValue, context, variables);

    expect(result.data).toMatchInlineSnapshot(`
      Object {
        "UserLogin": Object {
          "error": "INVALID_USERNAME_PASSWORD",
          "token": null,
        },
      }
    `);
  });
});
