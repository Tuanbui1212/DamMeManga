import { PanelRight } from "lucide-react";

export default function SidebarHeader({ isOpen, setIsOpen }) {
  return (
    <div className="p-4 flex items-center justify-between border-b border-gray-700">
      {isOpen && <div className="text-lg font-bold text-white">DMManga</div>}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
      >
        <PanelRight size={18} />
      </button>
    </div>
  );
}
