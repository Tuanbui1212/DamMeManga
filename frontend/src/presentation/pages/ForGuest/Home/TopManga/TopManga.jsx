import MangaService from "../../../../../usecases/MangaService";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "react-router-dom";

dayjs.extend(relativeTime);

const mangaService = new MangaService();

export default function TopManga() {
    const [mangas, setMangas] = useState([]);

    const scrollRefTopManga = useRef(null);

    const scrollLeftTopManga = () => {
        scrollRefTopManga.current?.scrollBy({ left: -350, behavior: "smooth" });
    };

    const scrollRightTopManga = () => {
        scrollRefTopManga.current?.scrollBy({ left: 350, behavior: "smooth" });
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = await mangaService.layManga();
            setMangas(data);
        };
        fetchData();
    }, []);

    return (
        <div className="w-full bg-backgroundTopManga">
            <div className="container max-w-[1280px] py-[80px] mx-auto">
                <h2 className="uppercase text-[1.25rem]  font-bold mb-12">
                    Truyện nổi bật
                </h2>

                <div className="relative group">
                    {/* Nút cuộn trái */}
                    <button
                        onClick={scrollLeftTopManga}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full opacity-0 group-hover:opacity-100"
                    >
                        <ChevronLeft />
                    </button>

                    {/* LIST SCROLL */}
                    <div
                        ref={scrollRefTopManga}
                        className="overflow-x-auto hide-scrollbar w-full"
                    >
                        <div className="grid grid-rows-3 grid-flow-col gap-[15px] p-1">
                            {mangas.map((manga, index) => (
                                <div
                                    key={manga.id_manga}
                                    className=" relative flex items-center gap-3 p-4 bg-gray-100 rounded-xl md:w-[288px] lg:w-[384px] h-[117px]"
                                >
                                    <img
                                        src={manga.poster_url}
                                        className="w-15 h-21 rounded-md object-cover"
                                        alt=""
                                    />

                                    <div className="flex-1 min-w-0 ">
                                        <p className="text-[18px] font-bold uppercase truncate">
                                            {manga.name_manga}
                                        </p>

                                        <p className="text-[13px] font-semibold text-gray-600 uppercase">
                                            {dayjs(manga.updated_at).fromNow()}
                                        </p>

                                        <p className="text-[13px] text-gray-500 uppercase">
                                            {manga.status} LƯỢT XEM
                                        </p>
                                    </div>
                                    <span className="text-[2.5rem] opacity-[0.1] font-bold text-black absolute top-[4px] right-[4px] leading-none">
                                        {index + 1}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Nút cuộn phải */}
                    <button
                        onClick={scrollRightTopManga}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full opacity-0 group-hover:opacity-100"
                    >
                        <ChevronRight />
                    </button>
                </div>

                <div className="w-full flex mt-8">
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
