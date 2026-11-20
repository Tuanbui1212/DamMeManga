package org.example.backend.domain.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "manga")
public class Manga {

    @Id
    @Column(name = "id_manga", length = 100)
    private String idManga;

    @Column(name = "name_manga")
    private String nameManga;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id")
    private Author author;

    @Column(name = "description", length = 1000)
    private String description;

    @Column(name = "banner_url")
    private String bannerUrl;

    @Column(name = "poster_url")
    private String posterUrl;

    @Column(name = "status")
    private String status;

    @Column(name = "count_view")
    private int countView;

    @Column(name = "created_at")
    private LocalDateTime createAt;

    @Column(name = "updated_at")
    private LocalDateTime updateAt;

    @OneToMany(mappedBy = "manga", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("chapterNumber ASC")
    @JsonIgnoreProperties({"manga"})
    private List<Chapter> chapters = new ArrayList<>();

    public Manga() {
        this.idManga = UUID.randomUUID().toString();
        this.createAt = LocalDateTime.now();
        this.updateAt = LocalDateTime.now();
    }

    @PrePersist
    protected void onCreate() {
        if (idManga == null) {
            idManga = UUID.randomUUID().toString();
        }
        createAt = LocalDateTime.now();
        updateAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updateAt = LocalDateTime.now();
    }

    public String getIdManga() {
        return idManga;
    }

    public void setIdManga(String idManga) {
        this.idManga = idManga;
    }

    public String getNameManga() {
        return nameManga;
    }

    public void setNameManga(String nameManga) {
        this.nameManga = nameManga;
    }

    public Author getAuthor() {
        return author;
    }

    public void setAuthor(Author author) {
        this.author = author;
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

    @JsonProperty("createdAt")
    public LocalDateTime getCreatedAt() {
        return createAt;
    }

    @JsonProperty("createdAt")
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createAt = createdAt;
    }

    @JsonProperty("updatedAt")
    public LocalDateTime getUpdatedAt() {
        return updateAt;
    }

    @JsonProperty("updatedAt")
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updateAt = updatedAt;
    }

    public List<Chapter> getChapters() {
        return chapters;
    }

    public void setChapters(List<Chapter> chapters) {
        this.chapters = chapters;
    }

    public void addChapter(Chapter chapter) {
        chapters.add(chapter);
        chapter.setManga(this);
    }

    public void removeChapter(Chapter chapter) {
        chapters.remove(chapter);
        chapter.setManga(null);
    }
}
