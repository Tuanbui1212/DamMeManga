import Slide from "./Slide/SlideShow";
import MangaList from "./MangaList/MangaList";
import TopManga from "./TopManga/TopManga";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";

import MangaService from "../../../../usecases/MangaService";

const mangaService = new MangaService();

function Home() {
  const [mangasTop, setMangasTop] = useState([]);
  const [mangasNew, setMangasNew] = useState([]);
  const [mangasOld, setMangasOld] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await mangaService.getAllMangas();

        const sortedTop = [...data]
          .sort((a, b) => b.countView - a.countView)
          .slice(0, 30);
        setMangasTop(sortedTop);

        const sortedNew = [...data]
          .sort((a, b) => new Date(b.updateAt) - new Date(a.updateAt))
          .slice(0, 30);
        setMangasNew(sortedNew);

        const sortedOld = [...data]
          .sort((a, b) => new Date(a.updateAt) - new Date(b.updateAt))
          .slice(0, 30);
        setMangasOld(sortedOld);
      } catch (err) {
        console.error("Lỗi khi lấy manga:", err);
        setMangasTop([]);
        setMangasNew([]);
        setMangasOld([]);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Helmet>
        <title>Trang chủ | DMManga</title>
      </Helmet>
      <Slide />
      <MangaList
        mangaData={mangasNew}
        title="Truyện mới"
        colorBackground="bg-gray-50"
      />
      <TopManga mangas={mangasTop} />
      <MangaList
        mangaData={mangasOld}
        title="Truyện do người Việt sáng tác"
        colorBackground="bg-[#e1dac0]"
      />
      <MangaList
        mangaData={mangasTop}
        title="Oneshot"
        colorBackground="bg-[#b3c6d5]"
      />
    </>
  );
}

export default Home;
