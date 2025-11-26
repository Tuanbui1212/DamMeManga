// src/components/create-chapter/CreateChapter.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import ChapterHeader from "./ChapterHeader";
import ChapterForm from "./ChapterForm";
import ImageGrid from "./ImageGrid";
import StatsBox from "./StatsBox";

const IMGBB_API_KEY = "0340594a6f5577fe462eb5783e474022";

export default function CreateChapter() {
  const { storyId } = useParams();
  const navigate = useNavigate();

  const [chapterNumber, setChapterNumber] = useState("");
  const [images, setImages] = useState([]); // { id, preview, file }
  const [isSaving, setIsSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Mock: tự động điền chapter tiếp theo
  useEffect(() => {
    setChapterNumber(31);
  }, []);

  const uploadToImgBB = async (file) => {
    const form = new FormData();
    form.append("image", file);

    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: "POST",
        body: form,
      });
      const data = await res.json();
      return data.success ? data.data.url : null;
    } catch (err) {
      console.error("Upload error:", err);
      return null;
    }
  };

  const handleSave = async () => {
    if (!chapterNumber || images.length === 0) {
      toast.error("Vui lòng nhập số chapter và thêm ít nhất 1 ảnh!");
      return;
    }

    setIsSaving(true);
    setUploading(true);

    const uploadedURLs = [];
    for (const img of images) {
      const url = await uploadToImgBB(img.file);
      if (url) uploadedURLs.push(url);
    }

    setUploading(false);

    if (uploadedURLs.length !== images.length) {
      toast.error("Một số ảnh không thể upload!");
      setIsSaving(false);
      return;
    }

    console.log("Chapter saved:", { storyId, chapterNumber, pages: uploadedURLs });
    toast.success("Thêm chapter thành công!");
    setIsSaving(false);

    navigate(`/admin/manga-detail-management/${storyId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
      <Toaster position="top-right" />

      <ChapterHeader
        onBack={() => navigate(-1)}
        onSave={handleSave}
        isSaving={isSaving || uploading}
      />

      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Form + Stats */}
          <div className="space-y-6">
            <ChapterForm
              chapterNumber={chapterNumber}
              setChapterNumber={setChapterNumber}
              onImagesSelect={(files) => {
                const newImgs = files.map(file => ({
                  id: Date.now() + Math.random(),
                  preview: URL.createObjectURL(file),
                  file,
                }));
                setImages(prev => [...prev, ...newImgs]);
                toast.success(`Đã thêm ${newImgs.length} ảnh!`);
              }}
            />
            <StatsBox totalPages={images.length} />
          </div>

          {/* Right: Preview Grid */}
          <div className="lg:col-span-2">
            <ImageGrid
              images={images}
              onRemove={(id) => {
                setImages(prev => prev.filter(img => img.id !== id));
                toast.success("Đã xóa ảnh!");
              }}
              onReorder={(newOrder) => setImages(newOrder)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}