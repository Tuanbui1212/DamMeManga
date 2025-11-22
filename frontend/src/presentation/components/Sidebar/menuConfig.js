// menuConfig.js
import { LayoutDashboard, BookOpen, Users } from "lucide-react";

export const menuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    id: "stories",
    label: "Quản Lý Truyện",
    icon: BookOpen,
    submenu: [
      { id: "truyen", label: "Truyện", path: "/manga-management" },
      { id: "tac-gia", label: "Tác Giả", path: "/author-management" },
      { id: "the-loai", label: "Thể Loại", path: "/tag-management" },
    ],
  },
  {
    id: "users",
    label: "Quản Lý User",
    icon: Users,
    path: "/user-management",
  },
];
