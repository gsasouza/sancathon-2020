import { IUser, UserModel } from '../graphql/modules/user/UserModel';

import { JWT_SECRET } from './config';

import jwt from 'jsonwebtoken';

export async function getUser(token: string) {
  if (!token) return { user: null };

  try {
    const { id } = jwt.verify(token.substring(4), JWT_SECRET);
    const user = await UserModel.findOne({ _id: id }).lean();
    return { user };
  } catch (err) {
    console.log(err);
    return { user: null };
  }
}

export const authenticatedMiddleware = async (ctx, next) => {
  const { authorization } = ctx.header;
  const { user } = await getUser(authorization);
  ctx.user = user;
  await next();
};

export const generateToken = (user: IUser) =>
  `JWT ${jwt.sign({ id: user._id }, JWT_SECRET)}`;
