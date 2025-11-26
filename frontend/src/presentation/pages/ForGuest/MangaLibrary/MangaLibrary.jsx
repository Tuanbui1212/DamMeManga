<<<<<<< HEAD
import { useState } from "react";
import "../../../../styles/font.css";
import { Helmet } from "react-helmet-async";
import GenreFilter from "./GenreFilter";
import StatusFilter from "./StatusFilter";
import MangaCard from "./MangaCard";

// Dữ liệu giả lập manga
const mangaData = [
    { id: 1, title: "One Piece", genre: "Action", status: "Đang tiến hành" },
    { id: 2, title: "Naruto", genre: "Action", status: "Hoàn thành" },
    { id: 3, title: "Attack on Titan", genre: "Fantasy", status: "Hoàn thành" },
    { id: 4, title: "Demon Slayer", genre: "Action", status: "Đang tiến hành" },
    { id: 5, title: "Fruits Basket", genre: "Romance", status: "Hoàn thành" },
    { id: 6, title: "Boku No Pico", genre: "Gay", status: "Hoàn thành" },
];

// Lấy danh sách thể loại duy nhất
const genres = ["Tất cả", ...new Set(mangaData.map((m) => m.genre))];

function MangaLib() {
    const [genreFilter, setGenreFilter] = useState("Tất cả");
    const [statusFilter, setStatusFilter] = useState("Tất cả");

    const filteredManga = mangaData.filter((manga) => {
        const genreMatch = genreFilter === "Tất cả" || manga.genre === genreFilter;
        const statusMatch = statusFilter === "Tất cả" || manga.status === statusFilter;
        return genreMatch && statusMatch;
    });

    return (
        <>
            <Helmet>
                <title>Danh sách truyện | DMManga</title>
            </Helmet>
            <div className="min-h-screen bg-gray-100 pt-20 quicksand-uniquifier">
                <div className="p-6 max-w-5xl mx-auto">
                    <h2 className="text-2xl font-bold mb-4">Danh sách truyện</h2>

                    <GenreFilter genres={genres} genreFilter={genreFilter} setGenreFilter={setGenreFilter} />
                    <StatusFilter statusFilter={statusFilter} setStatusFilter={setStatusFilter} />

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {filteredManga.map((manga) => (
                            <MangaCard key={manga.id} manga={manga} />
                        ))}
                    </div>
                </div>
            </div>
        </>

    );
}

export default MangaLib;
=======
import MangaLib from "../../../components/MangaLib/MangaLib";

function MangaLibrary() {
  return (
    <>
        <MangaLib />
    </>
  );
}

export default MangaLibrary;
>>>>>>> java/phungcuong
