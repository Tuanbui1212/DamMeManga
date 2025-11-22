function MangaCard({ manga }) {
    return (
        <div className="bg-white rounded shadow p-4 hover:shadow-lg transition-shadow">
            <h3 className="font-bold text-lg mb-2">{manga.title}</h3>
            <p className="text-gray-600 mb-1">Thể loại: {manga.genre}</p>
            <p className={`font-medium ${manga.status === "Đang tiến hành" ? "text-green-600" : "text-gray-500"}`}>
                {manga.status}
            </p>
        </div>
    );
}

export default MangaCard;
