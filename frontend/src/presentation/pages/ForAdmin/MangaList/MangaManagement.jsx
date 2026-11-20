import React, { useState, useMemo, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import SearchAndAddBar from "./SearchBar";
import MangaTable from "./MangaTable";
import Pagination from "./Pagination";
import MangaDetailService from "../../../../usecases/MangaDetailService";

const ITEMS_PER_PAGE = 6;
const service = new MangaDetailService();

const toTime = (value) => {
  const t = new Date(value).getTime();
  return Number.isNaN(t) ? 0 : t;
};

export default function MangaManagement() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [mangas, setMangas] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error

  const fetchMangas = useCallback(async (isCancelled = () => false) => {
    setStatus("loading");
    try {
      const data = await service.getAllMangaWithChapters();
      if (isCancelled()) return;

      const mapped = (Array.isArray(data) ? data : [])
        .map((item) => ({
          id: item.id_manga,
          title: String(item.name_manga ?? ""),
          // author_id đã được chuẩn hoá thành chuỗi trong repository
          author: String(item.author_id ?? ""),
          chapters: Array.isArray(item.chapters) ? item.chapters.length : 0,
          views: Number(item.count_view) || 0,
          cover: item.poster_url,
          updatedAt: item.updated_at,
          createdAt: item.created_at,
        }))
        .sort((a, b) => toTime(b.updatedAt) - toTime(a.updatedAt));

      setMangas(mapped);
      setStatus("ready");
    } catch (err) {
      console.error("Lỗi tải danh sách truyện:", err);
      if (!isCancelled()) setStatus("error");
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetchMangas(() => cancelled);
    return () => {
      cancelled = true;
    };
  }, [fetchMangas]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return mangas;
    return mangas.filter(
      (s) => s.title.toLowerCase().includes(q) || s.author.toLowerCase().includes(q)
    );
  }, [query, mangas]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, currentPage]);

  useEffect(() => setCurrentPage(1), [query]);

  const goToDetail = useCallback(
    (id) => navigate(`/manga-detail-management/${id}`),
    [navigate]
  );

  const handleAddStory = () => navigate("/create-manga");

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Quản lý truyện</h1>
          <SearchAndAddBar
            query={query}
            onQueryChange={setQuery}
            onAdd={handleAddStory}
            placeholder="Tìm truyện, tác giả..."
          />
        </header>

        <section className="bg-gray-900/30 border border-gray-800 rounded-lg overflow-hidden">
          {status === "loading" && (
            <div className="py-16 flex flex-col items-center gap-3 text-gray-400">
              <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-sm">Đang tải danh sách truyện...</span>
            </div>
          )}

          {status === "error" && (
            <div className="py-16 flex flex-col items-center gap-3 text-gray-300">
              <p>Không thể tải danh sách truyện.</p>
              <button
                onClick={() => fetchMangas()}
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold"
              >
                Thử lại
              </button>
            </div>
          )}

          {status === "ready" && (
            <>
              <div className="overflow-x-auto">
                <MangaTable
                  stories={paginated}
                  currentPage={currentPage}
                  itemsPerPage={ITEMS_PER_PAGE}
                  onViewDetail={goToDetail}
                />
              </div>

              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  totalItems={filtered.length}
                  itemsPerPage={ITEMS_PER_PAGE}
                />
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
}
