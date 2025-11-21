import OnlySidebarLayout from "../Layouts/OnlySidebar";
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
];
