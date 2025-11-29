import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MangaPoster from "./MangaPoster.jsx";
import MangaInfo from "./MangaInfo.jsx";
import MangaActions from "./MangaActions.jsx";
import MangaChapters from "./MangaChapters.jsx";
import MangaStats from "./MangaStats.jsx";
import MangaComments from "./MangaComments.jsx";
import { Helmet } from "react-helmet-async";

import MangaService from "../../../../usecases/MangaService";
import MangaCategoryService from "../../../../usecases/MangaCategoryService";

function MangaDetailPage() {
    const { id } = useParams(); // lấy id manga từ route
    const [mangaInfo, setMangaInfo] = useState(null);
    const [chapters, setChapters] = useState([]);
    const [comments, setComments] = useState([]);
    const [statsData, setStatsData] = useState({ chaptersCount: 0, views: 0 });
    const [newComment, setNewComment] = useState("");
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const fetchManga = async () => {
            try {
                const mangaService = new MangaService();
                const mangaCategoryService = new MangaCategoryService();
                const manga = await mangaService.getMangaById(id);
                console.log("MANGA RAW:", manga);
                setMangaInfo({
                    title: manga.name,
                    authors: manga.authorName,
                    posterUrl: manga.bannerUrl,
                    mainImageUrl: manga.posterUrl,
                    lastUpdate: manga.updateAt,
                });
                console.log("MangaInfo:", mangaInfo);

                const categories = await mangaCategoryService.getCategoriesByManga(id);
                setGenres(categories.map(c => ({ name: c.nameCategory, count: 0 })));

                // Chapters
                if (manga.chapters) {
                    setChapters(manga.chapters);
                } else {
                    setChapters(
                        Array.from({ length: 30 }, (_, i) => ({
                            id: i + 1,
                            title: `Chapter ${i + 1}`,
                            date: `${30 - i} ngày trước`,
                        })).reverse()
                    );
                }

                // Comments
                setComments(manga.comments || []);

                // Stats
                setStatsData({
                    chaptersCount: manga.chapters?.length || 30,
                    views: manga.countView || 0,
                });
            } catch (error) {
                console.error("Lỗi khi lấy thông tin manga:", error);
            }
        };

        fetchManga();
    }, [id]);

    const handleAddComment = () => {
        if (!newComment.trim()) return;
        const newItem = {
            id: comments.length + 1,
            user: "Bạn đọc",
            text: newComment,
            date: "Vừa xong",
        };
        setComments([newItem, ...comments]);
        setNewComment("");
    };

    if (!mangaInfo) return <div>Đang tải...</div>;

    return (
        <>
            <Helmet>
                <title>{mangaInfo.title}</title>
            </Helmet>

            <div className="quicksand-uniquifier">
                <div className="h-400 bg-gray-300 relative inset-0">
                    <div className="mx-40 bg-white absolute inset-0 rounded-xl my-20 overflow-hidden">
                        <div className="flex flex-col">
                            <MangaPoster posterUrl={mangaInfo.posterUrl} />
                            <MangaInfo info={{ ...mangaInfo, genres }} />
                            <MangaActions />
                            <div className="flex justify-between mx-5 my-10 gap-10">
                                <MangaChapters
                                    chapters={chapters}
                                    key={chapters.map(c => c.id).join("-")}
                                />
                                <div className="w-1/3">
                                    <MangaStats stats={statsData} />
                                    <MangaComments
                                        comments={comments}
                                        newComment={newComment}
                                        setNewComment={setNewComment}
                                        handleAddComment={handleAddComment}
                                        key={comments.map(c => c.id).join("-")}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MangaDetailPage;
