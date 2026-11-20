import { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import MangaPoster from "./MangaPoster.jsx";
import MangaInfo from "./MangaInfo.jsx";
import MangaActions from "./MangaActions.jsx";
import MangaChapters from "./MangaChapters.jsx";
import MangaStats from "./MangaStats.jsx";
import { Helmet } from "react-helmet-async";

import MangaCategoryService from "../../../../usecases/MangaCategoryService";
import MangaDetailService from "../../../../usecases/MangaDetailService.js";
import toast from "react-hot-toast";

// Khởi tạo service 1 lần cho cả module (không tạo lại mỗi lần render)
const service = new MangaDetailService();
const mangaCategoryService = new MangaCategoryService();

function timeAgo(dateString) {
  if (!dateString) return "Đang cập nhật";
  const now = new Date();
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "Đang cập nhật";

  date.setHours(date.getHours() + 7);

  const diff = (now - date) / 1000;

  if (diff < 60) return "vừa xong";
  if (diff < 3600) return Math.floor(diff / 60) + " phút trước";
  if (diff < 86400) return Math.floor(diff / 3600) + " giờ trước";
  if (diff < 2592000) return Math.floor(diff / 86400) + " ngày trước";
  if (diff < 31536000) return Math.floor(diff / 2592000) + " tháng trước";
  return Math.floor(diff / 31536000) + " năm trước";
}

function DetailSkeleton() {
  return (
    <div className="quicksand-uniquifier">
      <div className="min-h-screen bg-gray-300 py-20">
        <div className="mx-40 bg-white rounded-xl overflow-hidden animate-pulse">
          <div className="h-160 bg-gray-200" />
          <div className="p-10 space-y-4">
            <div className="h-8 w-1/3 bg-gray-200 rounded" />
            <div className="h-4 w-1/4 bg-gray-200 rounded" />
            <div className="h-24 w-full bg-gray-100 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

function MangaDetailPage() {
  const { id } = useParams();
  const [manga, setManga] = useState(null);
  const [genres, setGenres] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | notfound | error
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    window.scrollTo({ top: 0 });
    setStatus("loading");

    // Gọi song song 2 API (trước đây gọi tuần tự => chậm gấp đôi)
    Promise.allSettled([
      service.getMangaWithChapters(id),
      mangaCategoryService.getCategoriesByManga(id),
    ]).then(([mangaRes, categoryRes]) => {
      if (cancelled) return;

      if (mangaRes.status === "rejected" || !mangaRes.value) {
        const httpStatus = mangaRes.reason?.response?.status;
        console.error("Lỗi tải manga:", mangaRes.reason);
        if (httpStatus === 404 || (mangaRes.status === "fulfilled" && !mangaRes.value)) {
          setStatus("notfound");
        } else {
          setStatus("error");
          toast.error("Lỗi tải dữ liệu manga!");
        }
        return;
      }

      setManga(mangaRes.value);
      setGenres(
        categoryRes.status === "fulfilled" && Array.isArray(categoryRes.value)
          ? categoryRes.value
          : []
      );
      setStatus("ready");
    });

    return () => {
      cancelled = true;
    };
  }, [id, reloadKey]);

  const mangaInfo = useMemo(() => {
    if (!manga) return null;
    return {
      title: manga.name_manga || "Không rõ tên",
      authors: manga.author_id || "Đang cập nhật",
      posterUrl: manga.banner_url,
      mainImageUrl: manga.poster_url,
      description: manga.description || "Không có mô tả.",
      lastUpdate: timeAgo(manga.updated_at),
    };
  }, [manga]);

  // Chương mới nhất lên đầu
  const chapters = useMemo(
    () =>
      [...(manga?.chapters || [])].sort(
        (a, b) => Number(b.chapterNumber) - Number(a.chapterNumber)
      ),
    [manga]
  );

  // Chương đầu tiên lấy luôn từ danh sách => không cần gọi thêm API
  const firstChapterId = chapters.length ? chapters[chapters.length - 1].idChapter : null;

  const statsData = useMemo(
    () => ({ chaptersCount: chapters.length, views: manga?.count_view || 0 }),
    [chapters.length, manga]
  );

  if (status === "loading") return <DetailSkeleton />;

  if (status === "notfound" || status === "error" || !mangaInfo) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-100 text-gray-700 pt-20">
        <p className="text-xl font-semibold">
          {status === "notfound" ? "Không tìm thấy truyện!" : "Không thể tải dữ liệu truyện."}
        </p>
        <div className="flex gap-3">
          {status === "error" && (
            <button
              onClick={() => setReloadKey((k) => k + 1)}
              className="px-5 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold"
            >
              Thử lại
            </button>
          )}
          <Link
            to="/"
            className="px-5 py-2 rounded-lg bg-gray-700 hover:bg-gray-800 text-white font-semibold"
          >
            Về trang chủ
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{mangaInfo.title}</title>
      </Helmet>

      <div className="quicksand-uniquifier">
        <div className="h-500 bg-gray-300 relative inset-0">
          <div className="mx-40 bg-white absolute inset-0 rounded-xl my-20 overflow-hidden">
            <div className="flex flex-col">
              <MangaPoster posterUrl={mangaInfo.posterUrl} />
              <MangaInfo info={mangaInfo} genres={genres} />
              <MangaActions firstChapterId={firstChapterId} />
              <div className="flex justify-between mx-5 my-10 gap-10">
                <MangaChapters idManga={id} chapters={chapters} />
                <div className="w-1/3">
                  <MangaStats stats={statsData} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MangaDetailPage;
