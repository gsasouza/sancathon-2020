import EquipmentsRoutes from '../screens/Equipments/routes';
import ProductsRoutes from '../screens/Products/routes';
import HomeRoutes from '../screens/Home/routes';
import OrderRoutes from '../screens/Order/routes';

const routes = [...OrderRoutes, ...EquipmentsRoutes, ...ProductsRoutes, ...HomeRoutes];

export default routes;
