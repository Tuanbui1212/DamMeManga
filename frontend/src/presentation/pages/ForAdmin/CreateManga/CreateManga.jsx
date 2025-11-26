// src/pages/AddManga.jsx
import React, { useState } from "react";
import { ArrowLeft, Upload, ChevronDown, Check } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AddManga() {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    tags: [],
    cover: "",
    poster: "",
  });

  // Danh sách mẫu (sau này lấy từ API)
  const authors = [
    "ONE, Yusuke Murata",
    "Eiichiro Oda",
    "Tatsuki Fujimoto",
    "Koyoharu Gotouge",
    "Gege Akutami",
    "Tatsuya Endo",
    "Sui Ishida",
  ];

  const genres = [
    "Action", "Adventure", "Comedy", "Drama", "Fantasy", "Horror", "Mystery",
    "Romance", "Sci-Fi", "Seinen", "Shounen", "Slice of Life", "Supernatural",
    "Isekai", "Mecha", "Psychological", "Sports", "Thriller", "Ecchi", "Harem"
  ];

  // Dropdown
  const [showAuthorDropdown, setShowAuthorDropdown] = useState(false);
  const [showGenreDropdown, setShowGenreDropdown] = useState(false);

  // Upload ảnh qua imgbb (thay YOUR_KEY bằng key thật của bạn)
  const uploadImage = async (file, type) => {
    const form = new FormData();
    form.append("image", file);
    const API_KEY = "YOUR_IMGBB_API_KEY"; // Thay bằng key thật

    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${API_KEY}`, {
        method: "POST",
        body: form,
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`${type === "cover" ? "Ảnh bìa" : "Poster"} uploaded!`);
        return data.data.url;
      }
    } catch (err) {
      toast.error("Lỗi upload ảnh!");
    }
    return null;
  };

  const handleImageChange = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    // Preview ngay lập tức
    const previewUrl = URL.createObjectURL(file);
    setFormData({ ...formData, [type]: previewUrl });

    // Upload thật (nếu muốn lưu luôn)
    const uploadedUrl = await uploadImage(file, type);
    if (uploadedUrl) {
      setFormData({ ...formData, [type]: uploadedUrl });
    }
  };

  const selectAuthor = (author) => {
    setFormData({ ...formData, author });
    setShowAuthorDropdown(false);
  };

  const toggleGenre = (genre) => {
    const newTags = formData.tags.includes(genre)
      ? formData.tags.filter(t => t !== genre)
      : [...formData.tags, genre];
    setFormData({ ...formData, tags: newTags });
  };

  const handleSave = async () => {
    if (!formData.title.trim()) {
      toast.error("Vui lòng nhập tên truyện!");
      return;
    }
    if (!formData.author) {
      toast.error("Vui lòng chọn tác giả!");
      return;
    }

    setIsSaving(true);
    // Giả lập lưu
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Thêm truyện thành công!");
      // navigate("/admin/manga-list"); // Quay về danh sách nếu muốn
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="border-b border-gray-700 p-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition"
          >
            <ArrowLeft size={16} /> Quay lại
          </button>
          <h1 className="text-2xl font-bold">Thêm truyện mới</h1>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-medium transition ${
              isSaving
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {isSaving ? "Đang lưu..." : "Thêm truyện"}
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ảnh bìa & Poster */}
          <div className="space-y-6">
            {/* Ảnh bìa */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Ảnh bìa (khuyến nghị 800x400)
              </label>
              <div className="relative group">
                {formData.cover ? (
                  <img
                    src={formData.cover}
                    alt="Cover"
                    className="w-full h-80 object-cover rounded-xl shadow-lg"
                  />
                ) : (
                  <div className="w-full h-80 bg-gray-800 border-2 border-dashed border-gray-600 rounded-xl flex items-center justify-center">
                    <Upload size={48} className="text-gray-500" />
                  </div>
                )}
                <label className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition rounded-xl cursor-pointer">
                  <Upload size={32} className="text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, "cover")}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Poster */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Poster (khuyến nghị 300x450)
              </label>
              <div className="relative group">
                {formData.poster ? (
                  <img
                    src={formData.poster}
                    alt="Poster"
                    className="w-full h-96 object-cover rounded-xl shadow-lg"
                  />
                ) : (
                  <div className="w-full h-96 bg-gray-800 border-2 border-dashed border-gray-600 rounded-xl flex items-center justify-center">
                    <Upload size={48} className="text-gray-500" />
                  </div>
                )}
                <label className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition rounded-xl cursor-pointer">
                  <Upload size={32} className="text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, "poster")}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Form thông tin */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tên truyện */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Tên truyện *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                placeholder="Nhập tên truyện..."
              />
            </div>

            {/* Tác giả */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Tác giả</label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowAuthorDropdown(!showAuthorDropdown)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-left flex justify-between items-center focus:ring-2 focus:ring-blue-500 transition"
                >
                  <span className={formData.author ? "text-white" : "text-gray-500"}>
                    {formData.author || "Chọn tác giả..."}
                  </span>
                  <ChevronDown size={18} className="text-gray-400" />
                </button>

                {showAuthorDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-xl max-h-60 overflow-y-auto">
                    {authors.map((a) => (
                      <button
                        key={a}
                        type="button"
                        onClick={() => selectAuthor(a)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-700 text-sm flex justify-between items-center transition"
                      >
                        {a}
                        {formData.author === a && <Check size={16} className="text-green-400" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Thể loại */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Thể loại</label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowGenreDropdown(!showGenreDropdown)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-left flex justify-between items-center focus:ring-2 focus:ring-blue-500 transition"
                >
                  <span className={formData.tags.length > 0 ? "text-white" : "text-gray-500"}>
                    {formData.tags.length > 0
                      ? `${formData.tags.length} thể loại đã chọn`
                      : "Chọn thể loại..."}
                  </span>
                  <ChevronDown size={18} className="text-gray-400" />
                </button>

                {showGenreDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-xl max-h-60 overflow-y-auto">
                    {genres.map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => toggleGenre(g)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-700 text-sm flex justify-between items-center transition"
                      >
                        {g}
                        {formData.tags.includes(g) && <Check size={16} className="text-green-400" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Tag hiển thị */}
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 bg-blue-900/60 text-blue-300 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Mô tả */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Mô tả truyện</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={8}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none transition"
                placeholder="Viết mô tả hấp dẫn cho truyện..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}