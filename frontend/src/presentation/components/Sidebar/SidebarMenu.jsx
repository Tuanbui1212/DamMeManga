import SidebarMenuItem from "./SidebarMenuItem";
import SidebarSubmenu from "./SidebarSubmenu";

export default function SidebarMenu({
  menuItems,
  isOpen,
  activeMenu,
  expandedSubmenu,
  handleMenuClick,
  handleSubmenuClick,
}) {
  return (
    <nav className="flex-1 overflow-y-auto py-3">
      {menuItems.map((item) => (
        <div key={item.id}>
          <SidebarMenuItem
            item={item}
            isOpen={isOpen}
            activeMenu={activeMenu}
            expandedSubmenu={expandedSubmenu}
            handleMenuClick={handleMenuClick}
          />

          <SidebarSubmenu
            item={item}
            isOpen={isOpen}
            expandedSubmenu={expandedSubmenu}
            activeMenu={activeMenu}
            handleSubmenuClick={handleSubmenuClick}
          />
        </div>
      ))}
    </nav>
  );
}
