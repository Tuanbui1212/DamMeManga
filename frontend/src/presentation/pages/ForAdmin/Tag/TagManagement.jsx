// src/components/tag-management/TagManagement.jsx
import React, { useState, useMemo, useEffect } from "react";
import SearchAndAddBar from "./SearchAndAddBar";
import TagStats from "./TagStats";
import TagTable from "./TagTable";
import TagModal from "./TagModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import ToastNotification from "./ToastNotification";
import Pagination from "./Pagination";

const initialGenres = [
  { id: 1, name: "Shounen", description: "Hành động, phiêu lưu cho thanh thiếu niên nam." },
  { id: 2, name: "Seinen", description: "Nội dung trưởng thành, sâu sắc, dành cho người lớn." },
  { id: 3, name: "Romance", description: "Tình yêu, lãng mạn, cảm xúc nhẹ nhàng." },
  { id: 4, name: "Comedy", description: "Hài hước, vui nhộn, giải trí." },
  { id: 5, name: "Fantasy", description: "Thế giới phép thuật, quái vật, anh hùng." },
  { id: 6, name: "Isekai", description: "Nhân vật chính chuyển sinh sang thế giới khác." },
  { id: 7, name: "Slice of Life", description: "Cuộc sống thường ngày, nhẹ nhàng, chân thực." },
  { id: 8, name: "Horror", description: "Kinh dị, ma quỷ, ám ảnh tâm lý." },
  { id: 9, name: "Mystery", description: "Bí ẩn, điều tra, phá án." },
  { id: 10, name: "Sci-Fi", description: "Khoa học viễn tưởng, công nghệ, tương lai." },
  { id: 11, name: "Mecha", description: "Robot khổng lồ, chiến đấu không gian." },
  { id: 12, name: "Sports", description: "Thể thao, thi đấu, tinh thần đồng đội." },
  { id: 13, name: "Drama", description: "Cảm xúc mạnh, bi kịch, xung đột nội tâm." },
  { id: 14, name: "Adventure", description: "Khám phá, hành trình, thử thách." },
];

const ITEMS_PER_PAGE = 9;

export default function TagManagement() {
  const [query, setQuery] = useState("");
  const [genres, setGenres] = useState(initialGenres);
  const [currentPage, setCurrentPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [deleteId, setDeleteId] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  // Lọc & phân trang
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return genres;
    return genres.filter(g =>
      g.name.toLowerCase().includes(q) ||
      (g.description || "").toLowerCase().includes(q)
    );
  }, [query, genres]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, currentPage]);

  useEffect(() => setCurrentPage(1), [query]);

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
  };

  const openAdd = () => {
    setModalMode("add");
    setSelected({ name: "", description: "" });
    setIsModalOpen(true);
  };

  const openEdit = (genre) => {
    setModalMode("edit");
    setSelected({ ...genre });
    setIsModalOpen(true);
  };

  const saveGenre = () => {
    if (modalMode === "add") {
      const newId = Math.max(0, ...genres.map(g => g.id)) + 1;
      setGenres(prev => [{ id: newId, ...selected }, ...prev]);
      showToast("Thêm thể loại thành công!", "success");
    } else {
      setGenres(prev => prev.map(g => g.id === selected.id ? selected : g));
      showToast("Cập nhật thể loại thành công!", "success");
    }
    setIsModalOpen(false);
  };

  const confirmDelete = (id) => setDeleteId(id);

  const executeDelete = () => {
    setGenres(prev => prev.filter(g => g.id !== deleteId));
    showToast("Xóa thể loại thành công!", "success");
    setDeleteId(null);
    if (paginated.length === 1 && currentPage > 1) setCurrentPage(p => p - 1);
  };

  const truncate = (text, len = 50) => text?.length > len ? text.slice(0, len) + "..." : text;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 p-6 relative">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Quản lý thể loại truyện</h1>
          <SearchAndAddBar query={query} onQueryChange={setQuery} onAdd={openAdd} />
        </header>

        <main>
          <section className="bg-gray-900/30 border border-gray-800 rounded-lg p-4">
            <TagStats total={genres.length} filtered={filtered.length} />
            <TagTable
              genres={paginated}
              onEdit={openEdit}
              onDelete={confirmDelete}
              truncate={truncate}
            />
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                totalItems={filtered.length}
                itemsPerPage={ITEMS_PER_PAGE}
              />
            )}
          </section>
        </main>

        <TagModal
          isOpen={isModalOpen}
          mode={modalMode}
          genre={selected}
          onClose={() => setIsModalOpen(false)}
          onSave={saveGenre}
          onChange={setSelected}
        />

        <DeleteConfirmModal
          isOpen={deleteId !== null}
          onClose={() => setDeleteId(null)}
          onConfirm={executeDelete}
        />

        <ToastNotification toast={toast} onClose={() => setToast(prev => ({ ...prev, show: false }))} />
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeIn 0.3s ease-out; }
      `}</style>
    </div>
  );
}