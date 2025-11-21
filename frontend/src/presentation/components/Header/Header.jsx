import { useState, useRef } from "react";
import HeaderLogo from "./HeaderLogo";
import HeaderSearch from "./HeaderSearch";
import HeaderUserDropdown from "./HeaderUserDropdown";
import HeaderDarkMode from "./HeaderDarkMode";
import  useScrollHeader  from "./hooks/useScrollHeader";
import  useClickOutside  from "./hooks/useClickOutside";
import { ChevronUp } from "lucide-react"; // thêm icon

import '../../../styles/font.css'

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  const searchRef = useRef(null);
  const dropdownRef = useRef(null);

  const showHeader = useScrollHeader();

  useClickOutside(searchRef, () => setIsSearchOpen(false));
  useClickOutside(dropdownRef, () => setIsDropdownOpen(false));

  return (
    <div className={`quicksand-uniquifier fixed top-0 w-full z-50 transition-transform duration-300 ${showHeader ? "translate-y-0" : "-translate-y-20"}`}>
      <div className="flex items-center justify-between px-40 h-12 bg-white/70 backdrop-blur-md border-b border-gray-300">
        <HeaderLogo />
        <div className="flex gap-2 items-center">
          <HeaderSearch
            ref={searchRef}
            isOpen={isSearchOpen}
            setIsOpen={setIsSearchOpen}
            query={searchQuery}
            setQuery={setSearchQuery}
          />
          <HeaderDarkMode />
          <HeaderUserDropdown
            ref={dropdownRef}
            isOpen={isDropdownOpen}
            setIsOpen={setIsDropdownOpen}
          />
        </div>
      </div>
    </div>
  );
}
