import { ChevronDown } from "lucide-react";

export default function SidebarMenuItem({
  item,
  isOpen,
  activeMenu,
  expandedSubmenu,
  handleMenuClick,
}) {
  return (
    <button
      onClick={() => handleMenuClick(item)}
      className={`w-full flex items-center justify-between px-4 py-3 hover:bg-gray-700 transition-colors text-sm
        ${activeMenu === item.id ? "bg-gray-700 border-l-4 border-white" : ""}
        ${!isOpen ? "justify-center" : ""}`}
    >
      <div className="flex items-center gap-3">
        <item.icon size={18} />
        {isOpen && <span className="font-medium">{item.label}</span>}
      </div>

      {/* icon dropdown */}
      {isOpen && item.submenu && (
        <ChevronDown
          size={16}
          className={`transition-transform ${
            expandedSubmenu === item.id ? "rotate-180" : ""
          }`}
        />
      )}
    </button>
  );
}
