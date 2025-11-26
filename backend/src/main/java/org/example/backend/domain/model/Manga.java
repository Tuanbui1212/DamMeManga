package org.example.backend.domain.model;

<<<<<<< HEAD
import java.time.LocalDateTime;

public class Manga {
    private String id;
    private String name;
    private String authorId;
    private String description;
    private String bannerUrl;
    private String posterUrl;
    private String status; 
    private Integer countView;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Constructor, Getter, Setter, Business methods
    public Manga() {}

    public Manga(String id, String name, String authorId, String description, String bannerUrl, String posterUrl, String status, Integer countView, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.name = name;
        this.authorId = authorId;
        this.description = description;
        this.bannerUrl = bannerUrl;
        this.posterUrl = posterUrl;
        this.status = status;
        this.countView = countView;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

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

    public String getAuthorId() {
        return authorId;
    }

    public void setAuthorId(String authorId) {
        this.authorId = authorId;
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

    public Integer getCountView() {
        return countView;
    }

    public void setCountView(Integer countView) {
        this.countView = countView;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
=======
public class Manga {
>>>>>>> java/phungcuong
}
