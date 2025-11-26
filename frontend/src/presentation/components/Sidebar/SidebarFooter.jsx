import { LogOut, House } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SidebarFooter({ isOpen }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Xóa toàn bộ token và thông tin user
    localStorage.removeItem("token");
    localStorage.removeItem("account");
    localStorage.removeItem("role");

    // Chuyển về trang login
    navigate("/login");
  };

  const handleHome = () => {
    navigate("/"); // chuyển về trang chủ
  };

  return (
    <div className="border-t border-gray-700 p-4">
      {isOpen ? (
        <div className="flex flex-col gap-3">
          {/* User Info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
              A
            </div>
            <div>
              <p className="font-medium text-sm text-white">Admin User</p>
            </div>
          </div>

          {/* Home Button */}
          <button
            onClick={handleHome}
            className="flex items-center gap-2 text-sm hover:bg-gray-700 p-2 rounded-lg transition-all text-white"
          >
            <House size={16} />
            <span className="text-sm">Trang chủ</span>
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm hover:bg-gray-700 p-2 rounded-lg transition-all text-red-400 hover:text-red-300"
          >
            <LogOut size={16} />
            <span className="text-sm">Đăng xuất</span>
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <button
            onClick={handleHome}
            className="flex items-center justify-center w-full py-2 hover:bg-gray-700 rounded-lg text-white"
          >
            <House size={18} />
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-full py-2 hover:bg-gray-700 rounded-lg text-red-400"
          >
            <LogOut size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
