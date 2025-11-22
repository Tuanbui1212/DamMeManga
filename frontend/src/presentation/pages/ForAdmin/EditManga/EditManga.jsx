// src/components/edit-manga/EditManga.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import EditMangaHeader from "./EditMangaHeader";
import ImageUploader from "./ImageUploader";
import AuthorDropdown from "./AuthorDropdown";
import GenreMultiSelect from "./GenreMultiSelect";
import DescriptionField from "./DescriptionField";

const mockData = {
  1: {
    id: 1,
    title: "ONE PUNCH MAN (MURATA ART)",
    author: "ONE, Yusuke Murata",
    description: "Saitama là một siêu anh hùng có thể đánh bại bất kỳ đối thủ nào chỉ bằng một cú đấm...",
    tags: ["Seinen", "Action", "Comedy"],
    cover: "https://ik.imagekit.io/cuongphung241103/BTL_JAVA/MangaIMG/OnePunchManIMG.jpg",
    poster: "https://ik.imagekit.io/cuongphung241103/BTL_JAVA/PosterManga/OnePunchManPoster.jpg",
  },
};

const authors = [
  "ONE, Yusuke Murata", "Eiichiro Oda", "Tatsuki Fujimoto", "Koyoharu Gotouge", "Gege Akutami",
];

const genres = [
  "Action", "Adventure", "Comedy", "Drama", "Fantasy", "Horror", "Mystery",
  "Romance", "Sci-Fi", "Seinen", "Shounen", "Slice of Life", "Supernatural",
  "Isekai", "Mecha", "Psychological", "Sports", "Thriller"
];

export default function EditManga() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: "", author: "", description: "", tags: [], cover: "", poster: ""
  });

  useEffect(() => {
    setTimeout(() => {
      const data = mockData[id];
      if (data) {
        setFormData({
          title: data.title,
          author: data.author,
          description: data.description,
          tags: [...data.tags],
          cover: data.cover,
          poster: data.poster,
        });
      }
      setIsLoading(false);
    }, 500);
  }, [id]);

  const uploadImage = async (file) => {
    // Thay bằng API thật (ImgBB, Cloudinary, v.v.)
    await new Promise(r => setTimeout(r, 800));
    toast.success("Upload ảnh thành công!");
    return URL.createObjectURL(file); // mock
  };

  const handleImageChange = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = await uploadImage(file);
    if (url) setFormData(prev => ({ ...prev, [type]: url }));
  };

  const handleSave = () => {
    if (!formData.title.trim() || !formData.author) {
      toast.error("Vui lòng nhập tên truyện và chọn tác giả!");
      return;
    }
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Cập nhật truyện thành công!");
      navigate(`/manga-detail-management/${id}`);
    }, 1200);
  };

  if (isLoading) return <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center text-gray-400 text-xl">Đang tải...</div>;
  if (!formData.title) return <div className="text-red-400 text-center py-20">Không tìm thấy truyện!</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
      <Toaster position="top-right" />

      <EditMangaHeader onBack={() => navigate(-1)} onSave={handleSave} isSaving={isSaving} />

      <div className="max-w-5xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cột ảnh */}
          <ImageUploader
            cover={formData.cover}
            poster={formData.poster}
            onCoverChange={(e) => handleImageChange(e, "cover")}
            onPosterChange={(e) => handleImageChange(e, "poster")}
          />

          {/* Form */}
          <div className="lg:col-span-2 space-y-7">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Tên truyện</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="Nhập tên truyện..."
              />
            </div>

            <AuthorDropdown
              selected={formData.author}
              options={authors}
              onSelect={(author) => setFormData(prev => ({ ...prev, author }))}
            />

            <GenreMultiSelect
              selected={formData.tags}
              options={genres}
              onToggle={(genre) => {
                setFormData(prev => ({
                  ...prev,
                  tags: prev.tags.includes(genre)
                    ? prev.tags.filter(t => t !== genre)
                    : [...prev.tags, genre]
                }));
              }}
            />

            <DescriptionField
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>
        </div>
      </div>
    </div>
  );
}