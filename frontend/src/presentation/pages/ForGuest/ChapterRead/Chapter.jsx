import ChapterPages from "./ChapterPages";
import ChapterNavigation from "./ChapterNavigation";
import ChapterListPopup from "./ChapterListPopup";
import CommentSidebar from "./CommentSidebar"; // Thêm cái này
import { useState, useRef, useEffect, use } from "react";
import { motion } from "framer-motion";
import { data, useParams } from "react-router-dom";

import ImgChapterService from "../../../../usecases/ImgChapterService";
import ChapterService from "../../../../usecases/ChapterService";

const pagesData = [
  "https://ik.imagekit.io/cuongphung241103/BTL_JAVA/OnePunchMan/Chap%201/1.jpeg?updatedAt=1762838219233",
  "https://ik.imagekit.io/cuongphung241103/BTL_JAVA/OnePunchMan/Chap%201/2.jpeg?updatedAt=1762838219540",
  "https://ik.imagekit.io/cuongphung241103/BTL_JAVA/OnePunchMan/Chap%201/3.jpeg?updatedAt=1762838219748",
  "https://ik.imagekit.io/cuongphung241103/BTL_JAVA/OnePunchMan/Chap%201/5.jpeg?updatedAt=1762838219748",
  "https://ik.imagekit.io/cuongphung241103/BTL_JAVA/OnePunchMan/Chap%201/6.jpeg?updatedAt=1762838219884",
  "https://ik.imagekit.io/cuongphung241103/BTL_JAVA/OnePunchMan/Chap%201/7.jpeg?updatedAt=1762838219720",
  "https://ik.imagekit.io/cuongphung241103/BTL_JAVA/OnePunchMan/Chap%201/8.jpeg?updatedAt=1762838219651",
  "https://ik.imagekit.io/cuongphung241103/BTL_JAVA/OnePunchMan/Chap%201/9.jpeg?updatedAt=1762838219438",
  "https://ik.imagekit.io/cuongphung241103/BTL_JAVA/OnePunchMan/Chap%201/10.jpeg?updatedAt=1762838220077",
  "https://ik.imagekit.io/cuongphung241103/BTL_JAVA/OnePunchMan/Chap%201/11.jpeg?updatedAt=1762838219554",
  "https://ik.imagekit.io/cuongphung241103/BTL_JAVA/OnePunchMan/Chap%201/12.jpeg?updatedAt=1762838219730",
  "https://ik.imagekit.io/cuongphung241103/BTL_JAVA/OnePunchMan/Chap%201/13.jpeg?updatedAt=1762838219668",
  "https://ik.imagekit.io/cuongphung241103/BTL_JAVA/OnePunchMan/Chap%201/14.jpeg?updatedAt=1762838219478",
  "https://ik.imagekit.io/cuongphung241103/BTL_JAVA/OnePunchMan/Chap%201/15.jpeg?updatedAt=1762838219767",
  "https://ik.imagekit.io/cuongphung241103/BTL_JAVA/OnePunchMan/Chap%201/16.jpeg?updatedAt=1762838219781",
  "https://ik.imagekit.io/cuongphung241103/BTL_JAVA/OnePunchMan/Chap%201/17.jpeg?updatedAt=1762838219769",
  "https://ik.imagekit.io/cuongphung241103/BTL_JAVA/OnePunchMan/Chap%201/18.jpeg?updatedAt=1762838219532",
  "https://ik.imagekit.io/cuongphung241103/BTL_JAVA/OnePunchMan/Chap%201/19.jpeg?updatedAt=1762838219550",
  "https://ik.imagekit.io/cuongphung241103/BTL_JAVA/OnePunchMan/Chap%201/20.jpeg?updatedAt=1762838219540",
];

const imgChapterService = new ImgChapterService();
const chapterService = new ChapterService();

function ChapterReadPage() {
  const { id, chapterId } = useParams();
  const [dataImgChapter, setDataImgChapter] = useState([]);
  const [allChapters, setAllChapter] = useState([]);
  const [showUI, setShowUI] = useState(true);
  const [showChapterList, setShowChapterList] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const containerRef = useRef(null);
  const lastScrollY = useRef(0);

  const scrollToTop = () => {
    console.log("chay ham load");
    containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const fetchImgChapter = async () => {
      const data = await imgChapterService.getImgsByChapterId(chapterId);
      console.log(data);
      setDataImgChapter(data.length !== 0 ? data : pagesData);
    };
    scrollToTop();
    fetchImgChapter();
  }, [chapterId]);

  useEffect(() => {
    const fetchAllChapter = async () => {
      const dataAllChapter = await chapterService.getChaptersByMangaId(id);
      setAllChapter(dataAllChapter);
    };

    fetchAllChapter();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const currentY = container.scrollTop;
      if (currentY > lastScrollY.current + 10) {
        setShowUI(false);
      } else if (currentY < lastScrollY.current - 10) {
        setShowUI(true);
      }
      lastScrollY.current = currentY;
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="quicksand-uniquifier relative h-screen w-screen overflow-hidden bg-gray-200">
      {/* Ảnh truyện */}
      <ChapterPages
        pages={dataImgChapter}
        containerRef={containerRef}
        showUI={showUI}
      />

      {/* Sidebar bình luận - hiện từ bên trái */}
      <CommentSidebar
        isOpen={showComments}
        onClose={() => setShowComments(false)}
      />

      {/* Thanh điều hướng dưới cùng */}
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
          totalChapters={allChapters.length}
          scrollToTop={scrollToTop}
          setShowChapterList={setShowChapterList}
          setShowComments={setShowComments} // truyền xuống đây
        />
      </motion.div>

      {/* Popup danh sách chapter */}
      {showChapterList && (
        <ChapterListPopup
          mangaId={id}
          allChapters={allChapters}
          chapterNumber={chapterId}
          setShowChapterList={setShowChapterList}
        />
      )}
    </div>
  );
}

export default ChapterReadPage;
