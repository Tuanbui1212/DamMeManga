import { useState, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const followingData = [
  {
    id: "708",
    title: "Sự Quyến Rũ Của 2.5D",
    cover: "https://storage-ct.lrclib.net/file/cuutruyen/uploads/manga/708/cover/processed-4b6166ea4c29b9562e7c21bc7fc9527b.jpg",
    mobileCover: "https://storage-ct.lrclib.net/file/cuutruyen/uploads/manga/708/cover/processed_mobile-5ad4cb9b208b1e1fa4347d8ca9b39635.jpg",
    latestChapter: "197",
    chapterLink: "/mangas/708/chapters/76204",
    updatedAgo: new Date(Date.now() - 44 * 60 * 1000),
  },
  {
    id: "3894",
    title: "DORAEMON",
    cover: "https://storage-ct.lrclib.net/file/cuutruyen/uploads/manga/3894/cover/processed-f619bc249b26c277d8a85e3c13b9d590.jpg",
    mobileCover: "https://storage-ct.lrclib.net/file/cuutruyen/uploads/manga/3894/cover/processed_mobile-e4e256e55f8ca21238b66f3557e320be.jpg",
    latestChapter: "0019",
    chapterLink: "/mangas/3894/chapters/76203",
    updatedAgo: new Date(Date.now() - 60 * 60 * 1000),
  },
  {
    id: "2102",
    title: "Địa Phủ Tokyo",
    cover: "https://storage-ct.lrclib.net/file/cuutruyen/uploads/manga/2102/cover/processed-dba199b11779b369a36e7520fd067dad.jpg",
    latestChapter: "15",
    chapterLink: "/mangas/2102/chapters/76199",
    updatedAgo: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: "2875",
    title: "The Fable - Bí mật thứ ba",
    cover: "https://storage-ct.lrclib.net/file/cuutruyen/uploads/manga/2875/cover/processed-ec450740414eb6f78b0f8aac99205ad1.jpg",
    latestChapter: "28",
    chapterLink: "/mangas/2875/chapters/76179",
    updatedAgo: new Date(Date.now() - 16 * 60 * 60 * 1000),
  },
  {
    id: "3442",
    title: "Bakuchi Gui",
    cover: "https://storage-ct.lrclib.net/file/cuutruyen/uploads/manga/3442/cover/processed-216b419e5d9af815f49e4a3d16ce1ed5.jpg",
    latestChapter: "46",
    chapterLink: "/mangas/3442/chapters/76177",
    updatedAgo: new Date(Date.now() - 17 * 60 * 60 * 1000),
  },
  {
    id: "3919",
    title: "Tenpuru",
    cover: "https://storage-ct.lrclib.net/file/cuutruyen/uploads/manga/3919/cover/processed-aa53803306134cdd13aa6213a16305a3.jpg",
    latestChapter: "124",
    chapterLink: "/mangas/3919/chapters/76176",
    updatedAgo: new Date(Date.now() - 17 * 60 * 60 * 1000),
  },
  {
    id: "1160",
    title: "Grand Blue",
    cover: "https://storage-ct.lrclib.net/file/cuutruyen/uploads/manga/1160/cover/processed-227e36a9f73bff935660280f09ab6e57.jpg",
    latestChapter: "106",
    chapterLink: "/mangas/1160/chapters/75964",
    updatedAgo: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
  },
  {
    id: "1288",
    title: "One-Punch Man (xếp đúng thứ tự chapter)",
    cover: "https://storage-ct.lrclib.net/file/cuutruyen/uploads/manga/1288/cover/processed-5921c6a53454ea2288cc076706b9d3e8.jpg",
    latestChapter: "264",
    chapterLink: "/mangas/1288/chapters/75851",
    updatedAgo: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
  {
    id: "152",
    title: "Spy x Family (FULL HD)",
    cover: "https://storage-ct.lrclib.net/file/cuutruyen/uploads/manga/152/cover/processed-f7d09a1d2f13b6eb0677d9b811bf10df.jpg",
    latestChapter: "124",
    chapterLink: "/mangas/152/chapters/75472",
    updatedAgo: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
  },
  {
    id: "1106",
    title: "One-Punch Man (web-comic)",
    cover: "https://storage-ct.lrclib.net/file/cuutruyen/uploads/manga/1106/cover/processed-0a5b2ead13a8186f4ae75739fe8b5a47.jpg",
    latestChapter: "156",
    chapterLink: "/mangas/1106/chapters/74817",
    updatedAgo: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
  },
];

export default function FollowingPage() {
  const [followingMangas, setFollowingMangas] = useState([]);
  const userId = localStorage.getItem("userId");

  const mangaService = useMemo(() => new MangaDetailService(), []);
  const followService = useMemo(() => new FollowService(), []);

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
            const manga = await mangaService.getMangaWithChapters(
              f.mangaId
            );

            const lastChapterObj =
              manga.chapters?.[manga.chapters.length - 1] || null;

            return {
              followId: f.id,
              id: manga.id_manga, // ✨ SỬA Ở ĐÂY
              title: manga.name_manga,
              cover: manga.poster_url,
              lastChapter: lastChapterObj
                ? lastChapterObj.chapterNumber
                : "0",
              chapterLink: lastChapterObj
                ? `/mangas/${manga.id_manga}/chapters/${lastChapterObj.id}`
                : "#", // ✨ SỬA Ở ĐÂY
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
      <div className="max-w-7xl mx-auto px-4">
        {/* Tiêu đề */}
        <div className="mb-8 lg:mb-12">
          <h1 className="text-xl lg:text-2xl font-bold text-gray-700 uppercase tracking-wider">
            Đang theo dõi
          </h1>
        </div>

        {/* Grid danh sách truyện */}
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3 xl:gap-5">
          {followingData.map((manga) => (
            <div key={manga.id} className="flex flex-col">
              <div className="relative group">
                <Link
                  to={`/mangas/${manga.id}`}
                  className="block rounded-lg shadow hover:shadow-lg transition overflow-hidden"
                >
                  <img
                    src={manga.cover}
                    srcSet={`${manga.mobileCover || manga.cover} 128w, ${manga.cover} 224w`}
                    sizes="(max-width: 640px) 128px, 224px"
                    alt={manga.title}
                    className="w-full h-auto object-cover aspect-[3/4.5]"
                    loading="lazy"
                  />
                </Link>

                {/* Nút xóa (thùng rác đỏ) */}
                <button className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-red-700 hover:bg-red-900 text-white border-2 border-white rounded-full w-7 h-7 lg:w-8 lg:h-8 flex items-center justify-center shadow-lg">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                  </svg>
                </button>
              </div>

              {/* Tên truyện + chapter mới nhất */}
              <div className="mt-2">
                <Link to={`/mangas/${manga.id}`}>
                  <h3 className="font-bold text-sm text-gray-800 line-clamp-2 hover:text-blue-600">
                    {manga.title}
                  </h3>
                </Link>

                <h4 className="text-xs text-gray-700 uppercase tracking-wide mt-1">
                  <Link
                    to={manga.chapterLink}
                    className="hover:text-blue-600"
                  >
                    <span className="font-semibold">
                      C. {manga.lastChapter}
                    </span>{" "}
                    - <span>{manga.updatedAgo}</span>
                  </Link>
                </h4>
              </div>
            </div>
          ))}
        </div>

        {/* Phân trang (hiện tại disabled như trang gốc) */}
        <div className="flex justify-center my-12 gap-4">
          <button className="flex items-center px-6 py-2 bg-gray-300 text-gray-500 rounded cursor-not-allowed">
            <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
            </svg>
            Trang trước
          </button>
          <button className="flex items-center px-6 py-2 bg-gray-300 text-gray-500 rounded cursor-not-allowed">
            Trang sau
            <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}