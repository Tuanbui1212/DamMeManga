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
import MangaService from "../../../../usecases/MangaService";
import MangaCategoryService from "../../../../usecases/MangaCategoryService";

export default function MangaDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mangaService = new MangaService();
        const mangaData = await mangaService.getMangaById(id);

        if (!mangaData) {
          setStory(null);
          return;
        }

        // Lấy genres trực tiếp theo idManga
        const categoryService = new MangaCategoryService();
        const mangaCategories = await categoryService.getCategoriesByManga(id);
        const genres = mangaCategories.map(mc => mc.nameCategory);

        const mapped = {
          id: mangaData.id,
          title: mangaData.name,
          author: mangaData.authorName,
          description: mangaData.description,
          chapters: mangaData.countView,
          views: mangaData.countView * 100,
          cover: mangaData.bannerUrl,
          poster: mangaData.posterUrl,
          genres: genres.length > 0 ? genres : ["Updating..."],
          lastUpdate: "Updating...",
          chaptersList: [],
          comments: [],
        };

        setStory(mapped);
      } catch (e) {
        console.error("Lỗi load manga:", e);
        setStory(null);
      } finally {
        setIsLoading(false);
      }
    };


    fetchData();
  }, [id]);

  const handleDeleteStory = () => {
    toast.success("Xóa truyện thành công!");
    navigate("/manga-management");
  };

  const goToEdit = () => navigate(`/edit-manga/${id}`);
  const goToCreateChapter = () => navigate(`/create-chapter/${id}`);
  const goToChapterDetail = (chapterId) =>
    navigate(`/manga-detail-management/${id}/chapter-detail/${chapterId}`);

  if (isLoading)
    return (
      <div className="text-center py-20 text-gray-400 text-xl">
        Đang tải...
      </div>
    );

  if (!story)
    return (
      <div className="text-center py-20 text-red-400 text-xl">
        Không tìm thấy truyện!
      </div>
    );

  return (
    <div className="quicksand-uniquifier bg-gray-900 text-gray-200 min-h-screen overflow-y-auto">
      <Toaster position="top-right" />

      <MangaHeader
        onBack={() => navigate("/manga-management")}
        onEdit={goToEdit}
        onDelete={() => setShowDeleteConfirm(true)}
      />

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

      <DeleteConfirmModal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDeleteStory}
      />
    </div>
  );
}
