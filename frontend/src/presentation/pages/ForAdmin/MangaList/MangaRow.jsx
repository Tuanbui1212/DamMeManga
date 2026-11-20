import { memo } from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

function formatDate(dateString) {
  if (!dateString) return "-";
  const d = new Date(dateString);
  return Number.isNaN(d.getTime()) ? "-" : d.toLocaleDateString("vi-VN");
}

function MangaRow({ story, index }) {
  return (
    <tr className="border-b border-gray-800 hover:bg-gray-800/50 transition duration-200">
      <td className="sticky left-0 bg-gray-900/90 py-4 px-5 text-sm text-gray-300 font-medium">
        {index + 1}
      </td>

      <td className="py-4 px-5">
        <div className="flex items-center gap-4">
          <img
            src={story.cover}
            alt={story.title}
            loading="lazy"
            decoding="async"
            className="w-12 h-16 object-cover rounded-md shadow-md border border-gray-700 bg-gray-800"
          />
          <div>
            <p className="font-semibold text-gray-100">{story.title}</p>
            <p className="text-xs text-gray-400 mt-0.5">{String(story.author ?? "")}</p>
          </div>
        </div>
      </td>

      {/* Create At */}
      <td className="py-4 px-5 text-sm text-gray-300">
        {formatDate(story.createdAt)}
      </td>

      {/* Update At */}
      <td className="py-4 px-5 text-sm text-gray-300 text-center">
        {formatDate(story.updatedAt)}
      </td>

      <td className="py-4 px-5 text-center text-gray-200 font-medium">
        {story.chapters}
      </td>

      <td className="py-4 px-5 text-center text-gray-200">
        {(Number(story.views) || 0).toLocaleString("vi-VN")}
      </td>

      <td className="py-4 px-5 text-center">
        {/* Link tự điều hướng; không cần thêm navigate() (trước đây điều hướng 2 lần) */}
        <Link
          to={`/manga-detail-management/${story.id}`}
          className="inline-flex items-center justify-center w-9 h-9 rounded-full hover:bg-blue-600/20 text-blue-400 hover:text-blue-300 transition"
          title="Xem chi tiết"
        >
          <ChevronRight size={18} />
        </Link>
      </td>
    </tr>
  );
}

export default memo(MangaRow);
