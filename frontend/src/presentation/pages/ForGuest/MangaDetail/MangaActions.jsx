import { Link, useParams } from "react-router-dom";
import { Heart } from "lucide-react";
import { useState, useEffect } from "react";
import FollowService from "../../../../usecases/FollowService";
import toast from "react-hot-toast";

function MangaActions() {
  const { id } = useParams();
  const userId = localStorage.getItem("userId");
  const [isFollowed, setIsFollowed] = useState(false);

  const followService = new FollowService();

  useEffect(() => {
    if (!userId) return;
    (async () => {
      try {
        const follows = await followService.getFollowsByUser(userId);
        setIsFollowed(follows.some((f) => f.mangaId === id));
      } catch (err) {
        toast.error("Lỗi tải trạng thái theo dõi!");
      }
    })();
  }, [id, userId]);

  const handleFollowToggle = async () => {
    if (!userId) return toast.error("Vui lòng đăng nhập để theo dõi truyện!");
    try {
      if (isFollowed) {
        const follows = await followService.getFollowsByUser(userId);
        const record = follows.find((f) => f.mangaId === id);
        if (record) {
          await followService.deleteFollow(record.id);
          setIsFollowed(false);
          toast.success("Đã hủy theo dõi truyện!");
        }
      } else {
        await followService.createFollow(userId, id);
        setIsFollowed(true);
        toast.success("Đã theo dõi truyện!");
      }
    } catch (err) {
      toast.error("Lỗi khi thay đổi trạng thái theo dõi!");
    }
  };

  return (
    <div className="flex gap-4 mx-20 mb-5">
      <Link
        to={`/mangas/${id}/chapter/1`}
        className="mt-10 bg-gray-400 hover:bg-gray-600 transition px-5 py-2 rounded-xl text-white font-bold"
      >
        ĐỌC TỪ ĐẦU
      </Link>
      <button
        onClick={handleFollowToggle}
        className={`mt-10 px-5 py-2 rounded-xl text-white font-bold flex items-center gap-1 transition ${
          isFollowed ? "bg-red-400 hover:bg-red-600" : "bg-blue-400 hover:bg-blue-600"
        }`}
      >
        <Heart size={18} /> {isFollowed ? "ĐÃ THEO DÕI" : "THEO DÕI TRUYỆN"}
      </button>
    </div>
  );
}

export default MangaActions;
