import { Link, useParams } from "react-router-dom";
import { Heart, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import FollowService from "../../../../usecases/FollowService";
import toast from "react-hot-toast";

function MangaActions() {
  const { id } = useParams();
  const userId = localStorage.getItem("userId");

  const [isFollowed, setIsFollowed] = useState(false);
  const [followId, setFollowId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const followService = new FollowService();

  useEffect(() => {
    if (!userId) return;

    (async () => {
      try {
        const follows = await followService.getFollowsByUser(userId);

        console.log("📌 Follows của user:", follows);
        const record = follows.find((f) => f.mangaId === id);
        console.log("🔍 Record follow cho manga này:", record);

        if (record) {
          setIsFollowed(true);
          setFollowId(record.followId);
        } else {
          setIsFollowed(false);
          setFollowId(null);
        }
      } catch (err) {
        toast.error("Lỗi tải trạng thái theo dõi!");
      }
    })();
  }, [id, userId]);

  const handleFollowToggle = async () => {
    if (!userId) {
      toast.error("Vui lòng đăng nhập để theo dõi truyện!");
      return;
    }

    if (isLoading) return;
    setIsLoading(true);

    try {
      if (isFollowed) {
        if (!followId) {
          toast.error("Không tìm thấy ID theo dõi!");
          return;
        }

        toast.loading("Đang hủy theo dõi...", { id: "follow" });

        await followService.deleteFollow(followId);

        setIsFollowed(false);
        setFollowId(null);

        toast.success("Đã hủy theo dõi truyện!", { id: "follow" });
      } else {
        toast.loading("Đang theo dõi truyện...", { id: "follow" });

        await followService.createFollow(userId, id);

        const follows = await followService.getFollowsByUser(userId);
        const record = follows.find((f) => f.mangaId === id);

        if (record) {
          setIsFollowed(true);
          setFollowId(record.followId);
        }

        toast.success("Đã theo dõi truyện!", { id: "follow" });
      }
    } catch (err) {
      console.error(err);
      toast.error("Lỗi khi thay đổi trạng thái theo dõi!", { id: "follow" });
    } finally {
      setIsLoading(false);
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
        disabled={isLoading}
        className={`mt-10 px-5 py-2 rounded-xl text-white font-bold flex items-center gap-2 transition
          ${isFollowed ? "bg-red-400 hover:bg-red-600" : "bg-blue-400 hover:bg-blue-600"}
          ${isLoading ? "opacity-60 cursor-not-allowed" : ""}
        `}
      >
        {isLoading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            ĐANG XỬ LÝ
          </>
        ) : (
          <>
            <Heart size={18} />
            {isFollowed ? "ĐÃ THEO DÕI" : "THEO DÕI TRUYỆN"}
          </>
        )}
      </button>
    </div>
  );
}

export default MangaActions;
