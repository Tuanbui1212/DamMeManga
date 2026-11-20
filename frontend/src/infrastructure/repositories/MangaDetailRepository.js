import axios from "../http/axiosClient";
import { MangaDetail } from "../../domain/models/MangaDetail";

/**
 * API /api/user/mangas trả về entity Manga, trong đó `author` là OBJECT
 * ({ idAuthor, nameAuthor }) chứ không phải chuỗi. Nếu đem object này render
 * trực tiếp trong JSX, React sẽ ném lỗi "Objects are not valid as a React child"
 * => toàn bộ trang bị trắng. Hàm này chuẩn hoá về chuỗi tên tác giả.
 */
export function toAuthorName(author) {
  if (!author) return "";
  if (typeof author === "string") return author;
  if (typeof author === "object") {
    return String(author.nameAuthor || author.name || author.authorName || "");
  }
  return String(author);
}

export function toMangaDetail(raw) {
  if (!raw || typeof raw !== "object") return null;
  return new MangaDetail(
    raw.idManga ?? raw.id,
    raw.nameManga ?? raw.name ?? "",
    toAuthorName(raw.author ?? raw.authorName),
    raw.description,
    raw.bannerUrl,
    raw.posterUrl,
    raw.status,
    raw.countView ?? 0,
    raw.createdAt ?? raw.createAt,
    raw.updatedAt ?? raw.updateAt,
    Array.isArray(raw.chapters) ? raw.chapters : []
  );
}

export default class MangaDetailRepository {
  // Ném lỗi ra ngoài để màn hình hiển thị đúng trạng thái lỗi / không tìm thấy
  async getMangaWithChapters(id) {
    const res = await axios.get(`/user/mangas/${id}`);
    return toMangaDetail(res.data);
  }

  async getAllMangaWithChapters() {
    const res = await axios.get(`/user/mangas`);
    const list = Array.isArray(res.data) ? res.data : [];
    return list.map(toMangaDetail).filter(Boolean);
  }
}
