import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PaginationButtons({ currentPage, totalPages, prevPage, nextPage, isSliding }) {
  if (totalPages <= 1) return null;

  return (
    <div className="absolute inset-y-0 left-0 right-0 flex justify-between items-center pointer-events-none px-2 md:px-4">
      <button
        onClick={prevPage}
        disabled={currentPage === 1 || isSliding}
        className="pointer-events-auto flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-white text-gray-700 rounded-full shadow-lg hover:shadow-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 z-10"
      >
        <ChevronLeft size={20} className="md:w-6 md:h-6" />
      </button>

      <button
        onClick={nextPage}
        disabled={currentPage === totalPages || isSliding}
        className="pointer-events-auto flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-white text-gray-700 rounded-full shadow-lg hover:shadow-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 z-10"
      >
        <ChevronRight size={20} className="md:w-6 md:h-6" />
      </button>
    </div>
  );
}
