import Slide from "./Slide/SlideShow";
import MangaList from "./MangaList/MangaList";
import TopManga from "./TopManga/TopManga";
import { Helmet } from "react-helmet-async";
import { useEffect, useState, useMemo } from "react";

import MangaService from "../../../../usecases/MangaService";

const mangaService = new MangaService();

function Home() {
  const [mangasTop, setMangasTop] = useState([]);
  const [mangasNew, setMangasNew] = useState([]);
  const [mangasMonster, setMangasMonster] = useState([]);
  const [mangasAdventure, setMangasAdventure] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [topData, latestData, dataMonster, dataAdventure] = await Promise.all([
          mangaService.getTopMangas(30),
          mangaService.getLatestMangas(30),
          mangaService.getMangasByCategories(["Monster"]),
          mangaService.getMangasByCategories(["Adventure"]),
        ]);

        if (!isMounted) return;

        setMangasTop(topData || []);
        setMangasNew(latestData || []);
        setMangasMonster((dataMonster || []).slice(0, 30));
        setMangasAdventure((dataAdventure || []).slice(0, 30));
      } catch (err) {
        console.error("Lỗi khi lấy manga trang chủ:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchData();
    return () => { isMounted = false; };
  }, []);

  // Ổn định bannerData để tránh giật lag khi render lại
  const bannerData = useMemo(() => {
    return mangasTop.slice(0, 10);
  }, [mangasTop]);

  return (
    <>
      <Helmet>
        <title>Trang chủ | DMManga</title>
      </Helmet>

      {bannerData.length > 0 && <Slide bannerData={bannerData} />}

      <MangaList
        mangaData={mangasNew}
        title="Truyện mới cập nhật"
        colorBackground="bg-gray-50"
        category="all"
      />

      <TopManga mangas={mangasTop} />

      <MangaList
        mangaData={mangasMonster}
        title="Truyện thể loại Monster"
        colorBackground="bg-[#e1dac0]"
        category="Monster"
      />
      <MangaList
        mangaData={mangasAdventure}
        title="Truyện thể loại Adventure"
        colorBackground="bg-[#b3c6d5]"
        category="Adventure"
      />
    </>
  );
}

export default Home;
