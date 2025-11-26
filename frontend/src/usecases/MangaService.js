import MangaRepositoryImpl from "../infrastructure/repositories/MangaRepository";

export default class MangaService {

  constructor() {
    this.mangaRepository = new MangaRepositoryImpl();
  }

  async layManga() {
    return await this.mangaRepository.getAllMangas();
  }

  async getAllMangas() {
    return await this.mangaRepository.getAllMangas();
  }

  async getMangaById(id) {
    return await this.mangaRepository.getMangaById(id);
  }

  async createManga(manga) {
    return await this.mangaRepository.createManga(manga);
  }

  async updateManga(id, manga) {
    return await this.mangaRepository.updateManga(id, manga);
  }

  async deleteManga(id) {
    return await this.mangaRepository.deleteManga(id);
  }
}
