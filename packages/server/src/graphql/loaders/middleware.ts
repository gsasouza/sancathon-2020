import { UserLoader } from './loaders';

export const getLoaders = () => ({
  UserLoader: UserLoader.getLoader(),
});

export const dataloadersMiddleware = async (ctx, next) => {
  ctx.dataloaders = getLoaders();
  await next();
};
