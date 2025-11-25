import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import MangaService from "../../../../usecases/MangaService";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const bannerData = [
  {
    id: 1,
    image:
      "https://storage-ct.lrclib.net/file/cuutruyen/uploads/manga/3869/panorama/processed-4c051506e665b5e6a8e323c45fb84fcb.jpg",
    title: "Tasogare Machi Prisoners",
    description:
      "Đã năm năm trôi qua kể từ khi án tử hình bị bãi bỏ ở Nhật Bản. Thay vào đó, những tội phạm nghiêm trọng nay bị đưa đến một nơi gọi là Thị trấn Hoàng Hôn (Tasogare Town). Sendou...",
  },
  {
    id: 2,
    image:
      "https://ik.imagekit.io/cuongphung241103/BTL_JAVA/PosterManga/Chainsawman.jpg?updatedAt=1763273184710",
    title: "Chainsaw Man",
    description:
      "Denji – chàng trai bán thân cho quỷ để trở thành người cưa máy sống!",
  },
  {
    id: 3,
    image:
      "https://ik.imagekit.io/cuongphung241103/BTL_JAVA/PosterManga/OnePunchManPoster.jpg?updatedAt=1762702479396",
    title: "One Punch Man",
    description:
      "Saitama – anh hùng mạnh nhất chỉ cần một đấm để kết liễu mọi kẻ thù!",
  },
];

const mangaData = [
  {
    id: 1,
    imgPoster:
      "https://ik.imagekit.io/cuongphung241103/BTL_JAVA/MangaIMG/OnePunchManIMG.jpg?updatedAt=1762764056279",
    name: "One Piece",
    latestChapter: "Chapter 1105",
  },
  {
    id: 2,
    imgPoster:
      "https://ik.imagekit.io/cuongphung241103/BTL_JAVA/MangaIMG/NRT.jpg?updatedAt=1763293349678",
    name: "Naruto",
    latestChapter: "Chapter 700",
  },
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mangas, setMangas] = useState([]);
  const mangaService = new MangaService();

  useEffect(() => {
    const fetchData = async () => {
      const data = await mangaService.layManga();
      console.log(data);
      setMangas(data);
    };
    fetchData();
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? bannerData.length - 1 : prevIndex - 1
    );
  };
  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === bannerData.length - 1 ? 0 : prevIndex + 1
    );
  };
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };
  useEffect(() => {
    const timer = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const data = bannerData[currentIndex];

  // --- SCROLL FOR MANGA LIST ---
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -350, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 350, behavior: "smooth" });
  };

  // --- SCROLL FOR MANGA LIST ---
  const scrollRefTopManga = useRef(null);

  const scrollLeftTopManga = () => {
    scrollRefTopManga.current.scrollBy({ left: -350, behavior: "smooth" });
  };

  const scrollRightTopManga = () => {
    scrollRefTopManga.current.scrollBy({ left: 350, behavior: "smooth" });
  };

  return (
    <>
      <div className="relative pt-[calc(50%-60px)]">
        {/* Background image */}
        <div className="absolute top-0 left-0 right-0 w-full h-[80%]">
          <img
            src={data.image}
            alt=""
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-black/60 transition-colors duration-300"></div>
        </div>

        {/* Main banner */}
        <div className="absolute bottom-0 left-0 right-0 container max-w-[1280px] mx-auto z-10 rounded-xl overflow-hidden aspect-[21/9]">
          <img src={data.image} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60 transition-colors duration-300"></div>

          <div className="absolute left-[32px] bottom-[26px] w-[50%]">
            <h2 className="text-[1.25rem] text-white font-bold">
              {data.title}
            </h2>
            <p className="text-[1rem] text-white">{data.description}</p>
          </div>

          <div className="absolute right-[32px] bottom-[46px] w-[50%]">
            <button className="ml-auto text-[1.25rem] font-bold bg-buttonHome hover:opacity-[0.8] cursor-pointer text-white px-4 py-2 rounded block transition-colors">
              Xem thông tin
            </button>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Dots indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {bannerData.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-white w-8"
                  : "bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Truyen moi */}
      <div className="w-full bg-backgroundNewManga mt-8">
        <div className="container max-w-[1280px] py-[80px] mx-auto">
          <h2 className="uppercase text-[1.25rem]  font-bold mb-12">
            Truyện mới
          </h2>

          <div className="relative group">
            {/* Nút cuộn trái */}
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft />
            </button>

            {/* LIST SCROLL */}
            <div
              ref={scrollRef}
              className="overflow-x-auto hide-scrollbar w-full"
            >
              <div className="grid grid-rows-2 grid-flow-col gap-[15px] p-1">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={i} className="lg:w-[160px] md:w-[128px]">
                    <img
                      className="aspect-[2/3] w-full rounded-[10px] shadow-md"
                      src={mangaData[0].imgPoster}
                      alt=""
                    />
                    <p className="text-[16px] font-bold mt-1">
                      {mangaData[0].name} {i + 1}
                    </p>
                    <p className="text-[14px] font-medium">
                      {mangaData[0].latestChapter}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Nút cuộn phải */}
            <button
              onClick={scrollRight}
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

      {/* Truyen noi bat */}
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
                  <Link
                    to={`/mangas/${manga.id_manga}`}
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
                  </Link>
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
    </>
  );
}
