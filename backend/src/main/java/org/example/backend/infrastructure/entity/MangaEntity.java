<<<<<<< HEAD
package org.example.backend.infrastructure.entity;
=======
package org.example.backend.infrastructure.repository;
>>>>>>> java/phungcuong

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "manga")
public class MangaEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
<<<<<<< HEAD
    @Column(name = "id_manga")
    private String id;

    @Column(name = "name_manga")
    private String name;

    @Column(name = "author_id")
    private String authorId;

    private String description;

    @Column(name = "banner_url")
    private String bannerUrl;

    @Column(name = "poster_url")
    private String posterUrl;

    private String status;

    @Column(name = "count_view")
    private Integer countView;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Constructor, Getter, Setter
    public MangaEntity() {}

    public MangaEntity(String id, String name, String authorId, String description, String bannerUrl, String posterUrl, String status, Integer countView, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.name = name;
=======
    private String id;

    @Column(nullable = false, length = 255)
    private String nameManga;

    @Column(name = "author_id", nullable = false)
    private String authorId;  // Nếu sau dùng quan hệ thì chuyển sang ManyToOne

    @Column(columnDefinition = "TEXT")
    private String description;

    private String bannerUrl;
    private String posterUrl;

    @Column(nullable = false)
    private String status;

    @Column(nullable = false)
    private int countView;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    public MangaEntity() {}

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public MangaEntity(
            String nameManga,
            String authorId,
            String description,
            String bannerUrl,
            String posterUrl,
            String status,
            int countView
    ) {
        this.nameManga = nameManga;
>>>>>>> java/phungcuong
        this.authorId = authorId;
        this.description = description;
        this.bannerUrl = bannerUrl;
        this.posterUrl = posterUrl;
        this.status = status;
        this.countView = countView;
<<<<<<< HEAD
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
=======
>>>>>>> java/phungcuong
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

<<<<<<< HEAD
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
=======
    public String getNameManga() {
        return nameManga;
    }

    public void setNameManga(String nameManga) {
        this.nameManga = nameManga;
>>>>>>> java/phungcuong
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

<<<<<<< HEAD
    public Integer getCountView() {
        return countView;
    }

    public void setCountView(Integer countView) {
=======
    public int getCountView() {
        return countView;
    }

    public void setCountView(int countView) {
>>>>>>> java/phungcuong
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
<<<<<<< HEAD
}
=======
}
>>>>>>> java/phungcuong
