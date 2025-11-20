import { useEffect, useState } from "react";
import MangaService from "../../../usecases/MangaService";

function Home() {
  const [manga, setManga] = useState([]);
  const service = new MangaService();

  useEffect(() => {
    const fetchData = async () => {
      const data = await service.layManga();
      setManga(data);
    };

    fetchData();
  }, []);

  console.log(manga);

  return (
    <>
      <h1>Đây là phần test read data</h1>
      <h1>Danh sách truyện</h1>

      {manga.length > 0 ? (
        manga.map((item, index) => <p key={index}>{item.name_manga}</p>)
      ) : (
        <p>Chưa có manga</p>
      )}
    </>
  );
}

export default Home;
