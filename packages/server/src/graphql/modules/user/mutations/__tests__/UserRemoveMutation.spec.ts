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
      mutation M($id: ID!) {
        UserRemove(input: {
          id: $id,
        }) {
          userEdge {
            node {
              removedAt
            }
          }
          error
        }
      }
    `;

    const variables = {
      id: toGlobalId('User', user._id),
    };

    const rootValue = {};

    const context = getContext();

    const result = await graphql(schema, query, rootValue, context, variables);

    expect(result.data).toMatchInlineSnapshot(
      {
        UserRemove: {
          userEdge: {
            node: {
              removedAt: expect.any(String),
            },
          },
        },
      },
      `
      Object {
        "UserRemove": Object {
          "error": null,
          "userEdge": Object {
            "node": Object {
              "removedAt": Any<String>,
            },
          },
        },
      }
    `,
    );
  });
});
