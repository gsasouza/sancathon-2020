import { UserModel, IUser } from '../src/graphql/modules/user/UserModel';

export const createUser = (payload: Partial<IUser> = {}) => {
  const count = global.__COUNTERS__.getValue('User');
  global.__COUNTERS__.increase('User');
  return new UserModel({
    name: `User#${count}`,
    username: `user#${count}`,
    password: 'password',
    email: `user#${count}@domain.com`,
    ...payload,
  }).save();
};
