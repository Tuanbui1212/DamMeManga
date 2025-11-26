// src/App.jsx
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import "../../../../styles/font.css"

const historyData = [
    {
        timeAgo: "4 giờ trước",
        date: new Date(Date.now() - 4 * 60 * 60 * 1000),
        mangaId: "2133",
        title: "Tawawa on Monday - Art every Monday",
        cover: "https://storage-ct.lrclib.net/file/cuutruyen/uploads/manga/2133/cover/processed-9e8474fc6fef36430bf9870ceca44777.jpg",
        chapters: [
            {
                id: "76162",
                number: "562",
                title: "Tuần 562 - 24/11/2025: Siêu sao thể thao mới",
                progress: 100,
                completed: true,
            },
        ],
    },
    {
        timeAgo: "18 giờ trước",
        date: new Date(Date.now() - 18 * 60 * 60 * 1000),
        mangaId: "3922",
        title: "Kashiwada-san không cảm xúc và Oota-kun tràn đầy cảm xúc",
        cover: "https://storage-ct.lrclib.net/file/cuutruyen/uploads/manga/3922/cover/processed-fc2db44cfdf9c13fcf055f208b7669f3.jpg",
        chapters: [
            {
                id: "76134",
                number: "1",
                title: "Một người không cảm xúc và một người tràn đầy cảm xúc",
                progress: 56,
                completed: false,
            },
        ],
    },
    {
        timeAgo: "6 ngày trước",
        date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
        mangaId: "3521",
        title: "Casino Gui",
        cover: "https://storage-ct.lrclib.net/file/cuutruyen/uploads/manga/3521/cover/processed-d63996a425c03e3e9e3ebbc7b06d3466.jpg",
        chapters: [
            { id: "75765", number: "37", title: "Ân nhân", progress: 79, completed: false },
        ],
    },
    {
        timeAgo: "14 ngày trước",
        date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
        mangaId: "1106",
        title: "One-Punch Man (web-comic)",
        cover: "https://storage-ct.lrclib.net/file/cuutruyen/uploads/manga/1106/cover/processed_mobile-f4d47a0595ef867be7d5477affdda536.jpg",
        chapters: [
            { id: "66605", number: "155", title: "", progress: 100, completed: true },
            { id: "74817", number: "156", title: "", progress: 100, completed: true },
        ],
    },
    {
        timeAgo: "17 ngày trước",
        date: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000),
        mangaId: "556",
        title: "Chainsaw Man",
        cover: "https://storage-ct.lrclib.net/file/cuutruyen/uploads/manga/556/cover/processed-484a6ef520e1bd1b51f21f531be342e2.jpg",
        chapters: [
            { id: "75045", number: "219", title: "Những kẻ mất mát", progress: 100, completed: true },
        ],
    },
    {
        timeAgo: "17 ngày trước",
        date: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000),
        mangaId: "708",
        title: "Sự Quyến Rũ Của 2.5D",
        cover: "https://storage-ct.lrclib.net/file/cuutruyen/uploads/manga/708/cover/processed-4b6166ea4c29b9562e7c21bc7fc9527b.jpg",
        chapters: [
            { id: "75097", number: "196", title: "", progress: 100, completed: true },
        ],
    },
];

export default function App() {
    return (
        <div className="mt-15 quicksand-uniquifier min-h-screen bg-gray-50 py-8 lg:py-16">
            <div className="max-w-5xl mx-auto px-4">
                {/* Tiêu đề */}
                <div className="mb-8 lg:mb-12">
                    <h1 className="text-xl lg:text-2xl font-bold text-gray-700 uppercase tracking-wider">
                        Lịch sử đọc truyện
                    </h1>
                </div>

                {/* Timeline */}
                <div className="relative">
                    {historyData.map((item, index) => (
                        <div key={index} className="flex gap-3 md:gap-6 mb-12 last:mb-0">
                            {/* Thời gian (desktop) */}
                            <div className="hidden md:block w-48 text-right text-sm text-gray-600 pr-6 pt-1">
                                {formatDistanceToNow(item.date, { addSuffix: true, locale: vi })}
                            </div>

                            {/* Icon timeline */}
                            <div className="flex flex-col items-center">
                                <div className="w-6 h-6 rounded-full bg-white border-4 border-gray-800 flex items-center justify-center z-10">
                                    <div className="w-3 h-3 rounded-full bg-gray-800"></div>
                                </div>
                                {index < historyData.length - 1 && (
                                    <div className="w-0.5 bg-gray-800 flex-1 mt-2"></div>
                                )}
                            </div>

                            {/* Nội dung chính */}
                            <div className="flex-1 pb-8">
                                {/* Manga info */}
                                <div className="flex gap-3 mb-3">
                                    <a href={`/mangas/${item.mangaId}`} className="shrink-0">
                                        <img
                                            src={item.cover}
                                            alt={item.title}
                                            className="w-16 h-20 object-cover rounded shadow"
                                        />
                                    </a>
                                    <div className="flex-1">
                                        <a
                                            href={`/mangas/${item.mangaId}`}
                                            className="block font-bold text-gray-900 hover:text-blue-600 transition text-base"
                                        >
                                            {item.title}
                                        </a>
                                        <div className="md:hidden text-xs text-gray-600 mt-1">
                                            {formatDistanceToNow(item.date, { addSuffix: true, locale: vi })}
                                        </div>
                                    </div>
                                </div>

                                {/* Danh sách chapter */}
                                <div className="space-y-3">
                                    {item.chapters.map((chap) => (
                                        <a
                                            key={chap.id}
                                            href={`/mangas/${item.mangaId}/chapters/${chap.id}`}
                                            className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-gray-400 transition-shadow"
                                        >
                                            <div className="text-sm text-gray-700 mb-2">
                                                <strong>Chương {chap.number}:</strong>{" "}
                                                {chap.title || "(Không có tiêu đề)"}
                                            </div>
                                            <div className="flex items-center gap-2 max-w-xs">
                                                <span
                                                    className={`text-xs font-medium ${chap.completed ? "text-green-600" : "text-blue-600"
                                                        }`}
                                                >
                                                    {chap.progress}%
                                                </span>
                                                <div className="flex-1 bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className={`h-full rounded-full transition-all ${chap.completed ? "bg-green-600" : "bg-blue-600"
                                                            }`}
                                                        style={{ width: `${chap.progress}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Nút Xem thêm */}
                    <div className="flex gap-3 md:gap-6 mt-8">
                        <div className="hidden md:block w-48"></div>
                        <div className="flex flex-col items-center">
                            <div className="w-6 h-6 rounded-full bg-white border-4 border-gray-800 flex items-center justify-center">
                                <div className="w-3 h-3 rounded-full bg-gray-800"></div>
                            </div>
                        </div>
                        <div className="pt-2">
                            <button className="text-sm font-bold text-gray-700 hover:text-gray-900 transition">
                                Xem thêm...
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}