import axios from "../http/axiosClient";
import { MangaDetail } from "../../domain/models/MangaDetail";

export default class MangaDetailRepository {
  async getMangaWithChapters(id) {
    try {
      const res = await axios.get(`/user/mangas/${id}`);
      return new MangaDetail(
        res.data.idManga,
        res.data.nameManga,
        res.data.author,
        res.data.description,
        res.data.bannerUrl,
        res.data.posterUrl,
        res.data.status,
        res.data.countView,
        res.data.createdAt,
        res.data.updatedAt,
        res.data.chapters || []
      );
    } catch (err) {
      console.error("Lỗi khi lấy Manga va Chapter:", err);
      return [];
    }
  }
}
