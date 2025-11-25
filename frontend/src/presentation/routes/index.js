import { adminRoutes } from "./adminRouter";
import { mainRoutes } from "./mainRouters";
import { mangasRoutes } from "./mangasRouter";

const publicRoutes = [...mainRoutes, ...mangasRoutes];

const privateRoutes = [...adminRoutes];

export { publicRoutes, privateRoutes };
