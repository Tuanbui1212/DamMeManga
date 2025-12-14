import ChapterRepository from "../infrastructure/repositories/ChapterRepository";

export default class ChapterService {
  constructor() {
    this.chapterRepository = new ChapterRepository();
  }

  async createChapter(chapter) {
    return await this.chapterRepository.createChapter(chapter);
  }

  async deleteChapter(id) {
    return await this.chapterRepository.deleteChapter(id);
  }

  async getChaptersByMangaId(idManga) {
    return await this.chapterRepository.getChaptersByMangaId(idManga);
  }
}
