import { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../../../../styles/font.css";
import { Helmet } from "react-helmet-async";
import { ChevronLeft, ChevronRight, BookOpen, SlidersHorizontal, Loader2 } from "lucide-react";
import GenreFilter from "./GenreFilter";
import StatusFilter from "./StatusFilter";
import MangaCard from "./MangaCard";
import MangaService from "../../../../usecases/MangaService";
import CategoryService from "../../../../usecases/CategoryService";

const PAGE_SIZE = 18;

function MangaLib() {
    const navigate = useNavigate();
    const mangaService = useMemo(() => new MangaService(), []);
    const categoryService = useMemo(() => new CategoryService(), []);

    const [genres, setGenres] = useState(["Tất cả"]);
    const [genreFilter, setGenreFilter] = useState("Tất cả");
    const [statusFilter, setStatusFilter] = useState("Tất cả");
    const [sortBy, setSortBy] = useState("updateAt,desc");

    const [mangas, setMangas] = useState([]);
    const [currentPage, setCurrentPage] = useState(0); // 0-indexed for backend
    const [totalPages, setTotalPages] = useState(1);
    const [totalElements, setTotalElements] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    // Tải danh sách thể loại từ backend
    useEffect(() => {
        let isMounted = true;
        const fetchCategories = async () => {
            try {
                const res = await categoryService.getAllCategories();
                if (isMounted && Array.isArray(res)) {
                    const names = res.map((c) => c.nameCategory || c.name).filter(Boolean);
                    setGenres(["Tất cả", ...names]);
                }
            } catch (err) {
                console.error("Lỗi khi tải danh mục:", err);
            }
        };
        fetchCategories();
        return () => { isMounted = false; };
    }, [categoryService]);

    // Tải danh sách truyện phân trang
    const fetchPagedMangas = useCallback(async (page = 0) => {
        setIsLoading(true);
        try {
            const res = await mangaService.getMangasPaged({
                page,
                size: PAGE_SIZE,
                category: genreFilter,
                status: statusFilter,
                sort: sortBy,
            });

            if (res) {
                setMangas(res.content || []);
                setTotalPages(res.totalPages || 1);
                setTotalElements(res.totalElements || 0);
                setCurrentPage(res.pageNumber || 0);
            }
        } catch (err) {
            console.error("Lỗi khi tải danh sách manga:", err);
            setMangas([]);
        } finally {
            setIsLoading(false);
        }
    }, [mangaService, genreFilter, statusFilter, sortBy]);

    // Khi đổi filter, quay về trang 0
    useEffect(() => {
        setCurrentPage(0);
        fetchPagedMangas(0);
    }, [fetchPagedMangas]);

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages && newPage !== currentPage) {
            fetchPagedMangas(newPage);
            window.scrollTo({ top: 100, behavior: "smooth" });
        }
    };

    const handleMangaClick = (id) => {
        navigate(`/mangas/${id}`);
    };

    // Render danh sách nút phân trang
    const pageButtons = useMemo(() => {
        const pages = [];
        const maxButtons = 5;
        let start = Math.max(0, currentPage - 2);
        let end = Math.min(totalPages - 1, start + maxButtons - 1);
        if (end - start < maxButtons - 1) {
            start = Math.max(0, end - maxButtons + 1);
        }
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    }, [currentPage, totalPages]);

    return (
        <>
            <Helmet>
                <title>Thư viện truyện | DMManga</title>
            </Helmet>
            <div className="min-h-screen bg-gray-50 pt-24 pb-16 quicksand-uniquifier">
                <div className="p-6 max-w-7xl mx-auto">
                    {/* Header bar */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-gray-200 mb-6 gap-4">
                        <div>
                            <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
                                <BookOpen className="text-blue-600" size={32} />
                                Thư viện truyện
                            </h1>
                            <p className="text-sm text-gray-500 mt-1">
                                Khám phá hàng ngàn tựa manga hấp dẫn, cập nhật liên tục mỗi ngày
                            </p>
                        </div>

                        {/* Sắp xếp */}
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-gray-600 flex items-center gap-1.5 whitespace-nowrap">
                                <SlidersHorizontal size={16} /> Sắp xếp:
                            </span>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 shadow-sm"
                            >
                                <option value="updateAt,desc">Mới cập nhật</option>
                                <option value="countView,desc">Xem nhiều nhất</option>
                                <option value="createAt,desc">Truyện mới đăng</option>
                                <option value="nameManga,asc">Tên A-Z</option>
                            </select>
                        </div>
                    </div>

                    {/* Filter sections */}
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-8 space-y-4">
                        <GenreFilter genres={genres} genreFilter={genreFilter} setGenreFilter={setGenreFilter} />
                        <StatusFilter statusFilter={statusFilter} setStatusFilter={setStatusFilter} />
                    </div>

                    {/* Status & Results Summary */}
                    <div className="flex items-center justify-between mb-6">
                        <span className="text-sm text-gray-600 font-medium">
                            Tìm thấy <strong className="text-gray-900">{totalElements}</strong> tựa truyện
                        </span>
                        {totalPages > 1 && (
                            <span className="text-xs text-gray-500">
                                Trang {currentPage + 1} / {totalPages}
                            </span>
                        )}
                    </div>

                    {/* Manga Grid */}
                    {isLoading ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-5">
                            {Array.from({ length: 12 }).map((_, idx) => (
                                <div key={idx} className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse">
                                    <div className="aspect-[3/4] bg-gray-200"></div>
                                    <div className="p-3 space-y-2">
                                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                        <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : mangas.length === 0 ? (
                        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
                            <BookOpen size={48} className="mx-auto text-gray-300 mb-3" />
                            <h3 className="text-lg font-semibold text-gray-700 mb-1">Không tìm thấy truyện nào</h3>
                            <p className="text-sm text-gray-500">
                                Hãy thử thay đổi thể loại hoặc bộ lọc trạng thái để tìm truyện bạn thích.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-5">
                            {mangas.map((manga) => (
                                <MangaCard key={manga.id} manga={manga} onClick={handleMangaClick} />
                            ))}
                        </div>
                    )}

                    {/* Pagination Bar */}
                    {totalPages > 1 && !isLoading && (
                        <div className="flex justify-center items-center gap-2 mt-12">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 0}
                                className="flex items-center justify-center p-2.5 rounded-lg border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
                                title="Trang trước"
                            >
                                <ChevronLeft size={18} />
                            </button>

                            {pageButtons[0] > 0 && (
                                <>
                                    <button
                                        onClick={() => handlePageChange(0)}
                                        className="px-3.5 py-2 text-sm font-semibold rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition"
                                    >
                                        1
                                    </button>
                                    {pageButtons[0] > 1 && <span className="text-gray-400 px-1">...</span>}
                                </>
                            )}

                            {pageButtons.map((pageIdx) => (
                                <button
                                    key={pageIdx}
                                    onClick={() => handlePageChange(pageIdx)}
                                    className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition ${
                                        currentPage === pageIdx
                                            ? "bg-blue-600 text-white shadow-sm"
                                            : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
                                    }`}
                                >
                                    {pageIdx + 1}
                                </button>
                            ))}

                            {pageButtons[pageButtons.length - 1] < totalPages - 1 && (
                                <>
                                    {pageButtons[pageButtons.length - 1] < totalPages - 2 && (
                                        <span className="text-gray-400 px-1">...</span>
                                    )}
                                    <button
                                        onClick={() => handlePageChange(totalPages - 1)}
                                        className="px-3.5 py-2 text-sm font-semibold rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition"
                                    >
                                        {totalPages}
                                    </button>
                                </>
                            )}

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage >= totalPages - 1}
                                className="flex items-center justify-center p-2.5 rounded-lg border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
                                title="Trang sau"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default MangaLib;
