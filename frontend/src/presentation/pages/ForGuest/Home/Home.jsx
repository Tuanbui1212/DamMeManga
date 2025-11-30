import Slide from "./Slide/SlideShow";
import MangaList from "./MangaList/MangaList";
import TopManga from "./TopManga/TopManga";
import { Helmet } from "react-helmet-async";

function Home() {
  return (
    <>
      <Helmet>
        <title>Trang chủ | DMManga</title>
      </Helmet>
      <Slide />
      <MangaList title="Truyện mới" colorBackground="bg-gray-50" />
      <TopManga />
      <MangaList
        title="Truyện do người Việt sáng tác"
        colorBackground="bg-[#e1dac0]"
      />
      <MangaList title="Oneshot" colorBackground="bg-[#b3c6d5]" />
    </>
  );
}

export default Home;
