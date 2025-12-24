import UploadImageRepositoryImpl from "../infrastructure/repositories/UploadImageRepository";

export default class UploadImageService {
  constructor() {
    this.uploadRepository = new UploadImageRepositoryImpl();
  }

  /**
   * Upload 1 file ảnh lên backend -> backend upload ImgBB -> trả về link trực tiếp
   * @param {File} file
   * @returns {Promise<string>}
   */
  async uploadImage(file) {
    return await this.uploadRepository.uploadImage(file);
  }

  /**
   * Upload nhiều ảnh cùng lúc
   * @param {File[]} files
   * @returns {Promise<string[]>}
   */
  async uploadMultipleImages(files) {
    const urls = [];
    for (const file of files) {
      const url = await this.uploadRepository.uploadImage(file);
      urls.push(url);
    }
    return urls;
  }
}
