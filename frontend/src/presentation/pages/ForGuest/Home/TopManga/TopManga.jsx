// src/presentation/components/TopManga/TopManga.jsx
// import topMangas from "../../../usecases/topMangaService";
import TopMangaCard from "./TopMangaCard";

const topMangas = [
    { id: 1, title: "One Punch Man", author: "ONE & Murata", views: "12.5M", poster: "https://ik.imagekit.io/cuongphung241103/BTL_JAVA/PosterManga/OnePunchManPoster.jpg?updatedAt=1762702479396" },
    { id: 2, title: "Chainsaw Man", author: "Tatsuki Fujimoto", views: "9.8M", poster: "https://ik.imagekit.io/cuongphung241103/BTL_JAVA/PosterManga/Chainsawman.jpg?updatedAt=1763273184710" },
    { id: 3, title: "Jujutsu Kaisen", author: "Gege Akutami", views: "8.2M", poster: "https://via.placeholder.com/200x280?text=JJK" },
    { id: 4, title: "Attack on Titan", author: "H. Isayama", views: "7.9M", poster: "https://via.placeholder.com/200x280?text=AoT" },
    { id: 5, title: "Demon Slayer", author: "K. Gotouge", views: "7.1M", poster: "https://via.placeholder.com/200x280?text=Kimetsu" },
    { id: 6, title: "Solo Leveling", author: "Chugong", views: "6.8M", poster: "https://via.placeholder.com/200x280?text=Solo" },
    { id: 7, title: "Tokyo Revengers", author: "Ken Wakui", views: "6.2M", poster: "https://via.placeholder.com/200x280?text=TR" },
    { id: 8, title: "My Hero Academia", author: "K. Horikoshi", views: "5.9M", poster: "https://via.placeholder.com/200x280?text=MHA" },
    { id: 9, title: "Naruto", author: "M. Kishimoto", views: "5.5M", poster: "https://via.placeholder.com/200x280?text=Naruto" },
];

export default function TopManga() {
    return (
        <section className="bg-[#D9CFC7] min-h-screen py-6 flex items-center justify-center">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
                    Top 9 Truyện Nổi Bật
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {topMangas.map((manga) => (
                        <TopMangaCard key={manga.id} manga={manga} />
                    ))}
                </div>
            </div>
        </section>
    );
}
