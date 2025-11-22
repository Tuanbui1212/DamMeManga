export default function SidebarSubmenu({
  item,
  isOpen,
  expandedSubmenu,
  activeMenu,
  handleSubmenuClick,
}) {
  if (!isOpen || !item.submenu || expandedSubmenu !== item.id) return null;

  return (
    <div className="bg-gray-700/40">
      {item.submenu.map((sub) => (
        <button
          key={sub.id}
          onClick={() => handleSubmenuClick(sub)}
          className={`w-full text-left px-4 py-2 pl-12 transition-colors text-sm hover:bg-gray-600
            ${
              activeMenu === sub.id
                ? "text-white font-semibold bg-gray-700 border-l-4 border-white"
                : "text-gray-300"
            }`}
        >
          {sub.label}
        </button>
      ))}
    </div>
  );
}
