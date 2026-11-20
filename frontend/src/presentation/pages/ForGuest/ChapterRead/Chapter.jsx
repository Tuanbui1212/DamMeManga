import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react"; // icon loading

import ChapterPages from "./ChapterPages";
import ChapterNavigation from "./ChapterNavigation";
import ChapterListPopup from "./ChapterListPopup";
import CommentSidebar from "./CommentSidebar";

import ImgChapterService from "../../../../usecases/ImgChapterService";
import ChapterService from "../../../../usecases/ChapterService";
import HistoryService from "../../../../usecases/HistoryService";
import HistoryChapterService from "../../../../usecases/HistoryChapterService";
import MangaService from "../../../../usecases/MangaService";

const imgChapterService = new ImgChapterService();
const chapterService = new ChapterService();
const historyService = new HistoryService();
const historyChapterService = new HistoryChapterService();
const mangaService = new MangaService();

function ChapterReadPage() {
  const { id, chapterId } = useParams();
  const navigate = useNavigate();

  const [dataImgChapter, setDataImgChapter] = useState([]);
  const [allChapters, setAllChapter] = useState([]);
  const [showUI, setShowUI] = useState(true);
  const [showChapterList, setShowChapterList] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [isLoadingChapter, setIsLoadingChapter] = useState(false);

  // Chế độ đọc: "webtoon" (cuộn dọc) hoặc "single" (từng trang)
  const [readingMode, setReadingMode] = useState(() => {
    return localStorage.getItem("manga_reading_mode") || "webtoon";
  });
  const [singlePageIndex, setSinglePageIndex] = useState(0);
  const [currentVisiblePage, setCurrentVisiblePage] = useState(1);

  const toggleReadingMode = () => {
    const nextMode = readingMode === "webtoon" ? "single" : "webtoon";
    setReadingMode(nextMode);
    localStorage.setItem("manga_reading_mode", nextMode);
  };

  const containerRef = useRef(null);
  const lastScrollY = useRef(0);

  // Hàm scroll lên đầu
  const scrollToTop = () => {
    containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Khi chuyển chapter mới → scroll lên đầu và load ảnh
  useEffect(() => {
    const fetchChapterData = async () => {
      setIsLoadingChapter(true);
      setSinglePageIndex(0);
      setCurrentVisiblePage(1);
      scrollToTop();

      try {
        // Lấy ảnh chapter
        const data = await imgChapterService.getImgsByChapterId(chapterId);
        const sortedData = (data.length ? data : []).sort(
          (a, b) => a.stt - b.stt
        );
        setDataImgChapter(sortedData);

        // Lấy history user
        const userId = localStorage.getItem("userId");
        if (userId) {
          const history = await historyService.recordHistory(userId, id);
          const historyId = history?.idHistory;
          if (historyId) {
            await historyChapterService.recordHistoryChapter(
              historyId,
              chapterId
            );
          }
        }

        // Tăng countView
        await mangaService.incrementMangaViewCount(id);
      } catch (err) {
        console.error("🔥 Lỗi fetchChapterData:", err);
      } finally {
        setIsLoadingChapter(false);
      }
    };

    fetchChapterData();
  }, [id, chapterId]);

  // Lấy tất cả chapter (dùng để navigation)
  useEffect(() => {
    const fetchAllChapter = async () => {
      try {
        const dataAllChapter = await chapterService.getChaptersByMangaId(id);
        dataAllChapter.sort(
          (a, b) => Number(a.chapterNumber) - Number(b.chapterNumber)
        );
        setAllChapter(dataAllChapter);
      } catch (err) {
        console.error("🔥 Lỗi fetchAllChapter:", err);
      }
    };
    fetchAllChapter();
  }, [id]);

  // Ẩn/hiện UI khi scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const currentY = container.scrollTop;
      if (currentY > lastScrollY.current + 10) setShowUI(false);
      else if (currentY < lastScrollY.current - 10) setShowUI(true);
      lastScrollY.current = currentY;
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // Bắt phím tắt bàn phím
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        if (readingMode === "single") {
          setSinglePageIndex((prev) => {
            if (prev < dataImgChapter.length - 1) return prev + 1;
            return prev;
          });
        }
      } else if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        if (readingMode === "single") {
          setSinglePageIndex((prev) => Math.max(0, prev - 1));
        }
      } else if (e.key === "f" || e.key === "F") {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {});
        } else {
          document.exitFullscreen().catch(() => {});
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [readingMode, dataImgChapter.length]);

  // Chuyển chapter
  const handleNavigateChapter = (chapterIdToNavigate) => {
    if (!chapterIdToNavigate) return;
    navigate(`/mangas/${id}/chapter/${chapterIdToNavigate}`);
  };

  const currentChapterObj = allChapters.find((ch) => ch.idChapter === Number(chapterId));
  const currentChapterIndex = allChapters.findIndex((ch) => ch.idChapter === Number(chapterId));
  const nextChapterObj = currentChapterIndex >= 0 && currentChapterIndex < allChapters.length - 1
    ? allChapters[currentChapterIndex + 1]
    : null;
  const prevChapterObj = currentChapterIndex > 0
    ? allChapters[currentChapterIndex - 1]
    : null;

  return (
    <div className="quicksand-uniquifier relative h-screen w-screen overflow-hidden bg-gray-950">
      <ChapterPages
        pages={dataImgChapter}
        containerRef={containerRef}
        showUI={showUI}
        readingMode={readingMode}
        singlePageIndex={singlePageIndex}
        setSinglePageIndex={setSinglePageIndex}
        setCurrentVisiblePage={setCurrentVisiblePage}
        onNextChapter={() => nextChapterObj && handleNavigateChapter(nextChapterObj.idChapter)}
        onPrevChapter={() => prevChapterObj && handleNavigateChapter(prevChapterObj.idChapter)}
      />

      <CommentSidebar
        isOpen={showComments}
        onClose={() => setShowComments(false)}
      />

      <motion.div
        initial={{ y: 0 }}
        animate={{ y: showUI ? 0 : 100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="absolute bottom-0 w-full"
      >
        <ChapterNavigation
          mangaId={id}
          chapterNumber={currentChapterObj?.chapterNumber}
          allChapters={allChapters}
          scrollToTop={scrollToTop}
          setShowChapterList={setShowChapterList}
          setShowComments={setShowComments}
          readingMode={readingMode}
          onToggleReadingMode={toggleReadingMode}
          currentPage={readingMode === "single" ? singlePageIndex + 1 : currentVisiblePage}
          totalPages={dataImgChapter.length}
        />
      </motion.div>

      {showChapterList && (
        <ChapterListPopup
          mangaId={id}
          allChapters={allChapters}
          chapterNumber={chapterId}
          setShowChapterList={setShowChapterList}
        />
      )}

      {/* Overlay loading khi fetch chapter */}
      {isLoadingChapter && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
          <Loader2 className="animate-spin text-white" size={48} />
        </div>
      )}
    </div>
  );
}

export default ChapterReadPage;
