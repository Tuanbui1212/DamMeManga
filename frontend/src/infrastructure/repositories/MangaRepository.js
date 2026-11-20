import axiosClient from "../http/axiosClient";

export default class MangaRepositoryImpl {
  async getAllMangas() {
    const response = await axiosClient.get("/mangas");
    return response.data;
  }

  async getMangasPaged({ page = 0, size = 18, category = "", status = "", query = "", sort = "updateAt,desc" } = {}) {
    const params = new URLSearchParams();
    params.append("page", page);
    params.append("size", size);
    if (category && category !== "Tất cả") params.append("category", category);
    if (status && status !== "Tất cả") params.append("status", status);
    if (query && query.trim()) params.append("query", query.trim());
    if (sort) params.append("sort", sort);

    const response = await axiosClient.get(`/mangas/paged?${params.toString()}`);
    return response.data;
  }

  async getTopMangas(limit = 30) {
    const response = await axiosClient.get(`/mangas/top?limit=${limit}`);
    return response.data;
  }

  async getLatestMangas(limit = 30) {
    const response = await axiosClient.get(`/mangas/latest?limit=${limit}`);
    return response.data;
  }

  async searchMangas(query, limit = 10) {
    if (!query || !query.trim()) return [];
    const response = await axiosClient.get(`/mangas/search?q=${encodeURIComponent(query.trim())}&limit=${limit}`);
    return response.data;
  }

  async getMangaById(id) {
    const response = await axiosClient.get(`/mangas/${id}`);
    return response.data;
  }

  async createManga(manga) {
    const response = await axiosClient.post("/mangas", manga);
    return response.data;
  }

  async updateManga(id, manga) {
    console.log("Sending PUT body:", manga);
    const response = await axiosClient.put(`/mangas/${id}`, manga);
    return response.data;
  }

  async patchManga(id, updates) {
    const response = await axiosClient.patch(`/mangas/${id}`, updates);
    return response.data;
  }

  async deleteManga(id) {
    const response = await axiosClient.delete(`/mangas/${id}`);
    return response.data;
  }

  async getMangasByCategories(categories) {
    const response = await axiosClient.post(
      "/mangas/by-categories",
      categories
    );
    return response.data;
  }

  async getTotalMangas() {
    const response = await axiosClient.get("/mangas/count");
    return response.data;
  }

  async getTotalViews() {
    const response = await axiosClient.get("/mangas/totalviews");
    return response.data;
  }

  async incrementMangaViewCount(id) {
    const response = await axiosClient.post(`/mangas/${id}/view`);
    return response.data;
  }
}
