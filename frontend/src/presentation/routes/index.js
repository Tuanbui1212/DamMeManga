import { adminRoutes } from "./adminRouter";
import { mainRoutes } from "./mainRouters";
<<<<<<< HEAD
import { mangasRoutes } from "./mangasRouter";

const publicRoutes = [...mainRoutes, ...mangasRoutes];
=======

const publicRoutes = [...mainRoutes];
>>>>>>> java/phungcuong

const privateRoutes = [...adminRoutes];

export { publicRoutes, privateRoutes };
