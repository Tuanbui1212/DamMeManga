import OnlySidebarLayout from "../Layouts/OnlySidebar";
<<<<<<< HEAD
import Dashboard from "../pages/ForAdmin/Dashboard/Dashboard";
import UserManagement from "../pages/ForAdmin/User/UserManagement";
import TagManagement from "../pages/ForAdmin/Tag/TagManagement"
import MangaList from "../pages/ForAdmin/MangaList/MangaManagement";
import MangaDetail from "../pages/ForAdmin/MangaDetail/MangaDetail";
import EditManga from "../pages/ForAdmin/EditManga/EditManga";
import CreateChapter from "../pages/ForAdmin/CreateChapter/CreateChapter";
import ChapterDetail from "../pages/ForAdmin/ChapterDetail/ChapterDetail"
import AuthorManagement from "../pages/ForAdmin/Author/AuthorManagement";

export const adminRoutes = [
  { path: "/dashboard", component: Dashboard , layout : OnlySidebarLayout },
  { path: "/user-management", component: UserManagement , layout : OnlySidebarLayout },
  { path: "/tag-management", component: TagManagement , layout : OnlySidebarLayout },
  { path: "/author-management", component: AuthorManagement , layout : OnlySidebarLayout },
  { path: "/manga-management", component: MangaList , layout : OnlySidebarLayout },
  { path: "/manga-detail-management/:id", component: MangaDetail , layout : OnlySidebarLayout },
  { path: "/edit-manga/:id", component: EditManga , layout : OnlySidebarLayout },
  { path: "/create-chapter/:id", component: CreateChapter , layout : OnlySidebarLayout },
  { path: "/manga-detail-management/:id/chapter-detail/:id", component: ChapterDetail , layout : OnlySidebarLayout },
=======
import DashboardPage from "../pages/ForAdmin/DashBoard/DashBoardPage";
import UserManagementPage from "../pages/ForAdmin/UserManagement/UserManagementPage";
import TagManagementPage from "../pages/ForAdmin/TagManagement/TagManagementPage";
import AuthorManagementPage from "../pages/ForAdmin/AuthorManagement/AuthorManagementPage";
import MangaManagementPage from "../pages/ForAdmin/MangaListManagement/MangaManagementPage";
import MangaDetailManagementPage from "../pages/ForAdmin/MangaDetailManagement/MangaDetailManagementPage";
import EditMangaManagementPage from "../pages/ForAdmin/EditManga/EditMangaManagement";
import CreateChapterPage from "../pages/ForAdmin/CreateChapter/CreateChapterPage";
import ChapterDetailPage from "../pages/ForAdmin/ChapterDetail/ChapterDetailPage";

export const adminRoutes = [
  { path: "/dashboard", component: DashboardPage , layout : OnlySidebarLayout },
  { path: "/user-management", component: UserManagementPage , layout : OnlySidebarLayout },
  { path: "/tag-management", component: TagManagementPage , layout : OnlySidebarLayout },
  { path: "/author-management", component: AuthorManagementPage , layout : OnlySidebarLayout },
  { path: "/manga-management", component: MangaManagementPage , layout : OnlySidebarLayout },
  { path: "/manga-detail-management/:id", component: MangaDetailManagementPage , layout : OnlySidebarLayout },
  { path: "/edit-manga/:id", component: EditMangaManagementPage , layout : OnlySidebarLayout },
  { path: "/create-chapter/:id", component: CreateChapterPage , layout : OnlySidebarLayout },
  { path: "/manga-detail-management/:id/chapter-detail/:id", component: ChapterDetailPage , layout : OnlySidebarLayout },
>>>>>>> java/phungcuong
];
