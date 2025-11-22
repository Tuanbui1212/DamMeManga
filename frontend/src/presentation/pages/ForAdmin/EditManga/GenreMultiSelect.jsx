// src/components/edit-manga/GenreMultiSelect.jsx
import { ChevronDown, Check } from "lucide-react";
import { useState } from "react";

export default function GenreMultiSelect({ selected, options, onToggle }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">Thể loại</label>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-left flex justify-between items-center hover:border-gray-600 transition"
        >
          <span className={selected.length > 0 ? "text-white" : "text-gray-500"}>
            {selected.length > 0 ? `${selected.length} thể loại đã chọn` : "Chọn thể loại..."}
          </span>
          <ChevronDown size={18} className="text-gray-400" />
        </button>

        {isOpen && (
          <div className="absolute z-20 w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-2xl max-h-64 overflow-y-auto">
            {options.map((genre) => (
              <button
                key={genre}
                onClick={() => onToggle(genre)}
                className="w-full px-4 py-3 text-left hover:bg-gray-700 flex justify-between items-center transition"
              >
                {genre}
                {selected.includes(genre) && <Check size={16} className="text-green-400" />}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mt-3">
        {selected.map((tag) => (
          <span key={tag} className="px-3 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-xs font-medium">
            {tag}
          </span>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-1">Quản lý thể loại tại trang riêng.</p>
    </div>
  );
}