import FollowRepositoryImpl from "../infrastructure/repositories/FollowRepository";

export default class FollowService {

    constructor() {
        this.followRepository = new FollowRepositoryImpl();
    }

    async getFollowsByUser(userId) {
        return await this.followRepository.getFollowsByUser(userId);
    }

    async getFollowById(id) {
        return await this.followRepository.getFollowById(id);
    }

    async createFollow(userId, mangaId) {
        return await this.followRepository.createFollow(userId, mangaId);
    }

    async deleteFollow(id) {
        return await this.followRepository.deleteFollow(id);
    }
}
