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
        // manga = { idManga, nameManga, authorId, ... }
        const response = await axiosClient.post("/mangas", manga);
        return response.data;
    }

    // Cập nhật manga
    async updateManga(id, manga) {
        const response = await axiosClient.put(`/mangas/${id}`, manga);
        return response.data;
    }

    // Xoá manga
    async deleteManga(id) {
        const response = await axiosClient.delete(`/mangas/${id}`);
        return response.data;
    }
}
