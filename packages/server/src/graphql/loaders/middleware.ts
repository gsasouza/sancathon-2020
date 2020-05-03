import { UserLoader, EquipmentLoader, ProductLoader } from './loaders';

export const getLoaders = () => ({
  UserLoader: UserLoader.getLoader(),
  EquipmentLoader: EquipmentLoader.getLoader(),
  ProductLoader: ProductLoader.getLoader(),
});

export const dataloadersMiddleware = async (ctx, next) => {
  ctx.dataloaders = getLoaders();
  await next();
};
