package org.example.backend.presentation.dto;

import java.time.LocalDateTime;

public class MangaDTO {

    private String id;
    private String name;
    private String authorName;
    private String description;
    private String bannerUrl;
    private String posterUrl;
    private String status;
    private int countView;

    private LocalDateTime createAt; // thời gian tạo
    private LocalDateTime updateAt; // thời gian cập nhật

    // Constructor không tham số
    public MangaDTO() {
    }

    // Constructor đầy đủ
    public MangaDTO(String id, String name, String authorName, String description,
                    String bannerUrl, String posterUrl, String status, int countView,
                    LocalDateTime createAt, LocalDateTime updateAt) {
        this.id = id;
        this.name = name;
        this.authorName = authorName;
        this.description = description;
        this.bannerUrl = bannerUrl;
        this.posterUrl = posterUrl;
        this.status = status;
        this.countView = countView;
        this.createAt = createAt;
        this.updateAt = updateAt;
    }

    // Getter & Setter
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getBannerUrl() {
        return bannerUrl;
    }

    public void setBannerUrl(String bannerUrl) {
        this.bannerUrl = bannerUrl;
    }

    public String getPosterUrl() {
        return posterUrl;
    }

    public void setPosterUrl(String posterUrl) {
        this.posterUrl = posterUrl;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getCountView() {
        return countView;
    }

    public void setCountView(int countView) {
        this.countView = countView;
    }

    public LocalDateTime getCreateAt() {
        return createAt;
    }

    public void setCreateAt(LocalDateTime createAt) {
        this.createAt = createAt;
    }

    public LocalDateTime getUpdateAt() {
        return updateAt;
    }

    public void setUpdateAt(LocalDateTime updateAt) {
        this.updateAt = updateAt;
    }
}