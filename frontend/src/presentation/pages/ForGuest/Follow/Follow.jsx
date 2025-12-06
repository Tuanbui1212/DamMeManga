import { useState, useEffect, useMemo, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";

import MangaDetailService from "../../../../usecases/MangaDetailService";
import FollowService from "../../../../usecases/FollowService";

export default function FollowingPage() {
  const [followingMangas, setFollowingMangas] = useState([]);
  const userId = localStorage.getItem("userId");

  // Service chỉ tạo 1 lần
  const mangaService = useMemo(() => new MangaDetailService(), []);
  const followService = useMemo(() => new FollowService(), []);

  // CHỐT CHẶN LỖI GỌI API NHIỀU LẦN
  const didFetchRef = useRef(false);

  const timeAgo = (timestamp) => {
    if (!timestamp) return "Chưa cập nhật";
    const diff = Date.now() - new Date(timestamp).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if (minutes < 60) return `${minutes} phút trước`;
    if (hours < 24) return `${hours} giờ trước`;
    return `${days} ngày trước`;
  };

  useEffect(() => {
    if (!userId) return;

    if (didFetchRef.current) return; 
    didFetchRef.current = true;

    const fetchFollowing = async () => {
      try {
        const follows = await followService.getFollowsByUser(userId);

        const mangas = await Promise.all(
          follows.map(async (f) => {
            const manga = await mangaService.getMangaWithChapters(f.mangaId);

            const lastChapterObj =
              manga.chapters?.[manga.chapters.length - 1] || null;

            return {
              followId: f.id,
              id: manga.id,
              title: manga.name_manga,
              cover: manga.poster_url,
              lastChapter: lastChapterObj ? lastChapterObj.chapterNumber : "0",
              chapterLink: lastChapterObj
                ? `/mangas/${manga.id}/chapters/${lastChapterObj.id}`
                : "#",
              updatedAgo: timeAgo(manga.updated_at),
            };
          })
        );

        setFollowingMangas(mangas);
      } catch (err) {
        toast.error("Lỗi tải danh sách theo dõi!");
      }
    };

    fetchFollowing();
  }, [userId]);

  const handleUnfollow = async (followId, mangaTitle) => {
    try {
      await followService.deleteFollow(followId);
      setFollowingMangas((prev) =>
        prev.filter((m) => m.followId !== followId)
      );
      toast.success(`Đã hủy theo dõi "${mangaTitle}"`);
    } catch (err) {
      toast.error("Lỗi hủy theo dõi!");
    }
  };

  if (!userId)
    return (
      <div className="text-center mt-10">
        Vui lòng đăng nhập để xem danh sách theo dõi.
      </div>
    );

  return (
    <div className="mt-15 min-h-screen bg-gray-50 py-8 lg:py-16">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-xl lg:text-2xl font-bold text-gray-700 uppercase tracking-wider mb-8">
          Đang theo dõi
        </h1>

        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3 xl:gap-5">
          {followingMangas.map((manga) => (
            <div key={manga.followId} className="flex flex-col">
              <div className="relative group">
                <a
                  href={`/mangas/${manga.id}`}
                  className="block rounded-lg shadow hover:shadow-lg transition overflow-hidden"
                >
                  <img
                    src={manga.cover}
                    alt={manga.title}
                    className="w-full h-auto object-cover aspect-[3/4.5]"
                    loading="lazy"
                  />
                </a>

                <button
                  onClick={() =>
                    handleUnfollow(manga.followId, manga.title)
                  }
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition bg-red-700 hover:bg-red-900 text-white border-2 border-white rounded-full w-7 h-7 flex items-center justify-center shadow"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                  </svg>
                </button>
              </div>

              <div className="mt-2">
                <a href={`/mangas/${manga.id}`}>
                  <h3 className="font-bold text-sm text-gray-800 line-clamp-2 hover:text-blue-600">
                    {manga.title}
                  </h3>
                </a>
                <h4 className="text-xs text-gray-700 uppercase tracking-wide mt-1">
                  <a
                    href={manga.chapterLink}
                    className="hover:text-blue-600"
                  >
                    <span className="font-semibold">
                      C. {manga.lastChapter}
                    </span>{" "}
                    - <span>{manga.updatedAgo}</span>
                  </a>
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
