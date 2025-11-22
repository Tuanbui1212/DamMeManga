import { useState } from "react";
import MangaPoster from "./MangaPoster.jsx";
import MangaInfo from "./MangaInfo.jsx";
import MangaActions from "./MangaActions.jsx";
import MangaChapters from "./MangaChapters.jsx";
import MangaStats from "./MangaStats.jsx";
import MangaComments from "./MangaComments.jsx";
import { Helmet } from "react-helmet-async";

// import { mangaInfo, chapters as chaptersData, commentsData, statsData } from "../data/mangaDetailData.js";

export const mangaInfo = {
    title: "ONE PUNCH MAN (MURATA ART)",
    authors: "ONE, Yusuke Murata",
    posterUrl: "https://ik.imagekit.io/cuongphung241103/BTL_JAVA/PosterManga/OnePunchManPoster.jpg?updatedAt=1762702479396",
    mainImageUrl: "https://ik.imagekit.io/cuongphung241103/BTL_JAVA/MangaIMG/OnePunchManIMG.jpg?updatedAt=1762764056279",
    lastUpdate: "4 ngày trước",
    genres: [{ name: "seinen", count: 315 }],
};

export const chapters = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    title: `Chapter ${i + 1}: One Punch!!`,
    date: `${30 - i} ngày trước`,
})).reverse();

export const commentsData = [
    { id: 1, user: 'Nguyễn An', text: 'Truyện hay cực kỳ luôn!!!', date: '2 ngày trước' },
    { id: 2, user: 'Minh Quân', text: 'Chờ chap mới hơi lâu 😭', date: '1 ngày trước' },
];

export const statsData = {
    chaptersCount: 30,
    views: "12.3K",
};

function MangaDetailPage() {
    const [comments, setComments] = useState(commentsData);
    const [newComment, setNewComment] = useState("");

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

    return (
        <>
            <Helmet>
                <title>{mangaInfo.title} | DMManga</title>
            </Helmet>

            <div className="quicksand-uniquifier">
                <div className="h-400 bg-gray-300 relative inset-0">
                    <div className="mx-40 bg-white absolute inset-0 rounded-xl my-20 overflow-hidden">
                        <div className="flex flex-col">
                            <MangaPoster posterUrl={mangaInfo.posterUrl} />
                            <MangaInfo info={mangaInfo} />
                            <MangaActions />
                            <div className="flex justify-between mx-5 my-10 gap-10">
                                <MangaChapters chapters={chapters} />
                                <div className="w-1/3">
                                    <MangaStats stats={statsData} />
                                    <MangaComments
                                        comments={comments}
                                        newComment={newComment}
                                        setNewComment={setNewComment}
                                        handleAddComment={handleAddComment}
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
