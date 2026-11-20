import React, { useState, useEffect, useRef } from "react";
import { RefreshCw, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";

function LazyMangaImage({ page, index, totalPages, onVisible }) {
  const [status, setStatus] = useState("loading"); // "loading" | "loaded" | "error"
  const [retryCount, setRetryCount] = useState(0);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && onVisible) {
            onVisible(index + 1);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [index, onVisible]);

  const handleRetry = () => {
    setStatus("loading");
    setRetryCount((prev) => prev + 1);
  };

  return (
    <div
      ref={imgRef}
      className="w-full min-h-[400px] flex flex-col items-center justify-center bg-gray-900/50 my-1 relative"
      data-page={index + 1}
    >
      {status === "loading" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/80 text-gray-400 gap-2">
          <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-xs">Đang tải trang {index + 1}/{totalPages}...</span>
        </div>
      )}

      {status === "error" ? (
        <div className="flex flex-col items-center justify-center py-16 px-4 bg-gray-800/80 rounded-lg text-gray-300 gap-3 border border-red-500/30">
          <AlertCircle className="text-red-400" size={32} />
          <p className="text-sm font-medium">Không thể tải trang {index + 1}</p>
          <button
            onClick={handleRetry}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition"
          >
            <RefreshCw size={14} /> Thử lại
          </button>
        </div>
      ) : (
        <img
          key={retryCount}
          src={page.imgLink}
          alt={`Trang ${index + 1}`}
          className={`max-w-full md:max-w-4xl h-auto object-contain rounded shadow-lg select-none transition-opacity duration-300 ${
            status === "loaded" ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
        />
      )}
    </div>
  );
}

export default function ChapterPages({
  pages = [],
  containerRef,
  showUI,
  readingMode = "webtoon", // "webtoon" | "single"
  singlePageIndex = 0,
  setSinglePageIndex,
  setCurrentVisiblePage,
  onNextChapter,
  onPrevChapter,
}) {
  // Preload ảnh kế tiếp trong chế độ Single page hoặc Webtoon
  useEffect(() => {
    if (!pages || pages.length === 0) return;

    const nextIndex = readingMode === "single" ? singlePageIndex + 1 : 1;
    if (nextIndex < pages.length && pages[nextIndex]?.imgLink) {
      const img1 = new Image();
      img1.src = pages[nextIndex].imgLink;
    }
    if (nextIndex + 1 < pages.length && pages[nextIndex + 1]?.imgLink) {
      const img2 = new Image();
      img2.src = pages[nextIndex + 1].imgLink;
    }
  }, [pages, singlePageIndex, readingMode]);

  if (!pages || pages.length === 0) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-950 text-gray-400">
        <p>Chương này chưa có dữ liệu ảnh.</p>
      </div>
    );
  }

  // Chế độ đọc từng trang (Single Page Mode)
  if (readingMode === "single") {
    const currentPage = pages[singlePageIndex] || pages[0];

    return (
      <div
        ref={containerRef}
        className="h-screen w-full bg-gray-950 flex flex-col items-center justify-center relative select-none"
      >
        <div className="relative max-h-screen max-w-full flex items-center justify-center p-2">
          <img
            src={currentPage?.imgLink}
            alt={`Trang ${singlePageIndex + 1}`}
            className="max-h-[90vh] max-w-full object-contain rounded shadow-2xl transition"
          />

          {/* Nút lùi trang */}
          <button
            onClick={() => {
              if (singlePageIndex > 0) {
                setSinglePageIndex(singlePageIndex - 1);
              } else if (onPrevChapter) {
                onPrevChapter();
              }
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/80 text-white rounded-full transition opacity-0 hover:opacity-100 md:opacity-70"
            title="Trang trước (Phím Mũi tên trái / A)"
          >
            <ChevronLeft size={28} />
          </button>

          {/* Nút tiến trang */}
          <button
            onClick={() => {
              if (singlePageIndex < pages.length - 1) {
                setSinglePageIndex(singlePageIndex + 1);
              } else if (onNextChapter) {
                onNextChapter();
              }
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/80 text-white rounded-full transition opacity-0 hover:opacity-100 md:opacity-70"
            title="Trang sau (Phím Mũi tên phải / D)"
          >
            <ChevronRight size={28} />
          </button>
        </div>

        {/* Thanh đếm trang phía dưới */}
        <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white font-mono z-20">
          Trang {singlePageIndex + 1} / {pages.length}
        </div>
      </div>
    );
  }

  // Chế độ đọc cuộn dọc (Webtoon Mode)
  return (
    <div
      ref={containerRef}
      className="h-screen w-full overflow-y-auto overflow-x-hidden bg-gray-950 scrollbar-hide flex flex-col items-center"
      style={{
        paddingTop: showUI ? "1rem" : "0",
        paddingBottom: showUI ? "6rem" : "1rem",
      }}
    >
      <div className="w-full max-w-4xl flex flex-col items-center">
        {pages.map((page, index) => (
          <LazyMangaImage
            key={page.idImgChapter || index}
            page={page}
            index={index}
            totalPages={pages.length}
            onVisible={setCurrentVisiblePage}
          />
        ))}
      </div>
    </div>
  );
}
