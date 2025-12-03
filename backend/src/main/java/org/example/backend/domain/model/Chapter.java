package org.example.backend.domain.model;

import jakarta.persistence.*;

@Entity
@Table(name = "chapter")
public class Chapter {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_chapter", nullable = false, updatable = false)
    private String idChapter;

    @ManyToOne(fetch = FetchType.LAZY, targetEntity = MangaDetail.class)
    @JoinColumn(name = "manga_id")
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

    public String getIdChapter() { return idChapter; }
    public void setIdChapter(String idChapter) { this.idChapter = idChapter; }

    public MangaDetail getManga() { return manga; }
    public void setManga(MangaDetail manga) { this.manga = manga; }

    public Integer getChapterNumber() { return chapterNumber; }
    public void setChapterNumber(Integer chapterNumber) { this.chapterNumber = chapterNumber; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
}
