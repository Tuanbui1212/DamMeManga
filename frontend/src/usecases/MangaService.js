import MangaRepository from "../infrastructure/repositories/MangaRepository";

export default class BangDiemService {
  constructor() {
    this.repository = new MangaRepository();
  }

  async layManga() {
    return await this.repository.layDanhSachManga();
  }
}
