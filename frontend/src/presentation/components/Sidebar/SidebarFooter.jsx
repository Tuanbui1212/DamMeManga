import { LogOut } from "lucide-react";

export default function SidebarFooter({ isOpen }) {
  return (
    <div className="border-t border-gray-700 p-4">
      {isOpen ? (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
              A
            </div>
            <div>
              <p className="font-medium text-sm text-white">Admin User</p>
              <p className="text-xs text-gray-400">admin@story.com</p>
            </div>
          </div>
          <button className="flex items-center gap-2 text-sm hover:bg-gray-700 p-2 rounded-lg transition-all text-red-400 hover:text-red-300">
            <LogOut size={16} />
            <span className="text-sm">Đăng xuất</span>
          </button>
        </div>
      ) : (
        <button className="flex items-center justify-center w-full py-2 hover:bg-gray-700 rounded-lg text-red-400">
          <LogOut size={18} />
        </button>
      )}
    </div>
  );
}
