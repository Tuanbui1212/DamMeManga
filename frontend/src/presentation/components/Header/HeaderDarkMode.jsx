import { Sun, Moon } from "lucide-react";
import { useDarkMode } from "./hooks/useDarkMode";

export default function HeaderDarkMode() {
  const [isDarkMode, setIsDarkMode] = useDarkMode();

  return (
    <div
      className="bg-gray-400 p-3 rounded-full hover:bg-gray-600 cursor-pointer"
      onClick={() => setIsDarkMode(!isDarkMode)}
      title={isDarkMode ? "Chuyển sang sáng" : "Chuyển sang tối"}
    >
      {isDarkMode ? <Sun size={16} color="white" /> : <Moon size={16} color="white" />}
    </div>
  );
}
