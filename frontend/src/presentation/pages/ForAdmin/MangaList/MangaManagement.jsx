import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchAndAddBar from "./SearchBar";
import MangaTable from "./MangaTable";
import Pagination from "./Pagination";
import BangDiemService from "../../../../usecases/MangaService";

const ITEMS_PER_PAGE = 6;

export default function MangaManagement() {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [mangas, setMangas] = useState([]);

    const service = useMemo(() => new BangDiemService(), []);

    useEffect(() => {
        const fetchMangas = async () => {
            const data = await service.getAllMangas();
            const mapped = data.map((item) => ({
                id: item.id,
                title: item.name,
                author: item.authorName,
                description: item.description,
                chapters: item.countView,
                views: item.countView,
                cover: item.posterUrl,
            }));
            setMangas(mapped);
        };

        fetchMangas();
    }, [service]);

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

    const goToDetail = (id) => {
        navigate(`/manga-detail-management/${id}`);
    };

    const handleAddStory = () => {

    };

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
                </section>
            </div>
        </div>
    );
}
