function MangaInfo({ info, genres }) {
  return (
    <div className="absolute top-120 left-20 flex gap-10">
      <img
        src={info.mainImageUrl}
        className="w-[200px] h-[300px] rounded-xl object-cover"
        alt=""
      />
      <div className="mt-20">
        <div className="text-white font-bold text-2xl">{info.title}</div>
        <div className="text-white">{info.authors}</div>
        <div className="mt-10">
          Cập nhật từ: <span>{info.lastUpdate}</span>
        </div>
        <div className="mt-5 flex gap-4">
          {genres.map((g, index) => (
            <a
              key={index}
              href="#"
              className="cursor-pointer px-2 py-1 rounded-full text-gray-700 bg-gray-100 text-sm font-bold hover:bg-white transition"
            >
              {g.nameCategory}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MangaInfo;
