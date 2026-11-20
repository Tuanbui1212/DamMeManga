import { useState, useRef, useEffect, useMemo, useCallback } from "react";
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

// Tránh tăng lượt xem nhiều lần cho cùng 1 chapter trong 1 phiên (StrictMode / F5 nhanh)
const viewedChapters = new Set();

/** Ghi lịch sử đọc + tăng lượt xem: chạy nền, KHÔNG chặn việc hiển thị ảnh. */
function trackReading(mangaId, chapterId) {
  const key = `${mangaId}:${chapterId}`;
  if (!viewedChapters.has(key)) {
    viewedChapters.add(key);
    mangaService.incrementMangaViewCount(mangaId).catch((err) =>
      console.warn("Không tăng được lượt xem:", err?.message)
    );
  }

  const userId = localStorage.getItem("userId");
  if (!userId) return;

  historyService
    .recordHistory(userId, mangaId)
    .then((history) => {
      const historyId = history?.idHistory;
      if (historyId) {
        return historyChapterService.recordHistoryChapter(historyId, chapterId);
      }
      return null;
    })
    .catch((err) => console.warn("Không ghi được lịch sử đọc:", err?.message));
}

function ChapterReadPage() {
  const { id, chapterId } = useParams();
  const navigate = useNavigate();

  const [dataImgChapter, setDataImgChapter] = useState([]);
  const [allChapters, setAllChapter] = useState([]);
  const [showUI, setShowUI] = useState(true);
  const [showChapterList, setShowChapterList] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [isLoadingChapter, setIsLoadingChapter] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  // Chế độ đọc: "webtoon" (cuộn dọc) hoặc "single" (từng trang)
  const [readingMode, setReadingMode] = useState(() => {
    return localStorage.getItem("manga_reading_mode") || "webtoon";
  });
  const [singlePageIndex, setSinglePageIndex] = useState(0);
  const [currentVisiblePage, setCurrentVisiblePage] = useState(1);

  const toggleReadingMode = useCallback(() => {
    setReadingMode((prev) => {
      const nextMode = prev === "webtoon" ? "single" : "webtoon";
      localStorage.setItem("manga_reading_mode", nextMode);
      return nextMode;
    });
  }, []);

  const containerRef = useRef(null);
  const lastScrollY = useRef(0);

  // Hàm scroll lên đầu
  const scrollToTop = useCallback(() => {
    containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Khi chuyển chapter mới → scroll lên đầu và load ảnh
  useEffect(() => {
    let cancelled = false;

    setIsLoadingChapter(true);
    setLoadError(false);
    setSinglePageIndex(0);
    setCurrentVisiblePage(1);
    containerRef.current?.scrollTo({ top: 0 });

    imgChapterService
      .getImgsByChapterId(chapterId)
      .then((data) => {
        if (cancelled) return;
        const sortedData = (Array.isArray(data) ? data : [])
          .filter((img) => img && img.imgLink)
          .sort((a, b) => Number(a.stt) - Number(b.stt));
        setDataImgChapter(sortedData);
      })
      .catch((err) => {
        console.error("🔥 Lỗi tải ảnh chapter:", err);
        if (!cancelled) {
          setDataImgChapter([]);
          setLoadError(true);
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoadingChapter(false);
      });

    // Lịch sử + lượt xem chạy song song ở nền (trước đây phải chờ xong mới tắt loading)
    trackReading(id, chapterId);

    return () => {
      cancelled = true;
    };
  }, [id, chapterId, reloadKey]);

  // Lấy tất cả chapter (dùng để navigation)
  useEffect(() => {
    let cancelled = false;
    chapterService
      .getChaptersByMangaId(id)
      .then((dataAllChapter) => {
        if (cancelled) return;
        const sorted = [...(dataAllChapter || [])].sort(
          (a, b) => Number(a.chapterNumber) - Number(b.chapterNumber)
        );
        setAllChapter(sorted);
      })
      .catch((err) => console.error("🔥 Lỗi fetchAllChapter:", err));
    return () => {
      cancelled = true;
    };
  }, [id]);

  // Ẩn/hiện UI khi scroll.
  // Container được tạo lại khi đổi chế độ đọc hoặc khi có dữ liệu ảnh, nên phải gắn lại listener.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const currentY = container.scrollTop;
        if (currentY > lastScrollY.current + 10) setShowUI(false);
        else if (currentY < lastScrollY.current - 10) setShowUI(true);
        lastScrollY.current = currentY;
        ticking = false;
      });
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [readingMode, dataImgChapter.length]);

  // Bắt phím tắt bàn phím
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        if (readingMode === "single") {
          setSinglePageIndex((prev) =>
            prev < dataImgChapter.length - 1 ? prev + 1 : prev
          );
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
  const handleNavigateChapter = useCallback(
    (chapterIdToNavigate) => {
      if (!chapterIdToNavigate) return;
      navigate(`/mangas/${id}/chapter/${chapterIdToNavigate}`);
    },
    [navigate, id]
  );

  // Xác định chapter trước/sau theo VỊ TRÍ trong danh sách đã sort
  // (không dựa vào chapterNumber ± 1, vì số chương có thể không liên tục)
  const { currentChapterObj, prevChapterObj, nextChapterObj } = useMemo(() => {
    const idx = allChapters.findIndex((ch) => String(ch.idChapter) === String(chapterId));
    return {
      currentChapterObj: idx >= 0 ? allChapters[idx] : null,
      prevChapterObj: idx > 0 ? allChapters[idx - 1] : null,
      nextChapterObj: idx >= 0 && idx < allChapters.length - 1 ? allChapters[idx + 1] : null,
    };
  }, [allChapters, chapterId]);

  // Preload danh sách ảnh của chapter kế tiếp khi người đọc gần hết chapter hiện tại
  useEffect(() => {
    if (!nextChapterObj || dataImgChapter.length === 0) return;
    const current = readingMode === "single" ? singlePageIndex + 1 : currentVisiblePage;
    if (current < dataImgChapter.length - 2) return;
    imgChapterService.getImgsByChapterId(nextChapterObj.idChapter).catch(() => {});
    // chỉ cần chạy 1 lần cho mỗi chapter kế tiếp
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextChapterObj?.idChapter, currentVisiblePage >= dataImgChapter.length - 2]);

  const onNextChapter = useCallback(
    () => nextChapterObj && handleNavigateChapter(nextChapterObj.idChapter),
    [nextChapterObj, handleNavigateChapter]
  );
  const onPrevChapter = useCallback(
    () => prevChapterObj && handleNavigateChapter(prevChapterObj.idChapter),
    [prevChapterObj, handleNavigateChapter]
  );

  return (
    <div className="quicksand-uniquifier relative h-screen w-screen overflow-hidden bg-gray-950">
      {loadError ? (
        <div className="h-screen w-full flex flex-col items-center justify-center gap-4 bg-gray-950 text-gray-300">
          <p>Không thể tải ảnh của chương này.</p>
          <button
            onClick={() => setReloadKey((k) => k + 1)}
            className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold"
          >
            Thử lại
          </button>
        </div>
      ) : (
        <ChapterPages
          key={chapterId}
          pages={dataImgChapter}
          isLoading={isLoadingChapter}
          containerRef={containerRef}
          showUI={showUI}
          readingMode={readingMode}
          singlePageIndex={singlePageIndex}
          setSinglePageIndex={setSinglePageIndex}
          setCurrentVisiblePage={setCurrentVisiblePage}
          onNextChapter={onNextChapter}
          onPrevChapter={onPrevChapter}
        />
      )}

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
          prevChapterId={prevChapterObj?.idChapter ?? null}
          nextChapterId={nextChapterObj?.idChapter ?? null}
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
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50 pointer-events-none">
          <Loader2 className="animate-spin text-white" size={48} />
        </div>
      )}
    </div>
  );
}

export default ChapterReadPage;
