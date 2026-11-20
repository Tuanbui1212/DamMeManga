import {
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ArrowLeft,
  MessageCircle,
  BookOpen,
  ScrollText,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ChapterNavigation({
  mangaId,
  allChapters,
  chapterNumber,
  scrollToTop,
  setShowChapterList,
  setShowComments,
  readingMode = "webtoon",
  onToggleReadingMode,
  currentPage = 1,
  totalPages = 0,
}) {
  const navigate = useNavigate();

  const currentNum = Number(chapterNumber) || 0;

  const maxChapterNumber =
    allChapters?.length > 0
      ? [...allChapters].sort((a, b) => b.chapterNumber - a.chapterNumber)[0]
          ?.chapterNumber
      : 0;

  const prevChapterId =
    currentNum > 1
      ? allChapters.find((ch) => Number(ch.chapterNumber) === currentNum - 1)
          ?.idChapter
      : null;

  const nextChapterId =
    currentNum < maxChapterNumber
      ? allChapters.find((ch) => Number(ch.chapterNumber) === currentNum + 1)
          ?.idChapter
      : null;

  const handleNavigate = (targetId) => {
    if (targetId) {
      navigate(`/mangas/${mangaId}/chapter/${targetId}`);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 backdrop-blur-md bg-gray-950/95 text-white flex items-center justify-between sm:justify-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 shadow-2xl border-t border-gray-800">
      {/* Quay lại trang manga */}
      <button
        onClick={() => navigate(`/mangas/${mangaId}`)}
        className="bg-gray-800 hover:bg-gray-700 active:bg-gray-600 px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1"
        title="Quay lại truyện"
      >
        <ArrowLeft size={18} /> <span className="hidden sm:inline">Back</span>
      </button>

      {/* Chap trước */}
      <button
        onClick={() => handleNavigate(prevChapterId)}
        disabled={!prevChapterId}
        className={`px-3 sm:px-4 py-2 rounded-lg transition flex items-center ${
          !prevChapterId
            ? "bg-gray-900 text-gray-600 cursor-not-allowed"
            : "bg-gray-800 hover:bg-gray-700 active:bg-gray-600 text-white"
        }`}
        title="Chapter trước"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Nút danh sách chap */}
      <button
        onClick={() => setShowChapterList(true)}
        className="min-w-[80px] sm:min-w-[100px] px-3 sm:px-4 py-2 bg-amber-600 hover:bg-amber-500 active:bg-amber-700 rounded-lg font-bold text-sm transition shadow-md flex items-center justify-center gap-1"
      >
        <span>Chap {currentNum}</span>
        {totalPages > 0 && (
          <span className="text-[11px] font-normal text-amber-100 hidden md:inline">
            ({currentPage}/{totalPages})
          </span>
        )}
      </button>

      {/* Chap tiếp theo */}
      <button
        onClick={() => handleNavigate(nextChapterId)}
        disabled={!nextChapterId}
        className={`px-3 sm:px-4 py-2 rounded-lg transition flex items-center ${
          !nextChapterId
            ? "bg-gray-900 text-gray-600 cursor-not-allowed"
            : "bg-gray-800 hover:bg-gray-700 active:bg-gray-600 text-white"
        }`}
        title="Chapter tiếp theo"
      >
        <ChevronRight size={20} />
      </button>

      {/* Nút đổi chế độ đọc Webtoon / Single Page */}
      {onToggleReadingMode && (
        <button
          onClick={onToggleReadingMode}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5 ${
            readingMode === "single"
              ? "bg-indigo-600 hover:bg-indigo-500 text-white"
              : "bg-gray-800 hover:bg-gray-700 text-gray-300"
          }`}
          title={readingMode === "single" ? "Chuyển sang cuộn dọc (Webtoon)" : "Chuyển sang đọc từng trang (Single page)"}
        >
          {readingMode === "single" ? <BookOpen size={18} /> : <ScrollText size={18} />}
          <span className="hidden lg:inline">{readingMode === "single" ? "Từng trang" : "Cuộn dọc"}</span>
        </button>
      )}

      {/* Nút bình luận */}
      <button
        onClick={() => setShowComments(true)}
        className="bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1"
        title="Bình luận"
      >
        <MessageCircle size={18} />
      </button>

      {/* Nút scroll lên đầu trang */}
      <button
        onClick={scrollToTop}
        className="bg-sky-600 hover:bg-sky-500 active:bg-sky-700 px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1"
        title="Lên đầu trang"
      >
        <ChevronUp size={20} />
      </button>
    </div>
  );
}
