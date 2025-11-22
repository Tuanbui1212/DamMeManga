// src/components/chapter-detail/ChapterDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import ChapterHeader from "./ChapterHeader";
import ChapterForm from "./ChapterForm";
import ImageGrid from "./ImageGrid";
import StatsBox from "./StatsBox";

const IMGBB_API_KEY = "0340594a6f5577fe462eb5783e474022";

const mockChapterData = {
  id: "chap-123",
  number: 31,
  images: [
    "https://i.ibb.co/0jZqY8K/page1.jpg",
    "https://i.ibb.co/3dGbs7v/page2.jpg",
    "https://i.ibb.co/4pDwkZf/page3.jpg",
    "https://i.ibb.co/5xY8v9k/page4.jpg",
  ],
};

export default function ChapterDetail() {
  const { storyId, chapterId } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [chapterNumber, setChapterNumber] = useState("");
  const [images, setImages] = useState([]); // { id, url?, preview?, file?, isNew? }

  useEffect(() => {
    setTimeout(() => {
      setChapterNumber(mockChapterData.number);
      setImages(
        mockChapterData.images.map((url, i) => ({
          id: `existing-${i}`,
          url,
        }))
      );
      setIsLoading(false);
    }, 600);
  }, [chapterId]);

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
      console.error(err);
      return null;
    }
  };

  const handleSave = async () => {
    if (!chapterNumber || images.length === 0) {
      toast.error("Chapter phải có số và ít nhất 1 trang!");
      return;
    }

    const newImages = images.filter(img => img.isNew);
    if (newImages.length === 0) {
      toast.success("Không có thay đổi nào để lưu!");
      return;
    }

    setIsSaving(true);
    setUploading(true);

    const uploadedURLs = [];
    for (const img of newImages) {
      const url = await uploadToImgBB(img.file);
      if (url) uploadedURLs.push(url);
    }

    setUploading(false);

    if (uploadedURLs.length !== newImages.length) {
      toast.error("Một số ảnh mới upload thất bại!");
      setIsSaving(false);
      return;
    }

    // Thay thế ảnh mới bằng URL đã upload
    let urlIndex = 0;
    const finalImages = images.map(img =>
      img.isNew ? { ...img, url: uploadedURLs[urlIndex++], preview: undefined, file: undefined, isNew: false } : img
    );

    console.log("CHAPTER UPDATED:", { storyId, chapterId, chapterNumber, pages: finalImages.map(i => i.url) });
    toast.success("Cập nhật chapter thành công!");
    setImages(finalImages);
    setIsSaving(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center text-gray-400 text-xl">
        Đang tải chapter...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
      <Toaster position="top-right" />

      <ChapterHeader
        chapterNumber={chapterNumber}
        onBack={() => navigate(-1)}
        onSave={handleSave}
        isSaving={isSaving || uploading}
      />

      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-6">
            <ChapterForm
              chapterNumber={chapterNumber}
              setChapterNumber={setChapterNumber}
              onImagesSelect={(files) => {
                const newImgs = files.map(file => ({
                  id: `new-${Date.now()}-${Math.random()}`,
                  preview: URL.createObjectURL(file),
                  file,
                  isNew: true,
                }));
                setImages(prev => [...prev, ...newImgs]);
                toast.success(`Đã thêm ${newImgs.length} trang mới!`);
              }}
            />
            <StatsBox totalPages={images.length} />
          </div>

          <div className="lg:col-span-2">
            <ImageGrid
              images={images}
              onRemove={(id) => {
                setImages(prev => prev.filter(img => img.id !== id));
                toast.success("Đã xóa trang!");
              }}
              onReorder={(newOrder) => {
                setImages(newOrder);
                toast.success("Đã thay đổi thứ tự trang!");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}