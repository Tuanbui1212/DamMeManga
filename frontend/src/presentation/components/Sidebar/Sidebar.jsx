import { useState, useEffect } from "react";
import { menuItems } from "./menuConfig";
import SidebarHeader from "./SidebarHeader";
import SidebarMenu from "./SidebarMenu";
import SidebarFooter from "./SidebarFooter";
import { House } from 'lucide-react';
import "../../../styles/font.css";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [expandedSubmenu, setExpandedSubmenu] = useState(null);
  const [activeMenu, setActiveMenu] = useState("dashboard");

  const currentPath = window.location.pathname;

  const findActiveMenu = () => {
    for (const item of menuItems) {
      if (item.path === currentPath) return { main: item.id, sub: null };

      if (item.submenu) {
        const activeSub = item.submenu.find((s) => s.path === currentPath);
        if (activeSub) return { main: item.id, sub: activeSub.id };
      }
    }
    return { main: "dashboard", sub: null };
  };

  useEffect(() => {
    const active = findActiveMenu();
    setActiveMenu(active.sub || active.main);

    if (active.sub) setExpandedSubmenu(active.main);
  }, [currentPath]);

  const handleMenuClick = (item) => {
    if (item.submenu) {
      setExpandedSubmenu(expandedSubmenu === item.id ? null : item.id);
    } else {
      window.location.href = item.path;
    }
  };

  const handleSubmenuClick = (sub) => {
    setActiveMenu(sub.id);
    window.location.href = sub.path;
  };

  return (
    <div
      className={`${
        isOpen ? "w-50" : "w-16"
      } bg-gray-800 text-gray-200 transition-all duration-300 flex flex-col min-h-screen shadow-xl quicksand-uniquifier z-1000`}
    >
      <SidebarHeader isOpen={isOpen} setIsOpen={setIsOpen} />

      <SidebarMenu
        menuItems={menuItems}
        isOpen={isOpen}
        activeMenu={activeMenu}
        expandedSubmenu={expandedSubmenu}
        handleMenuClick={handleMenuClick}
        handleSubmenuClick={handleSubmenuClick}
      />

      <SidebarFooter isOpen={isOpen} />
    </div>
  );
}
