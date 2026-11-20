import { describe, it, expect, vi, beforeEach } from "vitest";
import MangaService from "./MangaService";

vi.mock("../infrastructure/repositories/MangaRepository", () => {
  return {
    default: class MockMangaRepository {
      async getAllMangas() {
        return [{ id: "1", name: "One Piece" }];
      }
      async getTopMangas(limit) {
        return [{ id: "1", name: "One Piece", countView: 10000 }].slice(0, limit);
      }
      async getLatestMangas(limit) {
        return [{ id: "2", name: "Chainsaw Man" }].slice(0, limit);
      }
      async searchMangas(query, limit) {
        if (!query) return [];
        return [{ id: "1", name: "One Piece" }].slice(0, limit);
      }
      async getMangasPaged(options) {
        return {
          content: [{ id: "1", name: "One Piece" }],
          pageNumber: options.page || 0,
          pageSize: options.size || 18,
          totalElements: 1,
          totalPages: 1,
          isLast: true,
          isFirst: true,
        };
      }
      async getMangaById(id) {
        if (id === "1") return { id: "1", name: "One Piece" };
        throw new Error("Not found");
      }
      async incrementMangaViewCount(id) {
        return { success: true };
      }
    },
  };
});

describe("MangaService", () => {
  let mangaService;

  beforeEach(() => {
    mangaService = new MangaService();
  });

  it("should get all mangas", async () => {
    const mangas = await mangaService.getAllMangas();
    expect(mangas).toHaveLength(1);
    expect(mangas[0].name).toBe("One Piece");
  });

  it("should get top mangas with limit", async () => {
    const top = await mangaService.getTopMangas(10);
    expect(top).toHaveLength(1);
    expect(top[0].countView).toBe(10000);
  });

  it("should get latest mangas with limit", async () => {
    const latest = await mangaService.getLatestMangas(5);
    expect(latest).toHaveLength(1);
    expect(latest[0].name).toBe("Chainsaw Man");
  });

  it("should search mangas by query", async () => {
    const results = await mangaService.searchMangas("piece", 5);
    expect(results).toHaveLength(1);
    expect(results[0].name).toBe("One Piece");
  });

  it("should return empty list when searching with empty query", async () => {
    const results = await mangaService.searchMangas("", 5);
    expect(results).toHaveLength(0);
  });

  it("should increment manga view count", async () => {
    const res = await mangaService.incrementMangaViewCount("1");
    expect(res).toEqual({ success: true });
  });

  it("should get paged mangas with filters", async () => {
    const res = await mangaService.getMangasPaged({ page: 0, size: 18, category: "Action" });
    expect(res.content).toHaveLength(1);
    expect(res.content[0].name).toBe("One Piece");
    expect(res.pageNumber).toBe(0);
    expect(res.totalPages).toBe(1);
  });
});
