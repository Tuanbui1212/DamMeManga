import { Link, useParams } from "react-router-dom";
import { Heart } from "lucide-react";

function MangaActions() {
  const { id } = useParams();

  return (
    <div className="flex gap-4 mx-20 mb-5">
      <Link
        to={`/mangas/${id}/chapter/1`}
        className="mt-10 bg-gray-400 hover:bg-gray-600 transition px-5 py-2 rounded-xl text-white font-bold"
      >
        ĐỌC TỪ ĐẦU
      </Link>
      <button className="mt-10 bg-blue-400 hover:bg-blue-600 transition px-5 py-2 rounded-xl text-white font-bold flex items-center gap-1">
        <Heart size={18} /> THEO DÕI TRUYỆN
      </button>
    </div>
  );
}

export default MangaActions;
