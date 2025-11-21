import { ChevronLeft, ChevronRight, ChevronUp, ArrowLeft, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ChapterNavigation({
  mangaId,
  chapterNumber,
  totalChapters, // nếu muốn disable nút next ở chapter cuối
  scrollToTop,
  setShowChapterList,
}) {
  const navigate = useNavigate();

  // Tính prev/next chapter
  const prevChapter = chapterNumber > 1 ? chapterNumber - 1 : null;
  const nextChapter = chapterNumber < totalChapters ? chapterNumber + 1 : null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 backdrop-blur-md bg-gray-900/80 text-white flex items-center justify-center gap-3 px-4 py-3">

      {/* Quay lại manga detail */}
      <button
        onClick={() => navigate(`/manga/${mangaId}`)}
        className="bg-gray-700 hover:bg-gray-600 active:bg-gray-500 px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1"
      >
        <ArrowLeft size={18} /> Quay lại
      </button>

      {/* Prev chapter */}
      <button
        onClick={() => prevChapter && navigate(`/manga/${mangaId}/chapter/${prevChapter}`)}
        disabled={!prevChapter}
        className="disabled:opacity-50"
      >
        <div className="bg-gray-700 hover:bg-gray-600 active:bg-gray-500 px-4 py-2 rounded-lg text-sm font-medium transition flex items-center">
          <ChevronLeft size={20} />
        </div>
      </button>

      {/* Current chapter */}
      <button
        onClick={() => setShowChapterList(true)}
        className="px-5 py-2 bg-yellow-600 hover:bg-yellow-500 active:bg-yellow-700 rounded-lg font-bold text-sm transition"
      >
        Chap {chapterNumber}
      </button>

      {/* Next chapter */}
      <button
        onClick={() => nextChapter && navigate(`/manga/${mangaId}/chapter/${nextChapter}`)}
        disabled={!nextChapter}
        className="disabled:opacity-50"
      >
        <div className="bg-gray-700 hover:bg-gray-600 active:bg-gray-500 px-4 py-2 rounded-lg text-sm font-medium transition flex items-center">
          <ChevronRight size={20} />
        </div>
      </button>

      {/* Bình luận */}
      <button
        onClick={() => console.log("Mở bình luận")} // bạn có thể bind modal hoặc scroll tới comment
        className="bg-green-600 hover:bg-green-700 active:bg-green-800 px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1"
      >
        <MessageCircle size={18} /> Bình luận
      </button>

      {/* Scroll lên đầu trang */}
      <button
        onClick={scrollToTop}
        className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1"
      >
        <ChevronUp size={20} /> Top
      </button>
    </div>
  );
}
