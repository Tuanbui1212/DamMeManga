import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "../../../../../styles/font.css"

const mangaData = [
    ...Array.from({ length: 40 }, (_, i) => ({
        id: i + 1,
        imgPoster:
            i % 3 === 0
                ? "https://ik.imagekit.io/cuongphung241103/BTL_JAVA/MangaIMG/OnePunchManIMG.jpg"
                : "https://ik.imagekit.io/cuongphung241103/BTL_JAVA/MangaIMG/NRT.jpg",
        name: `Truyện ${i + 1}`,
        latestChapter: `Chap ${1000 + i * 5}`,
    })),
];

export default function MangaList() {
    const navigate = useNavigate();
    const scrollRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
        if (!scrollRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setCanScrollLeft(scrollLeft > 10);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    };

    const scrollLeft = () => {
        scrollRef.current?.scrollBy({ left: -400, behavior: "smooth" });
    };

    const scrollRight = () => {
        scrollRef.current?.scrollBy({ left: 400, behavior: "smooth" });
    };

    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        checkScroll();
        const handle = () => checkScroll();
        container.addEventListener("scroll", handle);
        window.addEventListener("resize", checkScroll);

        return () => {
            container.removeEventListener("scroll", handle);
            window.removeEventListener("resize", checkScroll);
        };
    }, []);

    const handleMangaClick = (id) => navigate(`/manga/${id}`);

    return (
        <div className="quicksand-uniquifier min-h-screen bg-gray-50">


            {/* Main */}
            <div className="container max-w-[1280px] mx-auto py-16">
                <h2 className="uppercase text-2xl font-bold text-gray-800 mb-12 text-center md:text-left">
                    TRUYỆN MỚI
                </h2>

                <div className="relative">
                    {/* NÚT TRÁI – Chỉ hiện khi hover vào chính nó */}
                    <button
                        onClick={scrollLeft}
                        onMouseEnter={(e) => e.currentTarget.style.opacity = "1"}
                        onMouseLeave={(e) => e.currentTarget.style.opacity = canScrollLeft ? "0.3" : "0"}
                        className="absolute left-[-30px] top-1/2 -translate-y-1/2 z-30 border border-gray-600 text-gray-600 bg-gray-200 hover:bg-blue-400 hover:border-blue-600 hover:text-blue-600 p-4 rounded-full shadow-2xl transition-all duration-300"
                        style={{ opacity: canScrollLeft ? 0.3 : 0 }}
                        aria-label="Cuộn trái"
                    >
                        <ChevronLeft size={16} />
                    </button>

                    {/* NÚT PHẢI – Chỉ hiện khi hover vào chính nó */}
                    <button
                        onClick={scrollRight}
                        onMouseEnter={(e) => e.currentTarget.style.opacity = "1"}
                        onMouseLeave={(e) => e.currentTarget.style.opacity = canScrollRight ? "0.3" : "0"}
                        className="absolute right-[-30px] top-1/2 -translate-y-1/2 z-30 border border-gray-600 text-gray-600 bg-gray-200 hover:bg-blue-400 hover:border-blue-600 hover:text-blue-600 p-4 rounded-full shadow-2xl transition-all duration-300"
                        style={{ opacity: canScrollRight ? 0.3 : 0 }}
                        aria-label="Cuộn phải"
                    >
                        <ChevronRight size={16} />
                    </button>

                    {/* LIST – Không overflow, không thanh cuộn */}
                    <div
                        ref={scrollRef}
                        className="hide-scrollbar scroll-smooth"
                        style={{ overflowX: "hidden" }}
                        onScroll={checkScroll}
                    >
                        <div className="grid grid-rows-2 grid-flow-col gap-4 py-2 px-1 min-w-max">
                            {mangaData.map((manga) => (
                                <div
                                    key={manga.id}
                                    onClick={() => handleMangaClick(manga.id)}
                                    className="lg:w-[160px] md:w-[140px] w-[120px] cursor-pointer group/item transition-all duration-300"
                                >
                                    <div className="relative overflow-hidden rounded-[10px] shadow-md hover:shadow-xl transition-shadow">
                                        <img
                                            src={manga.imgPoster}
                                            alt={manga.name}
                                            className="aspect-[2/3] w-full object-cover transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300" />
                                    </div>

                                    <div className="mt-3">
                                        <p className="font-bold text-sm text-gray-800 line-clamp-2 leading-tight">
                                            {manga.name}
                                        </p>
                                        <p className="text-xs text-gray-600 mt-1 font-medium">
                                            {manga.latestChapter}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Nút tải thêm */}
                <div className="mt-16 text-end">
                    <Link
                        to="/"
                        className="ml-auto font-semibold text-textPrimary hover:text-blue-300"
                    >
                        Xem danh sách truyện
                    </Link>
                </div>
            </div>
        </div>
    );
}