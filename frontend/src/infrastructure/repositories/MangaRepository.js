import axios from "../http/axios";
import { Manga } from "../../domain/models/Manga";

export default class BangDiemRepository {
  async layDanhSachManga() {
    try {
      const res = await axios.get("/api/mangas");
      return res.data.map(
        (item) =>
          new Manga(
            item.id,
            item.name,
            item.authorId,
            item.description,
            item.bannerUrl,
            item.posterUrl,
            item.status,
            item.countView,
            item.createdAt,
            item.updatedAt
          )
      );
    } catch (err) {
      console.error("Lỗi khi lấy bảng manga:", err);
      return [];
    }
  }
}
