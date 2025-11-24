import Home from "../pages/ForGuest/Home";
import AuthForm from "../pages/ForGuest/AuthForm/Auth";
import MangaLibrary from "../pages/ForGuest/MangaLibrary/MangaLibrary";
import OnlyHeader from "../Layouts/OnlyHeader";

export const mainRoutes = [
  { path: "/", component: Home },
  { path: "/login", component: AuthForm, layout: OnlyHeader },
  { path: "/mangalibrary", component: MangaLibrary, layout: OnlyHeader },
];
