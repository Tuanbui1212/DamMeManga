import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  CircleUserRound,
  Bell,
  User,
  Heart,
  History,
  Settings,
  LogOut,
  Sun,
  Moon,
} from "lucide-react";

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showHeader, setShowHeader] = useState(true);

  const dropdownRef = useRef(null);
  const searchRef = useRef(null);
  const lastScrollY = useRef(0);

  // Ẩn/hiện header khi cuộn
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        // Cuộn xuống → ẩn header
        setShowHeader(false);
      } else if (currentScrollY < lastScrollY.current) {
        // Cuộn lên → hiện lại header
        setShowHeader(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Áp dụng theme
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  // Đóng dropdown & search khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Tìm kiếm:", searchQuery);
      setIsSearchOpen(false);
    }
  };

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: showHeader ? 0 : -80 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="
        quicksand-uniquifier 
        bg-white/70 
        backdrop-blur-md 
        w-full 
        h-12 
        flex 
        items-center 
        justify-between 
        px-40 
        border-b 
        border-gray-300 
        fixed 
        top-0 
        z-50
      "
    >
      {/* Logo */}
      <div className="flex items-center h-20">
        <Link to="/"><h1 className="text-2xl font-bold text-black">DMManga</h1></Link>

      </div>

      {/* Icon group */}
      <div className="flex gap-2 relative items-center">
        {/* Search */}
        <div ref={searchRef} className="relative flex items-center">
          <div
            className="bg-gray-400 p-3 rounded-full hover:bg-gray-600 transition-colors duration-200 cursor-pointer"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search size={16} color="white" />
          </div>

          <AnimatePresence>
            {isSearchOpen && (
              <motion.form
                onSubmit={handleSearchSubmit}
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 200 }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute right-12 h-10 bg-white border border-gray-300 rounded-full overflow-hidden shadow-md flex items-center px-2"
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-2 py-1 text-sm bg-transparent outline-none text-gray-800"
                  placeholder="Tìm truyện..."
                  autoFocus
                />
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* Toggle Dark/Light */}
        <div
          className="bg-gray-400 p-3 rounded-full hover:bg-gray-600 transition-colors duration-200 cursor-pointer"
          onClick={() => setIsDarkMode(!isDarkMode)}
          title={isDarkMode ? "Chuyển sang chế độ sáng" : "Chuyển sang chế độ tối"}
        >
          {isDarkMode ? <Sun size={16} color="white" /> : <Moon size={16} color="white" />}
        </div>

        {/* Notification */}
        <div className="bg-gray-400 p-3 rounded-full hover:bg-gray-600 transition-colors duration-200 cursor-pointer">
          <Bell size={16} color="white" />
        </div>

        {/* User Dropdown */}
        <div
          className="bg-gray-400 p-3 rounded-full hover:bg-gray-600 transition-colors duration-200 cursor-pointer relative"
          ref={dropdownRef}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <CircleUserRound size={16} color="white" />
          <AnimatePresence>
            {isDropdownOpen && (
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
                    <p className="font-semibold text-gray-800 dark:text-white text-sm">
                      UserName123
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">@username</p>
                  </div>
                </div>

                <Link
                  to="/follow"
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm text-gray-700 dark:text-gray-200"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <Heart className="w-4 h-4 text-pink-600" />
                  Danh sách theo dõi
                </Link>

                <Link
                  to="/history"
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm text-gray-700 dark:text-gray-200"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <History className="w-4 h-4 text-blue-600" />
                  Lịch sử đọc truyện
                </Link>

                <Link
                  to="/settings"
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm text-gray-700 dark:text-gray-200"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <Settings className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                  Thiết lập
                </Link>

                <div className="border-t border-gray-100 dark:border-gray-700 mt-1">
                  <Link
                    to="/login"
                    className="flex items-center gap-3 px-4 py-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 w-full text-sm transition"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      localStorage.removeItem("token"); // Xoá token trước khi chuyển trang
                    }}
                  >
                    <LogOut className="w-4 h-4" />
                    Đăng xuất
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export default Header;
