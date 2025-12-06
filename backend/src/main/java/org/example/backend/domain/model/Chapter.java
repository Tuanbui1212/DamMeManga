package org.example.backend.domain.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

@Entity
@Table(name = "chapter")
public class Chapter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_chapter", nullable = false, updatable = false)
    private Long idChapter;

    @ManyToOne(fetch = FetchType.LAZY, targetEntity = MangaDetail.class)
    @JoinColumn(name = "manga_id")
    @JsonIgnore
    private MangaDetail manga;

    @Column(name = "chapter_number")
    private Integer chapterNumber;

    private String title;

    public Chapter() {}

    public Chapter(MangaDetail manga, Integer chapterNumber, String title) {
        this.manga = manga;
        this.chapterNumber = chapterNumber;
        this.title = title;
    }

    @JsonProperty("id_manga")
    public String getIdManga() {
        return manga != null ? manga.getIdManga() : null;
    }

    @JsonProperty("id_manga")
    public void setIdManga(String idManga) {
        if (this.manga == null) {
            this.manga = new MangaDetail();
        }
        this.manga.setIdManga(idManga);
    }

    public Long getIdChapter() {
        return idChapter;
    }

    public void setIdChapter(Long idChapter) {
        this.idChapter = idChapter;
    }

    public MangaDetail getManga() {
        return manga;
    }

    public void setManga(MangaDetail manga) {
        this.manga = manga;
    }

    public Integer getChapterNumber() {
        return chapterNumber;
    }

    public void setChapterNumber(Integer chapterNumber) {
        this.chapterNumber = chapterNumber;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
