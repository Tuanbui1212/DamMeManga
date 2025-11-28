import axiosClient from "../http/axiosClient";

export default class MangaRepositoryImpl {

    // Lấy danh sách tất cả manga
    async getAllMangas() {
        const response = await axiosClient.get("/mangas");
        return response.data;   // trả về list MangaDTO
    }

    // Lấy 1 manga theo id
    async getMangaById(id) {
        const response = await axiosClient.get(`/mangas/${id}`);
        return response.data;   // MangaDTO
    }

    // Tạo manga mới
    async createManga(manga) {
        // manga = { nameManga, authorId, description, bannerUrl, posterUrl, status }
        const response = await axiosClient.post("/mangas", manga);
        return response.data;   // MangaDTO
    }

    // Cập nhật manga toàn bộ (PUT)
    async updateManga(id, manga) {
        console.log("Sending PUT body:", manga);
        const response = await axiosClient.put(`/mangas/${id}`, manga);
        return response.data;   // MangaDTO
    }

    // Cập nhật một phần (PATCH)
    async patchManga(id, updates) {
        // updates = { nameManga?, description?, bannerUrl?, posterUrl?, status?, countView? }
        const response = await axiosClient.patch(`/mangas/${id}`, updates);
        return response.data;   // MangaDTO
    }

    // Xoá manga
    async deleteManga(id) {
        const response = await axiosClient.delete(`/mangas/${id}`);
        return response.data;   // string "Deleted"
    }
}
