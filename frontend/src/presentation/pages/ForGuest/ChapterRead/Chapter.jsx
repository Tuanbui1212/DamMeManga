import ChapterPages from "./ChapterPages";
import ChapterNavigation from "./ChapterNavigation";
import ChapterListPopup from "./ChapterListPopup";
import CommentSidebar from "./CommentSidebar";        // Thêm cái này
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

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

const allChapters = Array.from({ length: 20 }, (_, i) => `Chap ${i + 1}`);
const chapterNumber = 1;

function ChapterReadPage() {
  const [showUI, setShowUI] = useState(true);
  const [showChapterList, setShowChapterList] = useState(false);
  const [showComments, setShowComments] = useState(false);   // Đưa vào đúng chỗ đây nè!

  const containerRef = useRef(null);
  const lastScrollY = useRef(0);

  const scrollToTop = () => {
    containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Ẩn/hiện thanh điều hướng khi cuộn
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
      <ChapterPages pages={pagesData} containerRef={containerRef} showUI={showUI} />

      {/* Sidebar bình luận - hiện từ bên trái */}
      <CommentSidebar isOpen={showComments} onClose={() => setShowComments(false)} />

      {/* Thanh điều hướng dưới cùng */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: showUI ? 0 : 100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="absolute bottom-0 w-full"
      >
        <ChapterNavigation
          mangaId="one-punch-man"                 // bạn thay bằng id thật sau
          chapterNumber={chapterNumber}
          totalChapters={allChapters.length}
          scrollToTop={scrollToTop}
          setShowChapterList={setShowChapterList}
          setShowComments={setShowComments}       // truyền xuống đây
        />
      </motion.div>

      {/* Popup danh sách chapter */}
      {showChapterList && (
        <ChapterListPopup
          allChapters={allChapters}
          chapterNumber={chapterNumber}
          setShowChapterList={setShowChapterList}
        />
      )}
    </div>
  );
}

export default ChapterReadPage;