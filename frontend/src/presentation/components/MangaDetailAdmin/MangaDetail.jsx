// src/components/manga-detail/MangaDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import MangaHeader from "./MangaHeader";
import MangaPoster from "./MangaPoster";
import MangaInfo from "./MangaInfo";
import ChapterList from "./ChapterList";
import StatsCard from "./StatsCard";
import CommentSection from "./CommentSection";
import DeleteConfirmModal from "./DeleteConfirmModal";

const mockData = {
  1: {
    id: 1,
    title: "ONE PUNCH MAN (MURATA ART)",
    author: "ONE, Yusuke Murata",
    description: "Saitama là một siêu anh hùng có thể đánh bại bất kỳ đối thủ nào chỉ bằng một cú đấm...",
    chapters: 30,
    views: 12300,
    cover: "https://ik.imagekit.io/cuongphung241103/BTL_JAVA/MangaIMG/OnePunchManIMG.jpg?updatedAt=1762764056279",
    poster: "https://ik.imagekit.io/cuongphung241103/BTL_JAVA/PosterManga/OnePunchManPoster.jpg?updatedAt=1762702479396",
    genres: ["Seinen"],
    lastUpdate: "4 ngày trước",
    chaptersList: Array.from({ length: 30 }, (_, i) => ({
      id: i + 1,
      number: i + 1,
      title: `Chapter ${i + 1}: One Punch!!`,
      date: `${30 - i} ngày trước`,
    })).reverse(),
    comments: [
      { id: 1, user: "Nguyễn An", text: "Truyện hay cực kỳ luôn!!!", date: "2 ngày trước" },
      { id: 2, user: "Minh Quân", text: "Chờ chap mới hơi lâu", date: "1 ngày trước" },
    ],
  },
};

export default function MangaDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      const data = mockData[id];
      if (data) setStory(data);
      setIsLoading(false);
    }, 500);
  }, [id]);

  const handleDeleteStory = () => {
    toast.success("Xóa truyện thành công!");
    navigate("/manga-management");
  };

  const goToEdit = () => navigate(`/edit-manga/${id}`);
  const goToCreateChapter = () => navigate(`/create-chapter/${id}`);
  const goToChapterDetail = (chapterId) =>
    navigate(`/manga-detail-management/${id}/chapter-detail/${chapterId}`);

  if (isLoading) return <div className="text-center py-20 text-gray-400 text-xl">Đang tải...</div>;
  if (!story) return <div className="text-center py-20 text-red-400 text-xl">Không tìm thấy truyện!</div>;

return (
  <div className="quicksand-uniquifier bg-gray-900 text-gray-200 min-h-screen overflow-y-auto">
    <Toaster position="top-right" />

    {/* HEADER MỚI – ĐÃ CÓ 3 NÚT */}
    <MangaHeader
      onBack={() => navigate("/manga-management")}
      onEdit={goToEdit}
      onDelete={() => setShowDeleteConfirm(true)}
    />

    {/* Phần còn lại giữ nguyên */}
    <div className="mx-auto max-w-6xl my-8">
      <div className="bg-gray-800 relative rounded-xl shadow-2xl overflow-hidden">
        <MangaPoster poster={story.poster} />
        <MangaInfo story={story} />
        
        <div className="mt-50 p-8 pb-16">
          <div className="flex gap-10">
            <ChapterList
              chapters={story.chaptersList}
              onCreateChapter={goToCreateChapter}
              onViewChapter={goToChapterDetail}
            />
            <div className="w-80 space-y-8">
              <StatsCard chapters={story.chapters} views={story.views} />
              <CommentSection comments={story.comments} />
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Modal xóa */}
    <DeleteConfirmModal
      isOpen={showDeleteConfirm}
      onClose={() => setShowDeleteConfirm(false)}
      onConfirm={handleDeleteStory}
    />

    {/* XÓA HOÀN TOÀN DÒNG NÀY KHỎI FILE (không cần fixed button nữa) */}
    {/* <ActionButtons ... /> */}
  </div>
);
}