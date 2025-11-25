import OnlyHeader from "../Layouts/OnlyHeader";
import DefaulLayout from "../Layouts/DefaultLayout";

import MangaDetail from "../pages/ForGuest/MangaDetail/MangaDetail";
import Chapter from "../pages/ForGuest/ChapterRead/Chapter";

export const mangasRoutes = [
  { path: "/mangas/:id", component: MangaDetail, layout: DefaulLayout },
  {
    path: "/mangas/:id/chapter/:chapterId",
    component: Chapter,
    layout: OnlyHeader,
  },
];
