import axiosClient from "../http/axiosClient";

export default class UserRepositoryImpl {

    async login(account, password) {
        const response = await axiosClient.post("/users/login", { account, password });
        console.log("Login response:", response); // xem toàn bộ object response
        console.log("Response data:", response.data); // xem body thực sự
        return response.data;
    }

    async register(account, password) {
        const response = await axiosClient.post("/users/register", { account, password });
        return response.data;
    }

    async getAllUsers() {
        const response = await axiosClient.get("/users/all");
        return response.data;
    }

    async changePassword(oldPassword, newPassword) {
        const response = await axiosClient.post("/users/change-password", { oldPassword, newPassword });
        return response.data;
    }

}
