import axios from "../http/axios";
import { Manga } from "../../domain/models/Manga";

export default class BangDiemRepository {
  async layDanhSachManga() {
    try {
<<<<<<< HEAD
      const res = await axios.get("/api/mangas");
=======
      const res = await axios.get("/manga");
>>>>>>> java/phungcuong
      return res.data.map(
        (item) =>
          new Manga(
            item.id,
<<<<<<< HEAD
            item.name,
            item.authorId,
            item.description,
            item.bannerUrl,
            item.posterUrl,
=======
            item.nameManga,
            item.authorId,
            item.description,
            item.bannerUrl,
>>>>>>> java/phungcuong
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
