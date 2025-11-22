import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// import mangaData from "../../../usecases/mangaService";
import usePagination from "./hooks/usePagination";
import MangaGrid from "./MangaGrid";
import PaginationButtons from "./PaginationButtons";
import "../../../../../styles/font.css"

const mangaData = [
    {
        id: 1,
        imgPoster: 'https://ik.imagekit.io/cuongphung241103/BTL_JAVA/MangaIMG/OnePunchManIMG.jpg?updatedAt=1762764056279',
        name: 'One Piece',
        latestChapter: 'Chapter 1105',
    },
    {
        id: 2,
        imgPoster: 'https://ik.imagekit.io/cuongphung241103/BTL_JAVA/MangaIMG/NRT.jpg?updatedAt=1763293349678',
        name: 'Naruto',
        latestChapter: 'Chapter 700',
    },
];


export default function MangaList() {
    const navigate = useNavigate();
    const { currentPage, totalPages, currentItems, nextPage, prevPage, slideDirection } = usePagination(mangaData);
    const handleMangaClick = (id) => navigate(`/manga/${id}`);

    return (
        <div className="quicksand-uniquifier h-[120vh] bg-gray-200/50 text-white p-6 md:p-10">
            <div className="max-w-7xl mx-auto">
                <nav className="flex items-center justify-end space-x-2 text-sm text-gray-600 mb-6">
                    <Link to='/mangalibrary' className="text-black font-medium"><span >Danh sách truyện</span></Link>
                </nav>

                <h1 className="text-2xl md:text-3xl font-bold text-center mb-10 text-black">
                    Danh Sách Truyện Tranh
                </h1>

                <div className="relative">
                    <PaginationButtons
                        currentPage={currentPage}
                        totalPages={totalPages}
                        prevPage={prevPage}
                        nextPage={nextPage}
                        isSliding={slideDirection !== ""}
                    />
                    <MangaGrid items={currentItems} slideDirection={slideDirection} onCardClick={handleMangaClick} />
                </div>
            </div>
        </div>
    );
}
