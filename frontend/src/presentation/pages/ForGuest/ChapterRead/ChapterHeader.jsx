import { X, Menu } from "lucide-react";

export default function ChapterHeader({ showUI, toggleUI }) {
  return (
    <>
      {/* Nút toggle UI */}
      <button
        onClick={toggleUI}
        className={`fixed right-6 z-50 bg-yellow-600 hover:bg-yellow-500 active:scale-95 
          text-white p-3 rounded-full shadow-lg transition-all duration-300 ease-in-out 
          select-none touch-none ${showUI ? "bottom-20" : "bottom-6"}`}
      >
        {showUI ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Header */}
      {showUI && (
        <div className="fixed top-0 left-0 right-0 z-40">
        </div>
      )}
    </>
  );
}
