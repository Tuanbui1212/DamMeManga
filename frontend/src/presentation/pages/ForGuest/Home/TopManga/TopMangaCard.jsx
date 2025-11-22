// src/presentation/components/TopManga/TopMangaCard.jsx
import { Eye } from "lucide-react";

export default function TopMangaCard({ manga }) {
    return (
        <div className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer">
            <span className="absolute top-3 right-3 z-10 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded-full">
                #{manga.id}
            </span>

            <div className="flex h-40">
                <div className="w-28 flex-shrink-0 overflow-hidden bg-gray-100">
                    <img
                        src={manga.poster}
                        alt={manga.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        style={{ aspectRatio: '200/280' }}
                    />
                </div>

                <div className="flex-1 p-4 flex flex-col justify-center">
                    <h3 className="font-bold text-gray-800 text-sm line-clamp-1 group-hover:text-blue-600 transition-colors">
                        {manga.title}
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-1 mt-0.5">{manga.author}</p>
                    <p className="flex items-center text-xs text-gray-500 mt-2">
                        <Eye size={13} className="mr-1" />
                        {manga.views}
                    </p>
                </div>
            </div>
        </div>
    );
}
