import { Eye } from "lucide-react";

export default function MangaCard({ manga, onClick }) {
    const poster = manga.posterUrl || manga.imgPoster || "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400";
    const name = manga.name || manga.nameManga || manga.title || "Truyện";
    const author = manga.authorName || manga.author || "Đang cập nhật";
    const status = manga.status || "Đang tiến hành";
    const views = manga.countView ?? manga.views ?? 0;

    return (
        <div
            onClick={() => onClick && onClick(manga.id || manga.idManga)}
            className="group relative flex flex-col bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden border border-gray-100"
        >
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-200">
                <img
                    src={poster}
                    alt={name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-2 right-2">
                    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full shadow-sm ${
                        status === "Hoàn thành" 
                            ? "bg-green-500/90 text-white" 
                            : "bg-blue-500/90 text-white"
                    }`}>
                        {status}
                    </span>
                </div>
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-2 pt-6 flex items-center justify-between text-white text-xs">
                    <span className="flex items-center gap-1 font-medium">
                        <Eye size={13} />
                        {Number(views).toLocaleString("vi-VN")}
                    </span>
                </div>
            </div>
            <div className="p-3 flex flex-col flex-1 justify-between">
                <div>
                    <h3 className="text-gray-900 font-semibold text-sm line-clamp-1 group-hover:text-blue-600 transition-colors" title={name}>
                        {name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-1">{author}</p>
                </div>
            </div>
        </div>
    );
}
