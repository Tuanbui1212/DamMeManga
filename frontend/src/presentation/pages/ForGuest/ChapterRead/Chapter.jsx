import { useState, useRef } from "react";
import ChapterHeader from "./ChapterHeader";
import ChapterPages from "./ChapterPages";
import ChapterNavigation from "./ChapterNavigation";
import ChapterListPopup from "./ChapterListPopup";
// import { Helmet } from "react-helmet-async";

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
const prevChapter = "#";
const nextChapter = "#";

function ChapterReadPage() {
  const [showUI, setShowUI] = useState(true);
  const [showChapterList, setShowChapterList] = useState(false);
  const containerRef = useRef(null);

  const scrollToTop = () => {
    containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleUI = () => setShowUI((prev) => !prev);

  return (
    <>
      {/* <Helmet>
        <title>Chapter {chapterNumber} | DMManga</title>
      </Helmet> */}
      <div className="quicksand-uniquifier relative h-screen w-screen overflow-hidden bg-gray-200">
        <ChapterHeader showUI={showUI} toggleUI={toggleUI} />
        <ChapterPages pages={pagesData} containerRef={containerRef} showUI={showUI} />
        {showUI && (
          <ChapterNavigation
            prevChapter={prevChapter}
            nextChapter={nextChapter}
            chapterNumber={chapterNumber}
            scrollToTop={scrollToTop}
            setShowChapterList={setShowChapterList}
          />
        )}
        {showChapterList && (
          <ChapterListPopup
            allChapters={allChapters}
            chapterNumber={chapterNumber}
            setShowChapterList={setShowChapterList}
          />
        )}
      </div>
    </>
  );
}

export default ChapterReadPage;
