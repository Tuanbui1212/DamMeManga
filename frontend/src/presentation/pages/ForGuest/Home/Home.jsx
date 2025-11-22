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
      <MangaList />
      <TopManga />
    </>
  );
}

export default Home;
