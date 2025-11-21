import Home from "../pages/ForGuest/Home/Home";
import AuthForm from "../pages/ForGuest/AuthForm/Auth";
import MangaLibrary from "../pages/ForGuest/MangaLibrary/MangaLibrary";
import OnlyHeader from "../Layouts/OnlyHeader";
import MangaDetail from "../pages/ForGuest/MangaDetail/MangaDetail";
import ChapterRead from "../pages/ForGuest/ChapterRead/ChapterReadPage";

export const mainRoutes = [
  { path: "/", component: Home },
  { path: "/login", component: AuthForm, layout: OnlyHeader },
  { path: "/mangalibrary", component: MangaLibrary, layout: OnlyHeader },
  { path: "/manga/:id", component: MangaDetail, layout: OnlyHeader },
  { path: "/manga/:id/chapter/:chapterId", component: ChapterRead, layout: OnlyHeader }
];
