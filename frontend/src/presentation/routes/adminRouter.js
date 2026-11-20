import { lazy } from "react";
import OnlySidebarLayout from "../Layouts/OnlySidebar";

const Dashboard = lazy(() => import("../pages/ForAdmin/Dashboard/Dashboard"));
const UserManagement = lazy(() => import("../pages/ForAdmin/User/UserManagement"));
const TagManagement = lazy(() => import("../pages/ForAdmin/Tag/TagManagement"));
const AuthorManagement = lazy(() => import("../pages/ForAdmin/Author/AuthorManagement"));
const MangaList = lazy(() => import("../pages/ForAdmin/MangaList/MangaManagement"));
const MangaDetail = lazy(() => import("../pages/ForAdmin/MangaDetail/MangaDetail"));
const EditManga = lazy(() => import("../pages/ForAdmin/EditManga/EditManga"));
const CreateChapter = lazy(() => import("../pages/ForAdmin/CreateChapter/CreateChapter"));
const ChapterDetail = lazy(() => import("../pages/ForAdmin/ChapterDetail/ChapterDetail"));
const CreateManga = lazy(() => import("../pages/ForAdmin/CreateManga/CreateManga"));

export const adminRoutes = [
  { path: "/dashboard", component: Dashboard, layout: OnlySidebarLayout },
  { path: "/user-management", component: UserManagement, layout: OnlySidebarLayout },
  { path: "/tag-management", component: TagManagement, layout: OnlySidebarLayout },
  { path: "/author-management", component: AuthorManagement, layout: OnlySidebarLayout },
  { path: "/manga-management", component: MangaList, layout: OnlySidebarLayout },
  { path: "/manga-detail-management/:id", component: MangaDetail, layout: OnlySidebarLayout },
  { path: "/edit-manga/:id", component: EditManga, layout: OnlySidebarLayout },
  { path: "/create-chapter/:id", component: CreateChapter, layout: OnlySidebarLayout },
  { path: "/manga-detail-management/:id/chapter-detail/:idChapter", component: ChapterDetail, layout: OnlySidebarLayout },
  { path: "/create-manga", component: CreateManga, layout: OnlySidebarLayout },
];
