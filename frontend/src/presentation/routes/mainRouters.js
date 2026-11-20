import { lazy } from "react";
import OnlyHeader from "../Layouts/OnlyHeader";

const Home = lazy(() => import("../pages/ForGuest/Home/Home"));
const AuthForm = lazy(() => import("../pages/ForGuest/AuthForm/Auth"));
const MangaLibrary = lazy(() => import("../pages/ForGuest/MangaLibrary/MangaLibrary"));
const MangaDetail = lazy(() => import("../pages/ForGuest/MangaDetail/MangaDetail"));
const Chapter = lazy(() => import("../pages/ForGuest/ChapterRead/Chapter"));
const Setting = lazy(() => import("../pages/ForGuest/Setting/Setting"));
const History = lazy(() => import("../pages/ForGuest/History/History"));
const Follow = lazy(() => import("../pages/ForGuest/Follow/Follow"));
const Search = lazy(() => import("../pages/ForGuest/Search/Search.jsx"));

export const mainRoutes = [
  { path: "/", component: Home },
  { path: "/login", component: AuthForm },
  { path: "/mangalibrary", component: MangaLibrary },
  { path: "/mangas/:id", component: MangaDetail },
  { path: "/settings", component: Setting },
  {
    path: "/mangas/:id/chapter/:chapterId",
    component: Chapter,
    layout: OnlyHeader,
  },
  { path: "/history", component: History },
  { path: "/follow", component: Follow },
  { path: "/search/:query?", component: Search },
];
