import { describe, it, expect, vi, beforeEach } from "vitest";
import ChapterService from "./ChapterService";

vi.mock("../infrastructure/repositories/ChapterRepository", () => {
  return {
    default: class MockChapterRepository {
      async getChaptersByMangaId(idManga) {
        if (idManga === "manga-1") {
          return [
            { idChapter: 1, chapterNumber: 1, title: "Chap 1" },
            { idChapter: 2, chapterNumber: 2, title: "Chap 2" },
          ];
        }
        return [];
      }
      async getChapterById(id) {
        if (id === 1) return { idChapter: 1, chapterNumber: 1, title: "Chap 1" };
        throw new Error("Chapter not found");
      }
      async createChapter(chapter) {
        return { idChapter: 3, ...chapter };
      }
      async deleteChapter(id) {
        return "Deleted";
      }
    },
  };
});

describe("ChapterService", () => {
  let chapterService;

  beforeEach(() => {
    chapterService = new ChapterService();
  });

  it("should get chapters by manga id", async () => {
    const chapters = await chapterService.getChaptersByMangaId("manga-1");
    expect(chapters).toHaveLength(2);
    expect(chapters[0].title).toBe("Chap 1");
  });

  it("should get chapter by id", async () => {
    const chapter = await chapterService.getChapterById(1);
    expect(chapter.idChapter).toBe(1);
    expect(chapter.title).toBe("Chap 1");
  });

  it("should create new chapter", async () => {
    const newChap = await chapterService.createChapter({ chapterNumber: 3, title: "Chap 3" });
    expect(newChap.idChapter).toBe(3);
    expect(newChap.chapterNumber).toBe(3);
  });

  it("should delete chapter", async () => {
    const res = await chapterService.deleteChapter(1);
    expect(res).toBe("Deleted");
  });
});
