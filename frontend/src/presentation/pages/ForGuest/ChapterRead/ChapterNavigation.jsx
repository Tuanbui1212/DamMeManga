import {
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ArrowLeft,
  MessageCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ChapterNavigation({
  mangaId,
  chapterNumber,
  allChapters,
  totalChapters,
  scrollToTop,
  setShowChapterList,
  setShowComments, // nhận được rồi nè
}) {
  const navigate = useNavigate();

  const prevChapter =
    chapterNumber > 1
      ? allChapters.find((ch) => ch.chapterNumber === chapterNumber - 1)
          ?.idChapter
      : null;
  //const nextChapter = chapterNumber < totalChapters ? chapterNumber + 1 : null;
  const nextChapter =
    chapterNumber < totalChapters
      ? allChapters.find((ch) => ch.chapterNumber === chapterNumber + 1)
          ?.idChapter
      : null;
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 backdrop-blur-md bg-gray-900/80 text-white flex items-center justify-center gap-3 px-4 py-3">
      <button
        onClick={() => navigate(`/mangas/${mangaId}`)}
        className="bg-gray-700 hover:bg-gray-600 active:bg-gray-500 px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1"
      >
        <ArrowLeft size={18} /> Quay lại
      </button>

      <button
        onClick={() =>
          prevChapter && navigate(`/mangas/${mangaId}/chapter/${prevChapter}`)
        }
        disabled={!prevChapter}
        className="disabled:opacity-50"
      >
        <div className="bg-gray-700 hover:bg-gray-600 active:bg-gray-500 px-4 py-2 rounded-lg text-sm font-medium transition flex items-center">
          <ChevronLeft size={20} />
        </div>
      </button>

      <button
        onClick={() => setShowChapterList(true)}
        className="px-5 py-2 bg-yellow-600 hover:bg-yellow-500 active:bg-yellow-700 rounded-lg font-bold text-sm transition"
      >
        Chap {chapterNumber}
      </button>

      <button
        onClick={() =>
          nextChapter && navigate(`/mangas/${mangaId}/chapter/${nextChapter}`)
        }
        disabled={!nextChapter}
        className="disabled:opacity-50"
      >
        <div className="bg-gray-700 hover:bg-gray-600 active:bg-gray-500 px-4 py-2 rounded-lg text-sm font-medium transition flex items-center">
          <ChevronRight size={20} />
        </div>
      </button>

      {/* NÚT BÌNH LUẬN – HOẠT ĐỘNG NGON LÀNH */}
      <button
        onClick={() => setShowComments(true)}
        className="bg-green-600 hover:bg-green-700 active:bg-green-800 px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1"
      >
        <MessageCircle size={18} /> Bình luận
      </button>

      <button
        onClick={scrollToTop}
        className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1"
      >
        <ChevronUp size={20} /> Top
      </button>
    </div>
  );
}
