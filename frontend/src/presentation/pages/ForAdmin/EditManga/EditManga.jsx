// src/components/edit-manga/EditManga.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import EditMangaHeader from "./EditMangaHeader";
import ImageUploader from "./ImageUploader";
import AuthorDropdown from "./AuthorDropdown";
import CategoryMultiSelect from "./CategoryMultiSelect";
import DescriptionField from "./DescriptionField";

import MangaService from "../../../../usecases/MangaService";
import AuthorService from "../../../../usecases/AuthorService";
import CategoryService from "../../../../usecases/CategoryService";
import MangaCategoryService from "../../../../usecases/MangaCategoryService";

export default function EditManga() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    tags: [],
    cover: "",
    poster: "",
  });

  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const mangaService = new MangaService();
        const authorService = new AuthorService();
        const categoryService = new CategoryService();
        const mangaCategoryService = new MangaCategoryService();

        // Load manga
        const mangaData = await mangaService.getMangaById(id);
        if (mangaData) {
          setFormData({
            title: mangaData.name,
            author: mangaData.authorName,
            description: mangaData.description,
            tags: [],
            cover: mangaData.bannerUrl,
            poster: mangaData.posterUrl,
          });
        }

        // Load authors
        const authorList = await authorService.getAllAuthors();
        setAuthors(authorList.map(a => a.nameAuthor));

        // Load all categories
        const categoryList = await categoryService.getAllCategories();
        setCategories(categoryList);

        // Load categories của manga
        const mangaCategories = await mangaCategoryService.getCategoriesByManga(id);
        setFormData(prev => ({
          ...prev,
          tags: mangaCategories.map(c => c.nameCategory),
        }));

      } catch (err) {
        console.error("Lỗi load dữ liệu:", err);
        toast.error("Lỗi khi load dữ liệu!");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // -------------------------
  // UPLOAD ẢNH
  // -------------------------
  const uploadImage = async (file) => {
    await new Promise(r => setTimeout(r, 800));
    toast.success("Upload ảnh thành công!");
    return URL.createObjectURL(file);
  };

  const handleImageChange = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = await uploadImage(file);
    if (url) setFormData(prev => ({ ...prev, [type]: url }));
  };

  // -------------------------
  // SAVE
  // -------------------------
  const handleSave = async () => {
    if (!formData.title.trim() || !formData.author) {
      toast.error("Vui lòng nhập tên truyện và chọn tác giả!");
      return;
    }

    setIsSaving(true);

    try {
      const mangaService = new MangaService();
      const mangaCategoryService = new MangaCategoryService();

      // Cập nhật info manga
      const payload = {
        name: formData.title,
        authorName: formData.author,
        description: formData.description,
        bannerUrl: formData.cover,
        posterUrl: formData.poster,
        countView: 0,
      };
      await mangaService.updateManga(id, payload);

      // Đồng bộ category
      const uniqueTags = [...new Set(formData.tags)];

      const categoryIds = uniqueTags
        .map(tagName => {
          const obj = categories.find(c => c.nameCategory === tagName);
          return obj?.id;
        })
        .filter(Boolean);

      await mangaCategoryService.updateCategoriesToManga(id, categoryIds);

      toast.success("Cập nhật truyện thành công!");
      navigate(`/manga-detail-management/${id}`);

    } catch (err) {
      console.error(err);
      toast.error("Lỗi khi cập nhật truyện!");
    } finally {
      setIsSaving(false);
    }
  };

  // -------------------------
  // UI
  // -------------------------
  if (isLoading)
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-gray-400 text-xl">
        Đang tải...
      </div>
    );

  if (!formData.title)
    return <div className="text-red-400 text-center py-20">Không tìm thấy truyện!</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
      <Toaster position="top-right" />

      <EditMangaHeader
        onBack={() => navigate(-1)}
        onSave={handleSave}
        isSaving={isSaving}
      />

      <div className="max-w-5xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <ImageUploader
            cover={formData.cover}
            poster={formData.poster}
            onCoverChange={(e) => handleImageChange(e, "cover")}
            onPosterChange={(e) => handleImageChange(e, "poster")}
          />

          <div className="lg:col-span-2 space-y-7">

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tên truyện
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg"
                placeholder="Nhập tên truyện..."
              />
            </div>

            <AuthorDropdown
              selected={formData.author}
              options={authors}
              onSelect={(author) => setFormData(prev => ({ ...prev, author }))}
            />

            <CategoryMultiSelect
              selected={formData.tags}
              categories={categories}
              onToggle={(categoryName) =>
                setFormData(prev => ({
                  ...prev,
                  tags: prev.tags.includes(categoryName)
                    ? prev.tags.filter(t => t !== categoryName)
                    : [...prev.tags, categoryName],
                }))
              }
            />

            <DescriptionField
              value={formData.description}
              onChange={(e) =>
                setFormData(prev => ({ ...prev, description: e.target.value }))
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
