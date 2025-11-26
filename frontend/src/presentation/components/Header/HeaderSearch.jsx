import { forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";

const HeaderSearch = forwardRef(({ isOpen, setIsOpen, query, setQuery }, ref) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      console.log("Tìm kiếm:", query);
      setIsOpen(false);
    }
  };

  return (
    <div ref={ref} className="relative flex items-center">
      <div
        className="bg-gray-400 p-3 rounded-full hover:bg-gray-600 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Search size={16} color="white" />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 200 }}
            exit={{ opacity: 0, width: 0 }}
            className="absolute right-12 h-10 bg-white border border-gray-300 rounded-full overflow-hidden shadow-md flex items-center px-2"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-2 py-1 text-sm bg-transparent outline-none text-gray-800"
              placeholder="Tìm truyện..."
              autoFocus
            />
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
});

export default HeaderSearch;
