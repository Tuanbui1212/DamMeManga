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

  const containerRef = useRef(null);
  const lastScrollY = useRef(0);

  const scrollToTop = () => {
    console.log("chay ham load");
    containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const initChapterRead = async () => {
      console.log("📖 [ChapterRead] BẮT ĐẦU initChapterRead");

      try {
        const userId = localStorage.getItem("userId");
        console.log("👤 userId từ localStorage:", userId);

        if (!userId) {
          console.warn("⚠️ Không có userId → KHÔNG tạo history");
          return;
        }

        console.log("🕒 Gọi recordHistory(userId, mangaId)...");
        const history = await historyService.recordHistory(userId, id);
        console.log("✅ recordHistory:", history);

        const historyId = history?.idHistory;
        if (!historyId) {
          console.error("❌ Không nhận được historyId");
          return;
        }

        console.log("🕒 Gọi recordHistoryChapter(historyId, chapterId)...");
        const historyChapter = await historyChapterService.recordHistoryChapter(
          historyId,
          chapterId
        );

        console.log("✅ recordHistoryChapter:", historyChapter);

        // tăng view
        const manga = await mangaService.getMangaById(id);
        const newCountView = (manga.countView || 0) + 1;
        await mangaService.patchManga(id, { countView: newCountView });

        console.log("📈 countView updated:", newCountView);
      } catch (err) {
        console.error("🔥 LỖI initChapterRead:", err);
      }
    };

    initChapterRead();
  }, [id, chapterId]);

  useEffect(() => {
    const fetchImgChapter = async () => {
      setIsLoadingChapter(true);
      try {
        const data = await imgChapterService.getImgsByChapterId(chapterId);
        const sortedData = (data.length ? data : []).sort(
          (a, b) => a.stt - b.stt
        );

        setDataImgChapter(sortedData);
        console.log(`Images for chapter ${chapterId}:`, sortedData);
      } catch (err) {
        console.error("Lỗi khi load ảnh chapter:", err);
      } finally {
        setIsLoadingChapter(false);
      }
    };
    fetchImgChapter();
  }, [chapterId]);

  useEffect(() => {
    const fetchAllChapter = async () => {
      const dataAllChapter = await chapterService.getChaptersByMangaId(id);
      dataAllChapter.sort(
        (a, b) => Number(a.chapterNumber) - Number(b.chapterNumber)
      );
      setAllChapter(dataAllChapter);
    };
    fetchAllChapter();
  }, [id]);

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

  const handleNavigateChapter = (chapterIdToNavigate) => {
    if (!chapterIdToNavigate) return;
    setIsLoadingChapter(true);
    navigate(`/mangas/${id}/chapter/${chapterIdToNavigate}`);
  };

  return (
    <div className="quicksand-uniquifier relative h-screen w-screen overflow-hidden bg-gray-200">
      <ChapterPages
        pages={dataImgChapter}
        containerRef={containerRef}
        showUI={showUI}
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
          chapterNumber={
            allChapters.find((ch) => ch.idChapter === Number(chapterId))
              ?.chapterNumber
          }
          allChapters={allChapters}
          scrollToTop={scrollToTop}
          setShowChapterList={setShowChapterList}
          setShowComments={setShowComments}
          onNavigateChapter={handleNavigateChapter} // thêm prop mới
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

      {/* Overlay khi load chapter */}
      {isLoadingChapter && (
        <div className="absolute inset-0 bg-black/50 bg-opacity-60 flex items-center justify-center z-50">
          <Loader2 className="animate-spin text-white" size={48} />
        </div>
      )}
    </div>
  );
}

export default ChapterReadPage;
