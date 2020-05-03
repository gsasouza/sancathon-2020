import { UserLoader, EquipmentLoader } from './loaders';

export const getLoaders = () => ({
  UserLoader: UserLoader.getLoader(),
  EquipmentLoader: EquipmentLoader.getLoader()
});

export const dataloadersMiddleware = async (ctx, next) => {
  ctx.dataloaders = getLoaders();
  await next();
};
