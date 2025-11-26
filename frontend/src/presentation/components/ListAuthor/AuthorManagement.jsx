// src/components/author-management/AuthorManagement.jsx
import React, { useState, useMemo, useEffect } from "react";
import SearchAndAddBar from "./SearchAndAddBar";
import AuthorStats from "./AuthorStats";
import AuthorTable from "./AuthorTable";
import AuthorModal from "./AuthorModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import ToastNotification from "./ToastNotification";
import Pagination from "./Pagination";

const initialAuthors = [
  { id: 1, name: "Fujiko F. Fujio" },
  { id: 2, name: "Eiichiro Oda" },
  { id: 3, name: "Masashi Kishimoto" },
  { id: 4, name: "Rumiko Takahashi" },
  { id: 5, name: "CLAMP" },
  { id: 6, name: "Kentaro Miura" },
  { id: 7, name: "Hirohiko Araki" },
  { id: 8, name: "Naoko Takeuchi" },
  { id: 9, name: "Yoshihiro Togashi" },
  { id: 10, name: "Tetsuya Nomura" },
  { id: 11, name: "Sui Ishida" },
  { id: 12, name: "Koyoharu Gotouge" },
  { id: 13, name: "Gege Akutami" },
  { id: 14, name: "Haruichi Furudate" },
];

const ITEMS_PER_PAGE = 9;

export default function AuthorManagement() {
  const [query, setQuery] = useState("");
  const [authors, setAuthors] = useState(initialAuthors);
  const [currentPage, setCurrentPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [deleteId, setDeleteId] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  // Lọc & phân trang
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return authors;
    return authors.filter(a => a.name.toLowerCase().includes(q));
  }, [query, authors]);

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
    setSelected({ name: "" });
    setIsModalOpen(true);
  };

  const openEdit = (author) => {
    setModalMode("edit");
    setSelected({ ...author });
    setIsModalOpen(true);
  };

  const saveAuthor = () => {
    if (!selected?.name?.trim()) {
      showToast("Vui lòng nhập tên tác giả!", "error");
      return;
    }

    if (modalMode === "add") {
      const newId = Math.max(0, ...authors.map(a => a.id)) + 1;
      setAuthors(prev => [{ id: newId, name: selected.name.trim() }, ...prev]);
      showToast("Thêm tác giả thành công!", "success");
    } else {
      setAuthors(prev => prev.map(a => a.id === selected.id ? { ...a, name: selected.name.trim() } : a));
      showToast("Cập nhật tác giả thành công!", "success");
    }
    setIsModalOpen(false);
  };

  const confirmDelete = (id) => setDeleteId(id);

  const executeDelete = () => {
    setAuthors(prev => prev.filter(a => a.id !== deleteId));
    showToast("Xóa tác giả thành công!", "success");
    setDeleteId(null);
    if (paginated.length === 1 && currentPage > 1) setCurrentPage(p => p - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 p-6 relative">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Quản lý tác giả</h1>
          <SearchAndAddBar query={query} onQueryChange={setQuery} onAdd={openAdd} />
        </header>

        <main>
          <section className="bg-gray-900/30 border border-gray-800 rounded-lg p-4">
            <AuthorStats total={authors.length} filtered={filtered.length} />
            <AuthorTable authors={paginated} onEdit={openEdit} onDelete={confirmDelete} />
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

        <AuthorModal
          isOpen={isModalOpen}
          mode={modalMode}
          author={selected}
          onClose={() => setIsModalOpen(false)}
          onSave={saveAuthor}
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