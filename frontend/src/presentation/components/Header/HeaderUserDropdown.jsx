import { forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CircleUserRound, User, Heart, History, Settings, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

const HeaderUserDropdown = forwardRef(({ isOpen, setIsOpen }, ref) => {
  return (
    <div
      ref={ref}
      className="bg-gray-400 p-3 rounded-full hover:bg-gray-600 cursor-pointer relative"
      onClick={() => setIsOpen(!isOpen)}
    >
      <CircleUserRound size={16} color="white" />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-3 right-0 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b dark:border-gray-700">
              <User className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-semibold text-gray-800 dark:text-white text-sm">UserName123</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">@username</p>
              </div>
            </div>

            <Link to="/follow" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm text-gray-700 dark:text-gray-200">
              <Heart className="w-4 h-4 text-pink-600" /> Danh sách theo dõi
            </Link>

            <Link to="/history" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm text-gray-700 dark:text-gray-200">
              <History className="w-4 h-4 text-blue-600" /> Lịch sử đọc truyện
            </Link>

            <Link to="/settings" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm text-gray-700 dark:text-gray-200">
              <Settings className="w-4 h-4 text-gray-600 dark:text-gray-300" /> Thiết lập
            </Link>

            <div className="border-t border-gray-100 dark:border-gray-700 mt-1">
              <Link
                to="/login"
                onClick={() => {
                  setIsOpen(false);
                  localStorage.removeItem("token");
                }}
                className="flex items-center gap-3 px-4 py-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 w-full text-sm transition"
              >
                <LogOut className="w-4 h-4" /> Đăng xuất
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

export default HeaderUserDropdown;
