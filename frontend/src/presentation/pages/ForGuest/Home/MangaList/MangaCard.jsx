export default function MangaCard({ manga, onClick }) {
  return (
    <div
      onClick={() => onClick(manga.id)}
      className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
    >
      <div className="relative">
        <img
          src={manga.imgPoster}
          alt={manga.name}
          className="w-full h-56 sm:h-60 object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-300 rounded-t-lg"></div>
      </div>
      <div className="p-3 bg-white rounded-b-lg">
        <h3 className="text-center text-black font-semibold text-sm truncate">{manga.name}</h3>
        <p className="text-center text-xs text-gray-600 mt-1">{manga.latestChapter}</p>
      </div>
    </div>
  );
}
