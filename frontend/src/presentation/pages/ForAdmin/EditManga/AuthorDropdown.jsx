// src/components/edit-manga/AuthorDropdown.jsx
import { ChevronDown, Check } from "lucide-react";
import { useState } from "react";

export default function AuthorDropdown({ selected, options, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">Tác giả</label>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-left flex justify-between items-center hover:border-gray-600 transition"
        >
          <span className={selected ? "text-white" : "text-gray-500"}>
            {selected || "Chọn tác giả..."}
          </span>
          <ChevronDown size={18} className="text-gray-400" />
        </button>

        {isOpen && (
          <div className="absolute z-20 w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-2xl max-h-64 overflow-y-auto">
            {options.map((author) => (
              <button
                key={author}
                onClick={() => { onSelect(author); setIsOpen(false); }}
                className="w-full px-4 py-3 text-left hover:bg-gray-700 flex justify-between items-center transition"
              >
                {author}
                {selected === author && <Check size={16} className="text-green-400" />}
              </button>
            ))}
          </div>
        )}
      </div>
      <p className="text-xs text-gray-500 mt-1">Quản lý tác giả tại trang riêng.</p>
    </div>
  );
}