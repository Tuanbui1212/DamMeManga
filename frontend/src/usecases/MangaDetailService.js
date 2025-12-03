import MangaDetailRepository from "../infrastructure/repositories/MangaDetailRepository";

export default class MangaDetailService {
  constructor() {
    this.mangaDetailRepository = new MangaDetailRepository();
  }

  async getMangaWithChapters(idManga) {
    return await this.mangaDetailRepository.getMangaWithChapters(idManga);
  }
}
